# Công cụ phân tích tĩnh `libbot.js.so`

Công cụ này dành cho **cấu trúc cụ thể của tệp trong repository**, không phải bộ giải mã tổng quát cho mọi file `.so`.

## Chạy lại từ thư mục gốc repository

```sh
npm ci --prefix tools/libbot-static --ignore-scripts --no-audit --no-fund
npm run --prefix tools/libbot-static analyze
npm test --prefix tools/libbot-static
```

Hoặc chỉ định input/output:

```sh
node tools/libbot-static/analyze.cjs libbot.js.so analysis/libbot
```

Các lệnh trên chạy **công cụ phân tích**, không chạy payload `libbot.js.so` hay bản JavaScript trích xuất.

## Cách hoạt động

1. Xác thực header gói JavaScript Frida và tách từng entry theo độ dài **byte**.
2. Phân tích cú pháp JavaScript bằng Babel; đọc bảng chuỗi từ AST.
3. Tính checksum bằng một bộ diễn giải nhỏ chỉ cho phép literal, phép toán số và `parseInt`/tra bảng. Không dùng `eval`, `vm`, `require` hay thực thi mã của input. Vòng xoay bị giới hạn bằng số phần tử bảng.
4. Theo binding/scope để tìm alias của hàm tra bảng và thay các lời gọi có chỉ số hằng bằng chuỗi chính xác.
5. Xóa riêng các helper/binding làm rối đã hết tác dụng. Chuẩn hóa chuỗi Unicode, `!![]`/`![]` và truy cập thuộc tính.
6. Xuất inventory hàm, strings, native-method lookups, điểm hook và số liệu. Kiểm tra cú pháp cả bản đầy đủ lẫn bản bot riêng.

Không phục hồi tên biến/hàm trước khi làm rối, không chỉnh chức năng bot và không thực thi game. `avatar.js.map` giữ nguyên và chỉ ứng với `avatar.bundle.original.js`, **không** ứng với bản đã định dạng/giải chuỗi.

`functions.csv` dùng dòng của `libbot.js.so` gốc. Strings của mỗi hàm chỉ gồm literal/template trực tiếp; strings nằm trong callback con được gắn với callback đó. `string-table.csv` giữ cả chuỗi không dùng và số lần tra lookup của từng entry.

Báo cáo diễn giải thủ công, bảng chức năng và bảng lệnh nằm trong `analysis/libbot/README.vi.md`. Chạy lại analyzer không ghi đè các tài liệu diễn giải này.

## Tạo bản vá các giá trị khởi tạo đã thống nhất

```sh
python3 tools/libbot-static/patch-flags.py
npm run --prefix tools/libbot-static test:patch
```

Bản sao được ghi vào `analysis/libbot/patched/libbot.js.so`; tệp nguồn không bị ghi đè. Công cụ chỉ chấp nhận SHA-256 của bản đã phân tích, kiểm tra chính xác byte cũ và giữ nguyên kích thước gói/entry. Tổng cộng sửa 17 byte tại 4 vùng: cờ có hành vi trial giữ false, chuyển khu/câu nhanh giữ true, xử lý nhiệm vụ chuyển false → true. `_0x2f6780` và các cờ trạng thái khác không được sửa. Các lệnh tắt tính năng vẫn giữ nguyên.

Bảng hex, hash, phạm vi và giới hạn nằm trong `analysis/libbot/patched/README.vi.md`. Đây là thay đổi giá trị mặc định, không phải thao tác đặt mọi boolean trong chương trình thành true.


## Bản mới: DEX ghi trial=false và bỏ điều kiện VIP cục bộ

```sh
python3 tools/libbot-static/patch-dex-trial.py
npm run --prefix tools/libbot-static build:unrestricted
npm run --prefix tools/libbot-static test:unrestricted
```

Hai tệp mới nằm trong `analysis/libbot/unrestricted/`. Bản vá DEX chỉ đổi literal ghi vào `IS_TRIAL` trên nhánh trial, không đổi nhánh chọn/API, và tính lại SHA-1/Adler-32 (header bản gốc không khớp nội dung). Patcher này chỉ dùng Python standard library, khóa theo SHA-256 input.

Công cụ libbot thay các lượt đọc cờ VIP cục bộ bằng hằng, đơn giản hóa nhánh theo AST, bỏ scan LICENSE_KEY/STATUS và blacklist, xóa nhánh mua lặp 100 lần, giữ điều kiện trạng thái game và thao tác mua bình thường. Nó serialize lại riêng module bot, đệm để giữ kích thước entry/gói và giữ nguyên prefix thư viện. Source map cũ không còn mô tả chính xác phần bot mới.

Kiểm tra bytecode (chỉ disassembly, không chạy app):

```sh
python3 -m venv tools/libbot-static/.venv
tools/libbot-static/.venv/bin/python -m pip install -r tools/libbot-static/requirements-dex.txt
tools/libbot-static/.venv/bin/python tools/libbot-static/test-dex-trial.py
```

Xem `analysis/libbot/unrestricted/README.vi.md` cho hash, byte offsets, phạm vi và giới hạn. Các quyền VIP ở máy chủ không được thay đổi, và chưa có APK/thiết bị để kiểm tra runtime.
