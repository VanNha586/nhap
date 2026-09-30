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
