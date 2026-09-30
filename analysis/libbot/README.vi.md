# Giải chuỗi và liệt kê chức năng của `libbot.js.so`

## Kết luận nhanh

**Tệp này là gói JavaScript Frida dạng văn bản UTF-8, không phải thư viện ELF/native `.so` và không cần khóa giải mã mật mã.** Phần bot bị làm rối bằng bảng chuỗi và các tên `_0x...`; đã khôi phục toàn bộ **959 lời gọi tra chuỗi có chỉ số hằng**.

Phần bot được phân loại thành **16 nhóm chức năng** bên dưới. Đây là cách nhóm theo hành vi trong mã, **không phải 16 mục menu được xác nhận khi chạy**.

| Cách đếm | Kết quả |
|---|---:|
| Hàm trợ giúp nhận diện bằng định danh/biến `_0x...` của bot | **31** |
| Toàn bộ hàm/callback của bot, gồm hàm ẩn danh và `onEnter`/`onLeave` | **144** |
| Điểm `Interceptor.attach` vào method IL2Cpp | **18** |
| Mẫu lệnh được nhận diện qua `TField.setText` | **14** |
| Tên method IL2Cpp được bot tra cứu bằng `.method(...)` | **46** tên, tại **123** vị trí |
| Chuỗi literal/template duy nhất của bot sau khôi phục, kể cả tên thuộc tính | **320** |
| Chuỗi duy nhất của cả bot + bridge/bundler sau khôi phục | **763** |
| Phần tử trong bảng làm rối ban đầu | **269**, trong đó **250** được bot tra cứu |

**Không nhầm số hàm JavaScript với số tính năng:** 31 hàm trợ giúp là một phần của 144 hàm/callback, không cộng thêm. Nếu đếm toàn bộ JavaScript gốc, có **717** nút hàm/method/accessor: **568** thuộc bridge/bundler + **144** của bot + **1** wrapper `avatar.js` + **4** hàm phục vụ làm rối.

## 1. Phạm vi và bằng chứng

