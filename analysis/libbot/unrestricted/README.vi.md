# Bản mới: DEX ghi IS_TRIAL=false và bỏ kiểm tra VIP cục bộ trong libbot

Ngày: **30/09/2026**. Dùng các tệp trong **thư mục này** cho yêu cầu mới; bản `../patched/` chỉ là phiên bản trước, đổi 4 giá trị khởi tạo.

## Tải kết quả

- [Gói ZIP chứa đúng hai tệp và hướng dẫn](trial-false-local-gates.zip)
- [classes3.dex](classes3.dex) — tên đúng của tệp trong repository là **classes3.dex**, không phải class3.dex.
- [libbot.js.so](libbot.js.so) — gói Frida đầy đủ đã bỏ các kiểm tra cục bộ được mô tả dưới đây.
- [avatar.bot.decoded.js](avatar.bot.decoded.js) — bản đọc để đối chiếu, **không thay gói `.so` bằng file này**.

Hai tệp gốc ở thư mục gốc repository được giữ nguyên. **Đây không phải APK hoàn chỉnh và chưa được chạy trên thiết bị.**

## 1. Sửa trong classes3.dex

Đã xác định chính xác phương thức:

```text
Lcom/TeaM/Avatar/MainActivity;->launchUnityGame(Z)V
```

Nhánh nhận tham số trial=true ban đầu làm:

```text
const-string v2, "IS_TRIAL"
if-eqz v4, ...             # chọn nhánh dựa trên tham số đầu vào
const/4 v4, 1             # giá trị ghi vào SharedPreferences
putBoolean(..., v2, v4)
apply()
startUnityActivity()
```

Chỉ thay **`const/4 v4, 1` → `const/4 v4, 0`**, vì vậy nhánh dùng thử ghi **`IS_TRIAL=false`** nhưng vẫn đi theo nhánh mở game cũ.

- Code item: `0x29E0E0`.
- Lệnh tại offset tệp `0x29E10E`: **`12 14` → `12 04`**.
- Byte lệnh thực sự thay đổi: **`0x29E10F`, `14` → `04`**.
- Không đổi lệnh `if-eqz` chọn nhánh, không đổi lời gọi `startUnityActivity()`.
- **Không đổi lời gọi chọn nhánh thành `launchUnityGame(false)`**, vì việc đó sẽ đi sang nhánh kiểm tra giấy phép/API khác.
- Nhánh API dành cho lựa chọn không-trial vẫn giữ nguyên. Không giả lập phản hồi máy chủ hoặc cấp quyền VIP trên máy chủ.

Bản DEX gốc được tải lên có **SHA-1 signature và Adler-32 checksum không khớp nội dung**. Bản mới đã tính lại cả hai trường theo định dạng DEX. Tổng cộng **24 byte** khác bản gốc: 1 byte lệnh và các byte cần thay trong header integrity. Kích thước vẫn **4.486.288 byte**.

Xem [disassembly trước](launchUnityGame.before.txt), [sau](launchUnityGame.after.txt) và [manifest DEX](dex-patch.json).

**Không chỉ sửa 1 byte bằng HxD rồi lưu:** cần tính lại integrity header. Bản tạo sẵn đã thực hiện bước này.

## 2. Sửa trong libbot.js.so

Trong phần bot đã:

- Giữ `_0x29a5e9 = false` (cờ có hành vi trial, suy luận từ cách dùng).
- Bỏ toàn bộ **16 lượt đọc cờ trial/invalid-license** trong các điều kiện và đơn giản hóa **15 nhánh** liên quan.
- Bỏ việc đọc `LICENSE_KEY`/`STATUS` để kiểm tra mốc hết hạn cục bộ.
- Bỏ việc đọc/quét `BLACKLISTED_USERNAMES`.
- Bỏ nhánh trial tắt chế độ nhanh, chặn xử lý lệnh/nhiệm vụ/chuyển khu và nhánh quảng bá trial.
- Bỏ nhánh ép đáp án minigame thành 0.
- **Xóa nhánh mua vật phẩm lặp 100 lần**, không bật nó. Việc mua mồi/vé và bổ sung vật phẩm farm thông thường vẫn được giữ.
- Đặt mặc định chuyển khu, câu nhanh, xử lý nhiệm vụ thành `true`; `_0x2f6780` giữ `false` và không còn được đọc để điều khiển các nhánh này.

