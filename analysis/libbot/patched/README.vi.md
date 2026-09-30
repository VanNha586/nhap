# Bản sửa các giá trị khởi tạo của bot

**Đây là bản cũ chỉ đổi giá trị khởi tạo.** Yêu cầu mới sửa cả DEX/bỏ điều kiện VIP cục bộ nằm ở [../unrestricted/README.vi.md](../unrestricted/README.vi.md).

Ngày tạo: **30/09/2026**. Đây là bản sao theo yêu cầu sửa hex; tệp gốc ở thư mục gốc repository **không bị ghi đè**.

## Tệp dùng để tải

- **[libbot.js.so đã sửa](libbot.js.so)** — gói Frida đầy đủ, giữ đúng tên tệp.
- [patch.json](patch.json) — offsets, byte trước/sau, giá trị boolean và hash để đối chiếu.
- [avatar.bot.decoded.js](avatar.bot.decoded.js) — bản đọc phần bot đã sửa; **không dùng bản này để thay gói `.so`**, vì không chứa bridge/bundler.

## Đã sửa gì?

| Biến trong mã | Vai trò nhận diện | Trước | Sau | Thay đổi hành vi mặc định? |
|---|---|---|---|---|
| `_0x29a5e9` | Cờ có hành vi kiểu trial | `![]` = false | `false` | Không; giữ false |
| `_0x335d3b` | Tự chuyển khu | `!![]` = true | `true` | Không; vốn đã true |
| `_0x535564` | Câu nhanh | `!![]` = true | `true` | Không; vốn đã true |
| `_0x1d127d` | Xử lý nhiệm vụ thợ câu | `![]` = false | `true` | **Có; mặc định bật xử lý nhiệm vụ** |

`IS_TRIAL` trong bảng strings chỉ là tên khóa không được phần bot tham chiếu. Vai trò trial của `_0x29a5e9` được suy luận từ cách sử dụng; không phải tên biến gốc đã phục hồi.

**Không đổi** `_0x2f6780`: vẫn `![]` = false. Không đổi bất kỳ giá trị false hay cờ trạng thái nào khác, không sửa nhánh kiểm tra cấu hình/blacklist. Bật `_0x2f6780` có thể kích hoạt nhánh mua vật phẩm lặp 100 lần.

Bản này chỉ thay **giá trị khởi tạo**, không ép cờ luôn true ở mọi thời điểm. Các lệnh `zoneoff`, `fastoff`, `questoff` vẫn có thể tắt tính năng sau đó.

## Tính toàn vẹn đã kiểm tra

- Kích thước trước/sau: **356.749 byte**.
- Tổng số byte thay đổi: **17**, tất cả nằm trong đúng 4 vùng dưới đây.
- Header/độ dài entry giữ nguyên: `/avatar.js` = **225.474 byte**; `/avatar.js.map` = **131.221 byte**.
- Source map giữ nguyên từng byte. Đây không phải source map mới cho bản đọc đã định dạng.
- Mã JavaScript trong gói mới phân tích cú pháp được; vẫn có 717 định nghĩa hàm/method/accessor như bản gốc.
- Đã kiểm tra bằng AST: 4 giá trị khởi tạo theo bảng, `_0x2f6780` vẫn false, các phép gán tắt tính năng vẫn còn.
- **8 kiểm thử phân tích tĩnh** và **6 kiểm thử bản vá** đều thành công.
- **Không chạy Frida/game, không triển khai lên thiết bị.** Chưa kiểm chứng việc loader, class/method hoặc phiên bản game trên thiết bị của bạn có tương thích hay không.

SHA-256 tệp gốc:

```text
117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064
```

SHA-256 tệp đã sửa:

```text
319d303c17eba1874e9d863e2c54b18379d4ad2c79f13cfc0283ab53153f074a
```

## Nếu tự sửa lại bằng HxD

Bảng này áp dụng cho **tệp gốc có SHA-256 phía trên**, không áp dụng tùy tiện cho phiên bản khác hoặc tệp đã sửa trước đó. Offset tính từ đầu file, bắt đầu từ 0, hệ hex.

| Offset hex | Byte gốc | Byte thay thế | Diễn giải |
|---|---|---|---|
| `24EE2` | `21 5B 5D 20 20` | `66 61 6C 73 65` | `![]` + 2 khoảng trắng → `false` |
| `24F3E` | `21 21 5B 5D` | `74 72 75 65` | `!![]` → `true` |
| `24F6C` | `21 21 5B 5D` | `74 72 75 65` | `!![]` → `true` |
| `24F9A` | `21 5B 5D 20` | `74 72 75 65` | `![]` + 1 khoảng trắng → `true` |

1. Sao lưu bản gốc trước.
2. Mở một **bản sao** bằng HxD; chọn chế độ **Overwrite**, không Insert.
3. Nhấn **Ctrl+G**, chọn hệ **Hex**, nhập offset từ bảng (không cần tiền tố `0x`).
4. Kiểm tra byte đang có khớp cột “Byte gốc”. Nếu không khớp, **dừng**, không đoán vị trí.
5. Ghi đè đúng số byte ở khung hex. Không thêm/xóa byte hay đổi toàn bộ false trong tệp.
6. Sau khi lưu, đối chiếu kích thước và SHA-256 tệp đã sửa ở trên.

Nếu dùng tệp đã tạo sẵn, **không cần tự sửa hex nữa**. Khi thay vào ứng dụng/thiết bị của bạn, giữ bản sao tệp cũ để có thể khôi phục và giữ đúng tên/vị trí mà loader đang đọc. Không cần thay các tệp trong repository gốc chỉ để tải bản sửa này.

## Chạy lại bản vá từ repository

Công cụ Python chỉ nhận đúng hash bản gốc, xác thực byte tại mỗi offset và từ chối ghi đè tệp nguồn hoặc output khác nội dung:

```sh
python3 tools/libbot-static/patch-flags.py
```

Hoặc chỉ định một đường dẫn output riêng:

```sh
python3 tools/libbot-static/patch-flags.py libbot.js.so analysis/libbot/patched/libbot.js.so
```

Kiểm tra:

```sh
npm ci --prefix tools/libbot-static --ignore-scripts --no-audit --no-fund
npm test --prefix tools/libbot-static
npm run --prefix tools/libbot-static test:patch
```

Các bản `.js` trong thư mục `analysis/libbot` cấp trên vẫn là kết quả phân tích **tệp gốc**. Bản đọc của phần bot đã vá nằm trong thư mục `patched` này để tránh nhầm lẫn.