- Nguồn người dùng chỉ định: [GitHub — libbot.js.so](https://github.com/VanNha586/nhap/blob/main/libbot.js.so).
- Phân tích bản có sẵn trong repository, ngày **29/09/2026**. Link `main` có thể thay đổi về sau; SHA-256 dưới đây xác định chính xác bản đã đọc.
- Kích thước tệp: **356.749 byte**.
- SHA-256: `117bc87d9d7a92fcb4ce45f969fd14933defea0120fe28f172598896c848b064`.
- Header bắt đầu bằng `📦`; có hai entry: `/avatar.js` (**225.474 byte**) và `/avatar.js.map` (**131.221 byte**), ngăn bằng `✄`.
- Phần lớn mã là dependency `frida-il2cpp-bridge`. Phần riêng bắt đầu tại dấu `// avatar.js`, dòng **3337** của tệp gốc.
- Source map có **47 nguồn**, không có `sourcesContent`. Nó không cung cấp tên nghiệp vụ trước khi làm rối. Tên chức năng trong báo cáo là **diễn giải từ thân hàm**, không phải tên gốc đã khôi phục.
- Chỉ phân tích tĩnh. **Không thực thi bot, Frida payload hay game; không sửa tệp gốc.** `classes3.dex` chưa được dịch ngược trong phạm vi này.

## 2. Danh sách 16 nhóm chức năng và strings liên quan

Strings dưới đây giữ cách viết trong mã. Những tên như `doHervest`, `listKeyRecieve`, `Hmap` có vẻ sai chính tả nhưng **không được tự sửa**, vì có thể là định danh thật của game.

| # | Nhóm chức năng nhận diện | Hàm/điểm xử lý chính | Strings tiêu biểu |
|---|---|---|---|
| 1 | Đọc/ghi cấu hình XML SharedPreferences | `_0x74df60`, `_0x38515e` | `LICENSE_KEY`, `STATUS`, `SEED_ID`, `FOOD_ID`, `FARM_TIME`, `GIFT_LIST`, `/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml` |
| 2 | Nhận diện người chơi và đọc trạng thái hạn chế | `_0x59afe4`, callback kiểm tra cấu hình | `avatar`, `IDDB`, `name`, `USERNAME`, `BLACKLISTED_USERNAMES`, `LICENSE_KEY`, `STATUS` |
| 3 | Nhận lệnh từ text field và gửi thông báo qua khung chat | Hook `TField.setText`; `_0x57ee7a` | `setText`, `tfChat`, `showTF`, `ChatTextField/IActionChat2`, `perform` |
| 4 | Tự bấm màn hình đăng nhập/quay về bản đồ | `_0x35fda9`; hook `LoginScr.switchToMe`, `MapScr.joinCitymap` | `pointerPressed`, `pointerReleased`, `switchToMe`, `joinCitymap` |
| 5 | Quy đổi tọa độ, quét ô bản đồ và lên lịch di chuyển | `_0x4314e6`, `_0x2bf4ba`, `_0x1df3df`, `_0x476835`; `LoadMap.update` | `wMap`, `Hmap`, `getTypeMap`, `xCam`, `yCam`, `zoom`, `transTab`, `doJoin`, `addPopup` |
| 6 | Chọn chỗ câu và tự chuyển khu | `_0x234e45`, `_0x5834a4`; `ParkListSrc.switchToMe` | `zoneon`, `zoneoff`, `selected`, `setSelected`, `no fishing spot`, `invalid seat index` |
| 7 | Tự quăng câu, kết thúc lượt câu và chế độ nhanh/chậm | Các hook của `FishingScr` | `faston`, `fastoff`, `cmdQuanCau`, `cmdXong`, `hideIcon`, `listKeyRecieve`, `listKeySend`, `onStartFishing`, `onFinish` |
| 8 | Trao đổi dữ liệu bài minigame với bộ giải bên ngoài | `_0x19bea8`, `_0x2e1e09`; `FishingScr.onCaCanCau`, `FishingScr.update` | `/minigame_in.json`, `/minigame_out.json`, `sources`, `targets`, `.tmp`, `setIndex` |
| 9 | Đọc nhiệm vụ thợ câu, cập nhật số cá và chọn map tiếp theo | `_0x385fac`, `_0x5bb368`, `_0x4f2777`; `CustomTab.addd` | `queston`, `questoff`, `fish mission`, `nhiệm vụ thợ câu`, `idFish`, `currentNum`, `requestNum`, `reward`, `phần thưởng` |
| 10 | Nhận diện thiếu mồi/vé và gọi mua vật phẩm | `_0x2763b5`; `MsgDlg.setPosButton` | `doBuyItem`, `idShop`, `need a bait`, `use boraras bait`, `need a shark ticket`, `need a snake head ticket`, `need a pier fishing ticket` |
| 11 | Hẹn giờ chăm farm, đi farm rồi quay về câu cá | Nhánh trong `TField.setText`, `FishingScr.update`; `_0x500834`, `_0x28d3f9` | `FARM_TIME`, `doExit`, `doJoinPark`, `getHandler`; regex `^farmkt(\d+)ok$`, `^farm(\d+)ok$`, `^autofarm(\d+)ok$` |
| 12 | Đổi hạt giống, kiểm kho/mua vật phẩm farm, gieo và gieo lại | `_0xec5551`, `_0x18ddcd`, `_0x32ccbf`, `_0xfcca0f` | `SEED_ID`, `listItemFarm`, `doBuyItem`, `doPlantSeed`; regex `^gieohat(\d+)ok$` |
| 13 | Chăm cây, xử lý sâu/cỏ, dùng vật phẩm và thu hoạch | `_0xfcca0f` | `cell`, `statusTree`, `idTree`, `isWorm`, `isGrass`, `setBonPhan`, `doUsingItem`, `doHervest` |
| 14 | Chăm vật nuôi, thu sản phẩm và bán theo điều kiện thời gian | `_0xfcca0f` | `animalLists`, `listAnimalInfo`, `bornTime`, `harvestTime`, `diedTime`, `priceProduct`, `doHarvestAnimal`, `requestTakeCareAnimal`, `doSellAnimal` |
| 15 | Mở màn hình nấu ăn, thu món, nấu tiếp và dừng theo số lần | `_0x403d54`; `CookingScr.switchToMe` | `FOOD_ID`, `listDetailCooking`, `doHarvestCook`, `doCooking`; regex `^cook(\d+)ok$`, `^cook(\d+)off$` |
| 16 | Tìm NPC Chú Cuội theo lịch sự kiện và ghi nhận thông báo hoàn thành quà | `_0x17ca5e`, `_0x21db8b`, `_0x108c70`, `_0x449de4`, `_0x3c4d04`, `_0x55bf4a` | `chú cuội`, `uncle cuoi`, `1 hộp bánh`, `1 mooncake box`, `GIFT_LIST`, `npcoff`; regex `^npc(\d+)ok$` |

**Lưu ý cho nhóm 8:** script chỉ xuất `sources`/`targets` ra file, đợi mảng kết quả rồi gọi `setIndex`. Không thấy thuật toán giải minigame trong phần bot này; không thể coi đây là bộ giải độc lập hoàn chỉnh.

**Lưu ý cho nhóm 16:** nhánh khi tìm thấy NPC trong `_0x108c70` là `if (_0x590a81) {}`. Có cơ chế tìm NPC và theo dõi thông báo quà, nhưng chưa đủ bằng chứng để khẳng định tự tương tác/nhận quà hoàn chỉnh.

## 3. Đủ 31 hàm trợ giúp, kèm string và vị trí

Cột chức năng là suy luận từ mã. Chuỗi gắn `(callback)` nằm trong callback bên trong hàm, không phải literal trực tiếp ở thân ngoài. Danh sách **toàn bộ** chuỗi trực tiếp của từng hàm/callback nằm ở [functions.bot.md](functions.bot.md) và [functions.csv](functions.csv).

| # | Định danh hiện có | Vai trò nhận diện | String tiêu biểu | Dòng gốc |
|---|---|---|---|---|
| 1 | `_0x74df60` | Đọc giá trị string/int/boolean trong cấu hình XML | `LICENSE_KEY`, `<string name="`, `<int name="`, `<boolean name="`, `readText` | 3362–3380 |
| 2 | `_0x38515e` | Cập nhật/thêm giá trị string vào XML | `<string name="`, `</string>`, `</map>`, `write`, `flush` | 3381–3394 |
| 3 | `_0x385fac` | Parse dòng nhiệm vụ câu cá thành ID/map/số lượng/trạng thái | `reward`, `phần thưởng`, `idFish`, `idMap`, `currentNum`, `requestNum`, `status` | 3398–3420 |
| 4 | `_0x4314e6` | Scale tọa độ từ hệ chuẩn 650×300 sang canvas thực | `w`, `h`, `round`, `x`, `y` | 3420–3423 |
| 5 | `_0x2bf4ba` | Đổi tọa độ thế giới sang tọa độ bấm theo camera/zoom | `xCam`, `yCam`, `zoom`, `transTab`, `trunc` | 3423–3426 |
| 6 | `_0x17ca5e` | Kiểm tra ngày/giờ sự kiện Chú Cuội | `getFullYear`, `getMonth`, `getDate`, `getHours` | 3426–3429 |
| 7 | `_0x449de4` | Nhận diện thông báo “1 hộp bánh” đã đủ tiến độ | `1 hộp bánh`, `1 mooncake box`; regex `(\d+)\s*/\s*(\d+)` | 3429–3441 |
| 8 | `_0x3c4d04` | Kiểm tra ID người chơi đã được ghi hoàn thành quà trong ngày chưa | `GIFT_LIST`, `date`, `idPlayers` | 3441–3454 |
| 9 | `_0x55bf4a` | Ghi ID người chơi vào danh sách quà của ngày hiện tại | `GIFT_LIST`, `date`, `idPlayers`, `stringify` | 3454–3465 |
| 10 | `_0x2e1e09` | Hủy timer/polling trao đổi minigame | Không có string literal; gọi `clearInterval`/`clearTimeout` | 3465–3467 |
| 11 | `_0x19bea8` | Ghi bài minigame và chờ kết quả ngoài | `(callback)` `/minigame_in.json`, `/minigame_out.json`, `sources`, `targets`, `.tmp` | 3467–3499 |
| 12 | `_0x59afe4` | Đọc ID/tên người chơi, lưu username, đọc blacklist | `avatar`, `IDDB`, `name`, `USERNAME`, `BLACKLISTED_USERNAMES` | 3534–3552 |
| 13 | `_0x35fda9` | Bấm vị trí đăng nhập; lặp sau 16 giây nếu chưa vào bản đồ | `instance`, `pointerPressed`; `(callback)` `pointerReleased` | 3553–3566 |
| 14 | `_0x476835` | Lưu tọa độ đích, số lần thử và mốc thời gian cho lệnh di chuyển | `x`, `y`, `now` | 3567–3570 |
| 15 | `_0x5bb368` | Cộng số cá bắt được cho nhiệm vụ tương ứng | `idFish`, `currentNum`, `requestNum`, `status` | 3571–3582 |
| 16 | `_0x4f2777` | Yêu cầu/cập nhật bảng nhiệm vụ và chọn map nhiệm vụ chưa xong | `doMenuOption`; `(callback)` `close`, `idMap`, `cmdClose` | 3582–3636 |
| 17 | `_0x5834a4` | Bấm vị trí mở chuyển khu, chờ và xử lý trường hợp thất bại | `pointerPressed`, `pointerReleased`, `instance` | 3636–3664 |
| 18 | `_0x21db8b` | Duyệt danh sách nhân vật, tìm tên Chú Cuội | `playerLists`, `name`, `chú cuội`, `uncle cuoi` | 3882–3895 |
| 19 | `_0x108c70` | Poll tìm NPC, đổi khu khi không tìm thấy; kiểm tra hết thời gian | Không có literal trực tiếp; `(callback)` `perform`, `main`; gọi `_0x21db8b` | 3897–3913 |
| 20 | `_0x57ee7a` | Mở/ghi text field và thực hiện gửi thông báo qua chat | `tfChat`, `showTF`, `setText`, `.ctor`, `perform` | 3955–3980 |
| 21 | `_0x2763b5` | Đặt shop, gọi mua mồi/vé và thử lại khi lỗi | Không có literal trực tiếp; `(callback)` `idShop`, `doBuyItem` | 3980–4012 |
| 22 | `_0x1df3df` | Quét ô map, lấy vị trí chỗ câu/cổng đổi khu/vị trí nấu | `wMap`, `Hmap`, `getTypeMap`, `x`, `y` | 4012–4035 |
| 23 | `_0x234e45` | Chọn chỗ câu ngẫu nhiên, bấm hoặc di chuyển, xử lý timeout | `no fishing spot`, `all seats failed`, `invalid seat index`; `(callback)` `Canvas null`, `click error`, `timeout error` | 4035–4116 |
| 24 | `_0x7669c9` | Giải phóng cờ đang thử chọn chỗ; đối số báo lỗi không được dùng | `""` (giá trị mặc định) | 4039–4042 |
| 25 | `_0x28d3f9` | Đóng/thoát màn hình farm, có các nhánh dự phòng | `close`, `getHandler`, `commandActionPointer`, `doJoinPark` | 4286–4309 |
| 26 | `_0x500834` | Thoát map để chuyển lộ trình; fallback chọn chỗ câu | `instance`, `doExit`, `now` | 4309–4317 |
| 27 | `_0xec5551` | Đọc tồn kho, mua hạt và bổ sung vật phẩm farm | `listItemFarm`, `ID`, `number`, `doBuyItem`; `(callback)` `price` | 4345–4359 |
| 28 | `_0x403d54` | Bấm vị trí nấu ăn, có timeout quay về farm | `pointerPressed`, `pointerReleased`, `instance` | 4361–4374 |
| 29 | `_0x18ddcd` | Chạy hàng đợi gieo lại và gọi callback khi xong | `perform`; `(callback/hàm con)` `doPlantSeed`, `length` | 4401–4422 |
| 30 | `_0x32ccbf` | Xử lý từng ô trong hàng đợi gieo, cách nhau 300 ms | `length`, `perform`; `(callback)` `doPlantSeed` | 4407–4419 |
| 31 | `_0xfcca0f` | Chăm/thu cây và vật nuôi, gieo lại rồi chuyển sang nấu/thoát farm | `isWorm`, `isGrass`, `setBonPhan`, `doHervest`, `doUsingItem`, `doPlantSeed`, `doHarvestAnimal`, `requestTakeCareAnimal`, `doSellAnimal` | 4422–4473 |

Dòng trong bảng luôn tham chiếu **`libbot.js.so` gốc**, không phải bản đã định dạng. `_0x7669c9` và `_0x32ccbf` là hàm con, nhưng mỗi định nghĩa được đếm riêng đúng một lần.

## 4. Đủ 14 mẫu lệnh và chuỗi phản hồi

Có **7 mẫu regex** và **7 mẫu chuỗi cố định**. Biến `N`/`ID` dưới đây là tham số số nguyên, **không phải ký tự gõ nguyên văn**. Chuỗi phản hồi có `{N}`/`{ID}` là biểu diễn câu được ghép từ literal + biến.

Mã chuyển text về chữ thường và `trim()` trước khi kiểm tra. Các regex khớp **toàn bộ** text; 7 chuỗi cố định dùng `includes()`, tức có thể khớp khi text còn chứa nội dung khác.

| # | Mẫu lệnh | Regex/string nhận diện thật | Hành vi / điều kiện | Phản hồi liên quan |
|---|---|---|---|---|
| 1 | `farmktNok` | `/^farmkt(\d+)ok$/` | N ≥ 15; đặt mốc chăm farm kế tiếp. Nhánh thực hiện còn phụ thuộc chu kỳ farm đang bật. | `OK sếp, lần chăm farm kế tiếp sau {N} phút` |
| 2 | `farmNok` | `/^farm(\d+)ok$/` | N ≥ 15; đặt khoảng chăm farm lặp lại theo phút. | `OK sếp, chăm farm sau {N} phút` |
| 3 | `gieohatNok` | `/^gieohat(\d+)ok$/` | N là thứ tự 1–25 trong bảng hạt giống, không phải ID hạt trực tiếp. | `OK sếp, đã đổi hạt giống thứ tự {N}` |
| 4 | `autofarmIDok` | `/^autofarm(\d+)ok$/` | Chỉ xử lý khi map hiện tại = 25; ID đích thuộc 14, 15, 16, 27; chăm farm rồi đi câu. | `OK sếp, bắt đầu chăm farm rồi đi câu cá.` |
| 5 | `zoneon` | `zoneon` | Bật tự chuyển khu. | `Đã bật tự động chuyển khu thưa sếp.` |
| 6 | `zoneoff` | `zoneoff` | Tắt tự chuyển khu. | `Đã tắt tự động chuyển khu thưa sếp.` |
| 7 | `faston` | `faston` | Bật chế độ câu nhanh. | `Đã bật auto siêu tốc thưa sếp.` |
| 8 | `fastoff` | `fastoff` | Tắt chế độ câu nhanh. | `Đã tắt siêu tốc thưa sếp.` |
| 9 | `queston` | `queston` | Bật theo dõi/hoàn thành nhiệm vụ câu; yêu cầu bảng nhiệm vụ. | `Đã bật hoàn thành nhiệm vụ.` |
| 10 | `questoff` | `questoff` | Tắt xử lý nhiệm vụ. | `Đã tắt hoàn thành nhiệm vụ.` |
| 11 | `npcoff` | `npcoff` | Đặt cờ tìm NPC về 0. | `Đã tắt tìm npc.` |
| 12 | `npcIDok` | `/^npc(\d+)ok$/` | Kiểm tra lịch sự kiện và GIFT_LIST rồi bắt đầu lộ trình tìm NPC. ID được gán làm map đích; không phải ID NPC/số lần. | Khi bị chặn: `Giờ này làm gì có chú cuội hả fen` hoặc `Bạn đã nhận đủ quà rồi.` |
| 13 | `cookIDok` | `/^cook(\d+)ok$/` | Chọn món. Có báo lỗi ngoài 1–35, **nhưng thiếu return nên vẫn gán ID**. | `Đã đổi món ăn {ID} thưa sếp.`; `Mã món ăn không hợp lệ.` |
| 14 | `cookNoff` | `/^cook(\d+)off$/` | N = 0: tắt nấu; N > 0: dừng sau N lần bắt đầu nấu được bộ đếm ghi nhận. | `Đã tắt tự động nấu ăn.` hoặc `Tự động nấu ăn sẽ tắt sau {N} lần.` |

Các mẫu lệnh nằm trong hook `TField.setText`, dòng **3667–3879**. File [commands.csv](commands.csv) cung cấp bảng dạng dữ liệu.

## 5. Điểm hook và các method IL2Cpp liên quan

18 điểm hook trong phần bot:

| # | Target | Dòng gốc | Vai trò chính |
|---|---|---:|---|
| 1 | `TField.setText` | 3667 | Nhận diện các mẫu lệnh |
| 2 | `Canvas.addFlyText` | 3914 | Nhận diện thông báo đủ “1 hộp bánh” |
| 3 | `CustomTab.addd` | 3921 | Đọc nội dung nhiệm vụ thợ câu |
| 4 | `LoginScr.switchToMe` | 3932 | Bắt đầu bấm màn hình đăng nhập |
| 5 | `ParkListSrc.switchToMe` | 3938 | Chọn khu đã định |
| 6 | `LoadMap.update` | 4117 | Thực hiện lệnh di chuyển đang chờ |
| 7 | `MapScr.onJoinPark` | 4138 | Ghi map/khu mới, tiếp tục lộ trình |
| 8 | `LoadMap.addPopup` | 4200 | Thu tọa độ popup/điểm chuyển map |
| 9 | `Canvas.startOKDlg` | 4203 | Đọc/đóng một số thông báo và tiếp tục lộ trình |
| 10 | `MsgDlg.setPosButton` | 4232 | Nhận diện thiếu mồi/vé |
| 11 | `MapScr.joinCitymap` | 4318 | Điều phối sau khi về thành phố |
| 12 | `CookingScr.switchToMe` | 4375 | Thu món/nấu tiếp/đóng màn hình |
| 13 | `FarmScr.resizeMap` | 4474 | Khởi động chăm farm sau khi map sẵn sàng |
| 14 | `FishingScr.onStartFishing` | 4484 | Reset trạng thái một phiên câu |
| 15 | `FishingScr.doClose` | 4487 | Hủy trạng thái/timer câu |
| 16 | `FishingScr.update` | 4489 | Vòng điều khiển câu, minigame và lịch farm |
| 17 | `FishingScr.onCaCanCau` | 4569 | Thu mảng dữ liệu minigame |
| 18 | `FishingScr.onFinish` | 4609 | Xử lý cá bắt được, cập nhật nhiệm vụ |

Bot tra cứu **46 tên method IL2Cpp khác nhau**. Đây là các **method được tham chiếu**, không phải 46 hàm JavaScript được định nghĩa thêm:

```text
gI, set_runInBackground, pointerPressed, pointerReleased, doMenuOption,
close, perform, setText, size, elementAt, addFlyText, addd, switchToMe,
.ctor, setSelected, showTF, doBuyItem, getTypeMap, update, doJoin,
onJoinPark, addPopup, startOKDlg, endDlg, setPosButton, getHandler,
commandActionPointer, doJoinPark, doExit, joinCitymap, doHarvestCook,
doCooking, doPlantSeed, setBonPhan, doHervest, doUsingItem,
getAnimalByIndex, doHarvestAnimal, requestTakeCareAnimal, doSellAnimal,
resizeMap, onStartFishing, doClose, setIndex, onCaCanCau, onFinish
```

Xem [game-methods.csv](game-methods.csv) để biết mỗi tên được tra cứu ở đâu và target nào có thể phân giải tĩnh. Target `_0x...` còn lại là biến đối tượng chưa xác định được lớp, không phải tên lớp do báo cáo suy đoán.

## 6. Strings cấu hình, đường dẫn và giới hạn cần biết

### Strings/khóa được dùng thực sự

```text
LICENSE_KEY
STATUS
SEED_ID
FOOD_ID
FARM_TIME
USERNAME
BLACKLISTED_USERNAMES
GIFT_LIST
/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml
/data/data/com.TeaM.Avatar/files
/minigame_in.json
/minigame_out.json
```

Hai đường dẫn minigame đầy đủ được ghép trong mã thành:

```text
/data/data/com.TeaM.Avatar/files/minigame_in.json
/data/data/com.TeaM.Avatar/files/minigame_out.json
```

- Poll kết quả minigame mỗi **100 ms**; timeout **3 giây**; có nhánh thử lại tối đa **3** lần khi độ dài kết quả không khớp.
- Nhánh `set_runInBackground(true)` yêu cầu Unity chạy nền. Việc hệ điều hành có giữ app sống hay không chưa được kiểm chứng.
- Lịch NPC cố định trong mã: **23/09/2026–06/10/2026**, các khung giờ **06:00–08:59**, **10:00–13:59**, **19:00–21:59**. `getHours()` dùng giờ cục bộ của thiết bị chạy script, không phải UTC cố định.
- Bảng nhiệm vụ chứa **19 loài/đối tượng**, mỗi mục có tên tiếng Việt/Anh, ID và map. Xem [fish-map.csv](fish-map.csv). Bảng hạt có **25** thứ tự lựa chọn: [seed-map.csv](seed-map.csv).

### Chuỗi chỉ có trong bảng, không được bot tham chiếu

Có 19 entry không được dùng trong các lời gọi tra bảng của phần bot: **13** chuỗi số phục vụ checksum và **6** tên cờ:

```text
CHANGE_ZONE
ALLOW_FISHING
IS_PROMO
FAST_AUTO
IS_TRIAL
ALLOW_NPC
```

Vì vậy, **không suy ra thêm 6 chức năng độc lập chỉ từ 6 string này**. Cột `lookup_calls_in_bot = 0` trong [string-table.csv](string-table.csv) đánh dấu rõ chúng.

### Những điều không thể kết luận chỉ bằng phân tích này

1. Không phục hồi được tên hàm/biến nghiệp vụ trước khi làm rối; bản đọc giữ `_0x...` để đối chiếu chính xác.
2. Các hàm phụ thuộc Frida, Unity IL2Cpp, đúng class/method và đúng phiên bản game. Danh sách hành vi không chứng minh mọi nhánh chạy thành công trên thiết bị.
3. Có đọc `LICENSE_KEY`/`STATUS` và blacklist, nhưng `_0x2f6780` khởi tạo `false` và không có nhánh gán `true` trong phần bot đã đọc. Không thể khẳng định đây là cơ chế xác minh giấy phép đầy đủ đang hoạt động.
4. `autocauca.io.vn` xuất hiện như nội dung đưa vào hàm gửi chat. Không thấy lời gọi HTTP/socket trong phần bot này; **không** đủ để kết luận toàn bộ ứng dụng Android không có kết nối mạng hay an toàn, vì chưa phân tích `classes3.dex` và chưa chạy động.
5. Source map giữ nguyên chỉ khớp [avatar.bundle.original.js](avatar.bundle.original.js), **không** khớp dòng của bản đã giải chuỗi/định dạng.

## 7. Cách khôi phục chuỗi

Hàm tra chuỗi `_0x4b48(n)` dùng index **n − 374**. Bảng gồm 269 string được xoay trái **122** bước để checksum bằng **985857**. Sau đó công cụ theo binding/scope của **106 alias** và thay **959** lời gọi có chỉ số hằng bằng giá trị string tương ứng.

Ví dụ:

```text
_0x4b48(374) → "cá lòng tong"
_0x4b48(507) → "perform"
_0x4b48(586) → "LICENSE_KEY"
_0x4b48(629) → "/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml"
```

Công cụ diễn giải riêng biểu thức checksum theo allowlist; **không eval/chạy mã input**. Đã kiểm tra cú pháp đầu ra và chạy **8 kiểm thử tĩnh**, gồm byte-exact unpacking, số đếm AST, tính xác định, input có `throw` không bị thực thi, checksum sai/biểu thức không cho phép và file bị cắt.

Chạy lại từ gốc repository:

```sh
npm ci --prefix tools/libbot-static --ignore-scripts --no-audit --no-fund
npm run --prefix tools/libbot-static analyze
npm test --prefix tools/libbot-static
```

## 8. Các tệp kết quả

**Bản mới nhất theo yêu cầu sửa cả DEX và điều kiện VIP cục bộ:** [unrestricted/README.vi.md](unrestricted/README.vi.md), kèm [gói hai tệp đã sửa](unrestricted/trial-false-local-gates.zip). Tệp gốc và kết quả phân tích gốc bên dưới vẫn giữ nguyên.

**Bản sửa giá trị khởi tạo theo yêu cầu tiếp theo:** xem [patched/README.vi.md](patched/README.vi.md) và [patched/libbot.js.so](patched/libbot.js.so). Các kết quả phân tích trong bảng bên dưới vẫn ứng với **tệp gốc**, không phải bản vá.

| Tệp | Nội dung |
|---|---|
| [avatar.bot.decoded.js](avatar.bot.decoded.js) | **Bản đọc phần bot riêng**, đã thay lookup bằng chuỗi; cần môi trường bridge nếu muốn thực thi, không phải app độc lập |
| [avatar.decoded.js](avatar.decoded.js) | Gói JavaScript đầy đủ đã giải chuỗi, giữ bridge/bundler |
| [avatar.bundle.original.js](avatar.bundle.original.js) | Entry `/avatar.js` được tách nguyên byte từ gói |
| [avatar.js.map](avatar.js.map) | Source map gốc, không chứa `sourcesContent` |
| [functions.bot.md](functions.bot.md) | **Đủ 144 hàm/callback bot** với vị trí và tất cả strings/regex trực tiếp |
| [functions.csv](functions.csv) | Inventory toàn bộ 713 hàm còn lại của gói sau bỏ 4 helper làm rối; lọc `group = bot` để lấy 144 |
| [functions.named.csv](functions.named.csv) | 31 hàm trợ giúp, vai trò suy luận và chuỗi tiêu biểu |
| [strings.raw.txt](strings.raw.txt) | Kết quả GNU `strings -a -n 4` trên tệp gốc: các đoạn ASCII dài ≥ 4 ký tự, gồm cả mã làm rối và source-map metadata; không phải danh sách literal đã khôi phục |
| [strings.bot.txt](strings.bot.txt) | **320** chuỗi bot duy nhất, UTF-8; mỗi dòng dùng biểu diễn JSON để bảo toàn xuống dòng/dấu nháy |
| [strings.csv](strings.csv) | **763** chuỗi cả gói, nhóm nguồn, số lần xuất hiện, dòng và hàm liên quan |
| [string-table.csv](string-table.csv) | **269** entry bảng chuỗi, chỉ số decoder/vị trí và số lần dùng |
| [commands.csv](commands.csv) | 14 mẫu lệnh với điều kiện và phản hồi |
| [game-methods.csv](game-methods.csv) | 46 tên method IL2Cpp được tham chiếu, số vị trí và target |
| [fish-map.csv](fish-map.csv) | 19 mục ID/map/tên Việt–Anh trong bảng nhiệm vụ |
| [seed-map.csv](seed-map.csv) | 25 thứ tự chọn hạt → ID hạt |
| [facts.json](facts.json) | Hash, thống kê và dữ liệu phân tích máy đọc được |

Các chuỗi metadata của source map và entry làm rối đã loại bỏ không được cộng vào 320/763 chuỗi của mã đã khôi phục; bảng 269 entry được cung cấp riêng để không mất chúng. Bản dump thô được tạo bằng `strings -a -n 4 libbot.js.so > analysis/libbot/strings.raw.txt`; nó tách các đoạn in được, không phân tích cú pháp JavaScript hay khôi phục escape Unicode.