Không bỏ các kiểm tra cần thiết về ID người chơi, bản đồ, trạng thái đang câu, dữ liệu minigame, tồn kho hoặc ngày/giờ sự kiện NPC. Lệnh `zoneoff`/`fastoff`/`questoff` vẫn có hiệu lực. Farm/nấu ăn vẫn cần cấu hình/tham số phù hợp; không đặt mọi boolean thành true.

Các string `LICENSE_KEY`/`STATUS` có thể còn trong bảng chuỗi chung hoặc giá trị mặc định của helper đọc cấu hình; **không còn đoạn quét giấy phép/mốc hết hạn hoạt động**. Bảng chuỗi và thuật toán xoay bảng được giữ để không làm hỏng phần mã còn lại.

Đây là bản dựng lại phần bot, **không phải bản vá 17 byte trước đó**:

- Kích thước gói vẫn **356.749 byte**.
- Entry `/avatar.js` vẫn **225.474 byte**, `/avatar.js.map` vẫn **131.221 byte**.
- **137.833 byte prefix bridge/bundler** được giữ nguyên.
- Phần bot được serialize lại và đệm để giữ kích thước entry; tổng cộng **77.884 byte** khác bản gốc.
- Source map gốc giữ nguyên byte, nhưng **mapping của phần bot đã dựng lại không còn chính xác**. Prefix thư viện không đổi; dùng bản đọc `.js` để đối chiếu logic thay vì dựa vào source map cũ.

Xem [manifest libbot](libbot-patch.json).

## 3. Kiểm tra đã thực hiện

**25 kiểm thử tĩnh thành công:**

- 8 kiểm thử phân tích tĩnh ban đầu.
- 6 kiểm thử bản vá khởi tạo cũ, xác nhận không làm hỏng kết quả đã có.
- 6 kiểm thử libbot mới: cú pháp, hash, prefix/header/map, không còn đọc các cờ VIP, giữ **18 hook** và **25 helper không liên quan**, giữ thao tác mua thông thường và lệnh off, bỏ vòng mua lặp.
- 5 kiểm thử DEX mới: whitelist byte, integrity header, disassembly phương thức đích và so sánh bytecode mọi phương thức khác.

Androguard đọc được DEX mới với **2.864 class**; string pool, tập method, offsets/registers và bytecode các phương thức khác giữ nguyên. Trong phương thức đích, **24/25 lệnh giữ nguyên**, chỉ lệnh const tại `0x1E` trong code stream đổi giá trị.

**Không chạy Dalvik, Frida hay game.** Cần đóng gói/ký lại APK hoặc sử dụng đúng cơ chế loader nếu muốn triển khai. Repository chỉ có các tệp này nên không thể tạo/kiểm chứng một APK cài đặt hoàn chỉnh. Các quyền/trạng thái VIP trên máy chủ không được thay đổi bởi bản sửa này.

## 4. SHA-256 kết quả

`classes3.dex`:

```text
52702476494ed19a6cbf1b4d57fceb45ad576e40d11be9090fd490e4ecac4031
```

`libbot.js.so`:

```text
ff19dbd0fd0c668d77082eeec852daa95e38ad21062543c617151a98e5f0bc45
```

Manifest ghi cả hash tệp gốc để chỉ áp dụng đúng phiên bản đã phân tích, không đoán offsets cho bản khác.

## 5. Dựng lại / kiểm tra từ repository

Dựng lại hai tệp (không cần Androguard cho bước vá DEX):

```sh
npm ci --prefix tools/libbot-static --ignore-scripts --no-audit --no-fund
python3 tools/libbot-static/patch-dex-trial.py
npm run --prefix tools/libbot-static build:unrestricted
npm run --prefix tools/libbot-static test:unrestricted
```

Kiểm tra DEX bằng parser/disassembler tĩnh:

```sh
python3 -m venv tools/libbot-static/.venv
tools/libbot-static/.venv/bin/python -m pip install -r tools/libbot-static/requirements-dex.txt
tools/libbot-static/.venv/bin/python tools/libbot-static/test-dex-trial.py
```

Các công cụ không chạy bytecode hoặc script input và không gọi API giấy phép. Khi thay tệp vào ứng dụng của bạn, sao lưu tệp cũ, giữ đúng tên `classes3.dex` và `libbot.js.so`, đúng vị trí trong APK/loader; đây không phải hai tệp có thể cài độc lập như một APK.
