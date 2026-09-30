# Danh sách đầy đủ hàm/callback của phần bot

**144 hàm/callback**, không tính wrapper `avatar.js`, thư viện bridge và 4 hàm phục vụ làm rối.

Dòng chỉ vị trí trong `libbot.js.so` gốc. Chuỗi chỉ tính trực tiếp trong mỗi hàm, không cộng chuỗi của hàm con. Tên `_0x...` là tên hiện có; nhãn callback/context là nhãn phân tích, không phải tên gốc.

## 1. setTimeout callback — F570

- Loại: `ArrowFunctionExpression`; dòng gốc: **3360–4653**.
- Strings trực tiếp: `"perform"`

## 2. _0x74df60 — F571

- Loại: `FunctionDeclaration`; dòng gốc: **3362–3380**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"LICENSE_KEY"`, `"/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml"`, `"r"`, `"readText"`, `"close"`, `"match"`, `"<string name=\""`, `"\">([^<]+)</string>"`, `"replace"`, `"\""`, `"<int name=\""`, `"\" value=\"([^\"]+)\""`, `"<boolean name=\""`, `"true"`
- Regex trực tiếp: `/&quot;/g`

## 3. _0x38515e — F572

- Loại: `FunctionDeclaration`; dòng gốc: **3381–3394**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml"`, `"r"`, `"readText"`, `"close"`, `"<string name=\""`, `"\">([^<]*)</string>"`, `"test"`, `"replace"`, `"\">"`, `"</string>"`, `"</map>"`, `"    <string name=\""`, `"</string>\n</map>"`, `"w"`, `"write"`, `"flush"`

## 4. Il2Cpp["perform"] callback — F573

- Loại: `ArrowFunctionExpression`; dòng gốc: **3395–4652**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"domain"`, `"assembly"`, `"Assembly-CSharp"`, `"image"`, `"class"`, `"FishingScr"`, `"Canvas"`, `"GameMidlet"`, `"LoadMap"`, `"MapScr"`, `"MsgDlg"`, `"AvatarService"`, `"GlobalService"`, `"FarmScr"`, `"FarmService"`, `"ChatTextField/IActionChat2"`, `"TField"`, `"ChatTextField"`, `"MiniMap"`, `"FarmData"`, `"ParkService"`, `"ParkListSrc"`, `"AvMain"`, `"AvCamera"`, `"LoginScr"`, `"CustomTab"`, `"CookingScr"`, `"SEED_ID"`, `"FOOD_ID"`, `"FARM_TIME"`, `"id"`, `"idMap"`, `"names"`, `"cá lòng tong"`, `"tiny fish"`, `"cá rô"`, `"perch fish"`, `"cá chép vàng"`, `"carp"`, `"cá lóc"`, `"snake head"`, `"cá nóc"`, `"puffer"`, `"cua"`, `"crab"`, `"cá ngựa"`, `"horsefish"`, `"cá chim"`, `"butter"`, `"cá đuối"`, `"rayfish"`, `"cá hề"`, `"nemo"`, `"cá lia thia"`, `"paradise"`, `"cá vàng"`, `"golden fish"`, `"cá chép"`, `"perch"`, `"nhái"`, `"frog"`, `"chàng hiu"`, `"green frog"`, `"ếch"`, `"blue frog"`, `"mực"`, `"squid"`, `"bạch tuộc"`, `"octopus"`, `"sứa"`, `"jellyfish"`, `"push"`, `"name"`, `"toLowerCase"`, `"sort"`, `"method"`, `"setText"`, `"attach"`, `"virtualAddress"`, `"addFlyText"`, `"overload"`, `"System.String"`, `"System.Int32"`, `"addd"`, `"switchToMe"`, `"update"`, `"onJoinPark"`, `"addPopup"`, `"startOKDlg"`, `"setPosButton"`, `"price"`, `"joinCitymap"`, `"resizeMap"`, `"onStartFishing"`, `"doClose"`, `"onCaCanCau"`, `"onFinish"`

## 5. _0x385fac — F574

- Loại: `FunctionExpression`; dòng gốc: **3398–3420**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"split"`, `"\n"`, `"trim"`, `"toLowerCase"`, `"startsWith"`, `"reward"`, `"phần thưởng"`, `"match"`, `"includes"`, `"/"`, `"name"`, `"id"`, `"idMap"`, `"push"`, `"idFish"`, `"currentNum"`, `"requestNum"`, `"status"`
- Regex trực tiếp: `/-\s*(?:fish\|câu)\s+(\d+)\s+(.*?)\s*-\s*(.+)$/i`

## 6. _0x4314e6 — F575

- Loại: `FunctionExpression`; dòng gốc: **3420–3423**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"field"`, `"w"`, `"value"`, `"h"`, `"round"`, `"x"`, `"y"`

## 7. _0x2bf4ba — F576

- Loại: `FunctionExpression`; dòng gốc: **3423–3426**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"Object"`, `"field"`, `"xCam"`, `"value"`, `"yCam"`, `"zoom"`, `"transTab"`, `"x"`, `"trunc"`, `"y"`

## 8. _0x17ca5e — F577

- Loại: `FunctionExpression`; dòng gốc: **3426–3429**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"getFullYear"`, `"getMonth"`, `"getDate"`, `"getHours"`

## 9. _0x449de4 — F578

- Loại: `FunctionExpression`; dòng gốc: **3429–3441**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"toLowerCase"`, `"includes"`, `"1 hộp bánh"`, `"1 mooncake box"`, `"match"`
- Regex trực tiếp: `/(\d+)\s*\/\s*(\d+)/`

## 10. _0x3c4d04 — F579

- Loại: `FunctionExpression`; dòng gốc: **3441–3454**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"getDate"`, `"/"`, `"getMonth"`, `"getFullYear"`, `"GIFT_LIST"`, `"parse"`, `"date"`, `"idPlayers"`, `"isArray"`, `"includes"`

## 11. _0x55bf4a — F580

- Loại: `FunctionExpression`; dòng gốc: **3454–3465**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"getDate"`, `"/"`, `"getMonth"`, `"getFullYear"`, `"GIFT_LIST"`, `"date"`, `"idPlayers"`, `"parse"`, `"includes"`, `"push"`, `"stringify"`

## 12. _0x2e1e09 — F581

- Loại: `FunctionExpression`; dòng gốc: **3465–3467**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 13. _0x19bea8 — F582

- Loại: `FunctionExpression`; dòng gốc: **3467–3499**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 14. setImmediate callback — F583

- Loại: `FunctionExpression`; dòng gốc: **3468–3498**.
- Ngữ cảnh: `_0x19bea8`.
- Strings trực tiếp: `"/data/data/com.TeaM.Avatar/files"`, `"/minigame_in.json"`, `"/minigame_out.json"`, `"w"`, `"write"`, `""`, `"flush"`, `"close"`, `"stringify"`, `"sources"`, `"targets"`, `".tmp"`

## 15. setInterval callback — F584

- Loại: `FunctionExpression`; dòng gốc: **3481–3492**.
- Ngữ cảnh: `setImmediate callback`.
- Strings trực tiếp: `"r"`, `"readText"`, `"trim"`, `"close"`, `"parse"`, `"isArray"`

## 16. setTimeout callback — F585

- Loại: `FunctionExpression`; dòng gốc: **3492–3494**.
- Ngữ cảnh: `setImmediate callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 17. setTimeout callback — F586

- Loại: `ArrowFunctionExpression`; dòng gốc: **3512–3526**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"LICENSE_KEY"`, `"STATUS"`, `"replace"`, `""`, `"floor"`, `"now"`, `"domain"`, `"assembly"`, `"UnityEngine.CoreModule"`, `"image"`, `"class"`, `"UnityEngine.Application"`, `"method"`, `"set_runInBackground"`, `"invoke"`
- Regex trực tiếp: `/\D/g`

## 18. _0x394b35["sort"] callback — F587

- Loại: `ArrowFunctionExpression`; dòng gốc: **3533–3533**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"name"`, `"length"`

## 19. _0x59afe4 — F588

- Loại: `ArrowFunctionExpression`; dòng gốc: **3534–3552**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"field"`, `"avatar"`, `"value"`, `"isNull"`, `"IDDB"`, `"String"`, `"name"`, `"toString"`, `"USERNAME"`, `"BLACKLISTED_USERNAMES"`, `"parse"`, `"some"`

## 20. _0x2ca76a["some"] callback — F589

- Loại: `ArrowFunctionExpression`; dòng gốc: **3546–3546**.
- Ngữ cảnh: `_0x59afe4`.
- Strings trực tiếp: `"includes"`

## 21. _0x35fda9 — F590

- Loại: `ArrowFunctionExpression`; dòng gốc: **3553–3566**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"field"`, `"instance"`, `"value"`, `"Object"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"x"`, `"y"`

## 22. setTimeout callback — F591

- Loại: `ArrowFunctionExpression`; dòng gốc: **3557–3560**.
- Ngữ cảnh: `_0x35fda9`.
- Strings trực tiếp: `"method"`, `"pointerReleased"`, `"invoke"`, `"x"`, `"y"`

## 23. setTimeout callback — F592

- Loại: `ArrowFunctionExpression`; dòng gốc: **3560–3563**.
- Ngữ cảnh: `_0x35fda9`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 24. _0x476835 — F593

- Loại: `ArrowFunctionExpression`; dòng gốc: **3567–3570**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"x"`, `"y"`, `"now"`

## 25. _0x5bb368 — F594

- Loại: `ArrowFunctionExpression`; dòng gốc: **3571–3582**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"length"`, `"status"`, `"idFish"`, `"currentNum"`, `"requestNum"`

## 26. _0x4f2777 — F595

- Loại: `ArrowFunctionExpression`; dòng gốc: **3582–3636**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"Object"`, `"doMenuOption"`

## 27. setTimeout callback — F596

- Loại: `ArrowFunctionExpression`; dòng gốc: **3589–3630**.
- Ngữ cảnh: `_0x4f2777`.
- Strings trực tiếp: `"perform"`, `"main"`

## 28. Il2Cpp["perform"] callback — F597

- Loại: `ArrowFunctionExpression`; dòng gốc: **3591–3629**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"Object"`, `"close"`, `"length"`, `"status"`, `"idMap"`, `"isNull"`, `"field"`, `"cmdClose"`, `"value"`, `"perform"`, `"floor"`, `"random"`

## 29. _0x5834a4 — F598

- Loại: `ArrowFunctionExpression`; dòng gốc: **3636–3664**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"length"`, `"x"`, `"y"`, `"field"`, `"instance"`, `"value"`, `"isNull"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"pointerReleased"`

## 30. setTimeout callback — F599

- Loại: `ArrowFunctionExpression`; dòng gốc: **3651–3659**.
- Ngữ cảnh: `_0x5834a4`.
- Strings trực tiếp: `"perform"`

## 31. Il2Cpp["perform"] callback — F600

- Loại: `ArrowFunctionExpression`; dòng gốc: **3653–3658**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 32. onEnter — F601

- Loại: `ObjectMethod`; dòng gốc: **3667–3879**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"onEnter"`, `"isNull"`, `"String"`, `"content"`, `"toLowerCase"`, `"trim"`, `"match"`, `"now"`, `"length"`, `"includes"`, `"Không tìm thấy id bản đồ. Cá rô: 14, Cá mập: 15, Cá lóc: 16, Bến tàu: 27"`, `"zoneon"`, `"zoneoff"`, `"faston"`, `"fastoff"`, `"queston"`, `"questoff"`, `"npcoff"`, `"Giờ này làm gì có chú cuội hả fen"`, `"Bạn đã nhận đủ quà rồi."`, `"method"`, `"gI"`, `"invoke"`, `"Object"`, `"field"`, `"cmdClose"`, `"value"`, `"perform"`, `"Mã món ăn không hợp lệ."`, `"Số lần phải từ 0 trở lên"`
- Regex trực tiếp: `/^farmkt(\d+)ok$/`, `/^farm(\d+)ok$/`, `/^gieohat(\d+)ok$/`, `/^autofarm(\d+)ok$/`, `/^npc(\d+)ok$/`, `/^cook(\d+)ok$/`, `/^cook(\d+)off$/`

## 33. setTimeout callback — F602

- Loại: `ArrowFunctionExpression`; dòng gốc: **3677–3686**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 34. Il2Cpp["perform"] callback — F603

- Loại: `ArrowFunctionExpression`; dòng gốc: **3679–3685**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"OK sếp, lần chăm farm kế tiếp sau "`, `" phút"`

## 35. setTimeout callback — F604

- Loại: `ArrowFunctionExpression`; dòng gốc: **3693–3702**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 36. Il2Cpp["perform"] callback — F605

- Loại: `ArrowFunctionExpression`; dòng gốc: **3695–3701**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"OK sếp, chăm farm sau "`, `" phút"`

## 37. setTimeout callback — F606

- Loại: `ArrowFunctionExpression`; dòng gốc: **3707–3716**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 38. Il2Cpp["perform"] callback — F607

- Loại: `ArrowFunctionExpression`; dòng gốc: **3709–3715**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"OK sếp, đã đổi hạt giống thứ tự "`

## 39. setTimeout callback — F608

- Loại: `ArrowFunctionExpression`; dòng gốc: **3721–3744**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 40. Il2Cpp["perform"] callback — F609

- Loại: `ArrowFunctionExpression`; dòng gốc: **3723–3743**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"OK sếp, bắt đầu chăm farm rồi đi câu cá."`, `"x"`, `"y"`, `"field"`, `"instance"`, `"value"`, `"isNull"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"pointerReleased"`

## 41. setTimeout callback — F610

- Loại: `ArrowFunctionExpression`; dòng gốc: **3728–3740**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`

## 42. Il2Cpp["perform"] callback — F611

- Loại: `ArrowFunctionExpression`; dòng gốc: **3729–3739**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"x"`, `"y"`

## 43. setTimeout callback — F612

- Loại: `ArrowFunctionExpression`; dòng gốc: **3731–3736**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`

## 44. Il2Cpp["perform"] callback — F613

- Loại: `ArrowFunctionExpression`; dòng gốc: **3733–3735**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 45. setTimeout callback — F614

- Loại: `ArrowFunctionExpression`; dòng gốc: **3746–3754**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 46. Il2Cpp["perform"] callback — F615

- Loại: `ArrowFunctionExpression`; dòng gốc: **3748–3753**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã bật tự động chuyển khu thưa sếp."`

## 47. setTimeout callback — F616

- Loại: `ArrowFunctionExpression`; dòng gốc: **3755–3763**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 48. Il2Cpp["perform"] callback — F617

- Loại: `ArrowFunctionExpression`; dòng gốc: **3757–3762**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã tắt tự động chuyển khu thưa sếp."`

## 49. setTimeout callback — F618

- Loại: `ArrowFunctionExpression`; dòng gốc: **3764–3773**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 50. Il2Cpp["perform"] callback — F619

- Loại: `ArrowFunctionExpression`; dòng gốc: **3766–3772**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã bật auto siêu tốc thưa sếp."`

## 51. setTimeout callback — F620

- Loại: `ArrowFunctionExpression`; dòng gốc: **3774–3782**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 52. Il2Cpp["perform"] callback — F621

- Loại: `ArrowFunctionExpression`; dòng gốc: **3776–3781**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã tắt siêu tốc thưa sếp."`

## 53. setTimeout callback — F622

- Loại: `ArrowFunctionExpression`; dòng gốc: **3783–3791**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 54. Il2Cpp["perform"] callback — F623

- Loại: `ArrowFunctionExpression`; dòng gốc: **3785–3790**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã bật hoàn thành nhiệm vụ."`

## 55. setTimeout callback — F624

- Loại: `ArrowFunctionExpression`; dòng gốc: **3792–3801**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 56. Il2Cpp["perform"] callback — F625

- Loại: `ArrowFunctionExpression`; dòng gốc: **3794–3800**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã tắt hoàn thành nhiệm vụ."`

## 57. setTimeout callback — F626

- Loại: `ArrowFunctionExpression`; dòng gốc: **3802–3811**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 58. Il2Cpp["perform"] callback — F627

- Loại: `ArrowFunctionExpression`; dòng gốc: **3804–3810**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã tắt tìm npc."`

## 59. setTimeout callback — F628

- Loại: `ArrowFunctionExpression`; dòng gốc: **3838–3847**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 60. Il2Cpp["perform"] callback — F629

- Loại: `ArrowFunctionExpression`; dòng gốc: **3840–3846**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã đổi món ăn "`, `" thưa sếp."`

## 61. setTimeout callback — F630

- Loại: `ArrowFunctionExpression`; dòng gốc: **3856–3864**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 62. Il2Cpp["perform"] callback — F631

- Loại: `ArrowFunctionExpression`; dòng gốc: **3858–3863**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Đã tắt tự động nấu ăn."`

## 63. setTimeout callback — F632

- Loại: `ArrowFunctionExpression`; dòng gốc: **3864–3873**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"perform"`, `"main"`

## 64. Il2Cpp["perform"] callback — F633

- Loại: `ArrowFunctionExpression`; dòng gốc: **3866–3872**.
- Ngữ cảnh: `TField.setText`.
- Strings trực tiếp: `"Tự động nấu ăn sẽ tắt sau "`, `" lần."`

## 65. _0x21db8b — F634

- Loại: `ArrowFunctionExpression`; dòng gốc: **3882–3895**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"field"`, `"playerLists"`, `"value"`, `"Object"`, `"method"`, `"size"`, `"invoke"`, `"elementAt"`, `"name"`, `"toString"`, `"trim"`, `"toLocaleLowerCase"`, `"includes"`, `"chú cuội"`, `"uncle cuoi"`

## 66. _0x108c70 — F635

- Loại: `ArrowFunctionExpression`; dòng gốc: **3897–3913**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 67. setInterval callback — F636

- Loại: `ArrowFunctionExpression`; dòng gốc: **3899–3910**.
- Ngữ cảnh: `_0x108c70`.
- Strings trực tiếp: `"perform"`, `"main"`

## 68. Il2Cpp["perform"] callback — F637

- Loại: `ArrowFunctionExpression`; dòng gốc: **3901–3909**.
- Ngữ cảnh: `setInterval callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 69. onEnter — F638

- Loại: `ObjectMethod`; dòng gốc: **3914–3921**.
- Ngữ cảnh: `Canvas.addFlyText`.
- Strings trực tiếp: `"onEnter"`, `"isNull"`, `"null"`, `"String"`, `"content"`

## 70. onEnter — F639

- Loại: `ObjectMethod`; dòng gốc: **3921–3932**.
- Ngữ cảnh: `CustomTab.addd`.
- Strings trực tiếp: `"onEnter"`, `"String"`, `"toString"`, `"toLocaleLowerCase"`, `"includes"`, `"fish mission"`, `"nhiệm vụ thợ câu"`

## 71. onLeave — F640

- Loại: `ObjectMethod`; dòng gốc: **3932–3938**.
- Ngữ cảnh: `LoginScr.switchToMe`.
- Strings trực tiếp: `"onLeave"`

## 72. onLeave — F641

- Loại: `ObjectMethod`; dòng gốc: **3938–3954**.
- Ngữ cảnh: `ParkListSrc.switchToMe`.
- Strings trực tiếp: `"onLeave"`, `"method"`, `"gI"`, `"invoke"`, `"Object"`, `".ctor"`, `"field"`, `"selected"`, `"value"`, `"setSelected"`

## 73. _0x57ee7a — F642

- Loại: `ArrowFunctionExpression`; dòng gốc: **3955–3980**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"field"`, `"instance"`, `"value"`, `"isNull"`, `"Object"`, `"tfChat"`, `"method"`, `"showTF"`, `"invoke"`, `"string"`, `"setText"`, `"alloc"`, `".ctor"`, `"perform"`

## 74. _0x2763b5 — F643

- Loại: `ArrowFunctionExpression`; dòng gốc: **3980–4012**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 75. setTimeout callback — F644

- Loại: `ArrowFunctionExpression`; dòng gốc: **3981–4011**.
- Ngữ cảnh: `_0x2763b5`.
- Strings trực tiếp: `"perform"`

## 76. Il2Cpp["perform"] callback — F645

- Loại: `ArrowFunctionExpression`; dòng gốc: **3984–4010**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"field"`, `"instance"`, `"value"`, `"Object"`, `"idShop"`

## 77. setTimeout callback — F646

- Loại: `ArrowFunctionExpression`; dòng gốc: **3988–4006**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"perform"`

## 78. Il2Cpp["perform"] callback — F647

- Loại: `ArrowFunctionExpression`; dòng gốc: **3990–4005**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"isNull"`, `"Object"`, `"doBuyItem"`

## 79. _0x1df3df — F648

- Loại: `ArrowFunctionExpression`; dòng gốc: **4012–4035**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"isNull"`, `"field"`, `"wMap"`, `"value"`, `"Hmap"`, `"method"`, `"getTypeMap"`, `"invoke"`, `"push"`, `"x"`, `"y"`

## 80. _0x234e45 — F649

- Loại: `ArrowFunctionExpression`; dòng gốc: **4035–4116**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"length"`, `"no fishing spot"`, `"all seats failed"`, `"floor"`, `"random"`, `"min"`, `"invalid seat index"`, `"perform"`, `"outer error"`

## 81. _0x7669c9 — F650

- Loại: `ArrowFunctionExpression`; dòng gốc: **4039–4042**.
- Ngữ cảnh: `_0x234e45`.
- Strings trực tiếp: `""`

## 82. Il2Cpp["perform"] callback — F651

- Loại: `ArrowFunctionExpression`; dòng gốc: **4057–4082**.
- Ngữ cảnh: `_0x234e45`.
- Strings trực tiếp: `"x"`, `"y"`, `"field"`, `"instance"`, `"value"`, `"isNull"`, `"Canvas null"`, `"Object"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"pointerReleased"`, `"click error"`

## 83. setTimeout callback — F652

- Loại: `ArrowFunctionExpression`; dòng gốc: **4068–4077**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"perform"`

## 84. Il2Cpp["perform"] callback — F653

- Loại: `ArrowFunctionExpression`; dòng gốc: **4070–4076**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"method"`, `"pointerPressed"`, `"invoke"`, `"x"`, `"y"`, `"pointerReleased"`

## 85. setTimeout callback — F654

- Loại: `ArrowFunctionExpression`; dòng gốc: **4082–4112**.
- Ngữ cảnh: `_0x234e45`.
- Strings trực tiếp: `"perform"`, `"main"`

## 86. Il2Cpp["perform"] callback — F655

- Loại: `ArrowFunctionExpression`; dòng gốc: **4084–4111**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: `"đã quăng câu"`, `"isFarming"`, `"isStopTakeSeat"`, `"method"`, `"gI"`, `"invoke"`, `"isNull"`, `"Object"`, `"field"`, `"cmdClose"`, `"value"`, `"perform"`, `"length"`, `"x"`, `"y"`, `"attempt finished"`, `"timeout error"`

## 87. onEnter — F656

- Loại: `ObjectMethod`; dòng gốc: **4117–4138**.
- Ngữ cảnh: `LoadMap.update`.
- Strings trực tiếp: `"onEnter"`, `"isNull"`, `"now"`, `"Object"`, `"method"`, `"doJoin"`, `"invoke"`, `"x"`, `"y"`

## 88. onEnter — F657

- Loại: `ObjectMethod`; dòng gốc: **4138–4142**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"onEnter"`, `"toInt32"`, `"includes"`

## 89. onLeave — F658

- Loại: `ObjectMethod`; dòng gốc: **4142–4200**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"onLeave"`

## 90. setTimeout callback — F659

- Loại: `ArrowFunctionExpression`; dòng gốc: **4144–4197**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"perform"`

## 91. Il2Cpp["perform"] callback — F660

- Loại: `ArrowFunctionExpression`; dòng gốc: **4146–4196**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"includes"`, `"x"`, `"y"`, `"length"`, `"floor"`, `"random"`, `"field"`, `"instance"`, `"value"`, `"isNull"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"pointerReleased"`

## 92. setTimeout callback — F661

- Loại: `ArrowFunctionExpression`; dòng gốc: **4150–4156**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"perform"`

## 93. Il2Cpp["perform"] callback — F662

- Loại: `ArrowFunctionExpression`; dòng gốc: **4152–4155**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"field"`, `"instance"`, `"value"`, `"isNull"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"x"`, `"y"`, `"pointerReleased"`, `"avatar"`

## 94. setTimeout callback — F663

- Loại: `ArrowFunctionExpression`; dòng gốc: **4177–4190**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"perform"`

## 95. Il2Cpp["perform"] callback — F664

- Loại: `ArrowFunctionExpression`; dòng gốc: **4179–4189**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"x"`, `"y"`

## 96. setTimeout callback — F665

- Loại: `ArrowFunctionExpression`; dòng gốc: **4181–4186**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: `"perform"`

## 97. Il2Cpp["perform"] callback — F666

- Loại: `ArrowFunctionExpression`; dòng gốc: **4183–4185**.
- Ngữ cảnh: `MapScr.onJoinPark`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 98. onEnter — F667

- Loại: `ObjectMethod`; dòng gốc: **4200–4203**.
- Ngữ cảnh: `LoadMap.addPopup`.
- Strings trực tiếp: `"onEnter"`, `"push"`, `"x"`, `"toInt32"`, `"y"`

## 99. onEnter — F668

- Loại: `ObjectMethod`; dòng gốc: **4203–4206**.
- Ngữ cảnh: `Canvas.startOKDlg`.
- Strings trực tiếp: `"onEnter"`, `"str"`, `"String"`, `"content"`

## 100. onLeave — F669

- Loại: `ObjectMethod`; dòng gốc: **4206–4232**.
- Ngữ cảnh: `Canvas.startOKDlg`.
- Strings trực tiếp: `"onLeave"`, `"str"`, `"toLocaleLowerCase"`, `"includes"`, `"khu vực"`, `"this area"`, `"slow down"`, `"chầm chậm"`, `"vé"`, `"ticket"`, `"method"`, `"endDlg"`, `"invoke"`

## 101. setTimeout callback — F670

- Loại: `ArrowFunctionExpression`; dòng gốc: **4213–4231**.
- Ngữ cảnh: `Canvas.startOKDlg`.
- Strings trực tiếp: `"perform"`

## 102. Il2Cpp["perform"] callback — F671

- Loại: `ArrowFunctionExpression`; dòng gốc: **4214–4230**.
- Ngữ cảnh: `Canvas.startOKDlg`.
- Strings trực tiếp: `"x"`, `"y"`

## 103. onEnter — F672

- Loại: `ObjectMethod`; dòng gốc: **4232–4284**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"onEnter"`, `"isNull"`, `"Object"`, `"field"`, `"str"`, `"value"`, `"String"`, `"content"`, `"toLocaleLowerCase"`, `"includes"`, `"use boraras bait"`, `"cần sử dụng mồi câu cá trâm"`, `"sử dụng mồi câu"`, `"need a bait"`, `"cần vé câu cá mập"`, `"need a shark ticket"`, `"cần vé câu cá lóc"`, `"need a snake head ticket"`, `"cần vé câu cá bến tàu"`, `"need a pier fishing ticket"`

## 104. setTimeout callback — F673

- Loại: `ArrowFunctionExpression`; dòng gốc: **4252–4282**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"perform"`

## 105. Il2Cpp["perform"] callback — F674

- Loại: `ArrowFunctionExpression`; dòng gốc: **4254–4281**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"method"`, `"endDlg"`, `"invoke"`

## 106. setTimeout callback — F675

- Loại: `ArrowFunctionExpression`; dòng gốc: **4260–4280**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"perform"`

## 107. Il2Cpp["perform"] callback — F676

- Loại: `ArrowFunctionExpression`; dòng gốc: **4262–4279**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"isNull"`, `"Object"`, `"field"`, `"cmdClose"`, `"value"`, `"perform"`, `"includes"`

## 108. setTimeout callback — F677

- Loại: `ArrowFunctionExpression`; dòng gốc: **4269–4274**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"perform"`

## 109. Il2Cpp["perform"] callback — F678

- Loại: `ArrowFunctionExpression`; dòng gốc: **4271–4273**.
- Ngữ cảnh: `MsgDlg.setPosButton`.
- Strings trực tiếp: `"x"`, `"y"`

## 110. _0x28d3f9 — F679

- Loại: `ArrowFunctionExpression`; dòng gốc: **4286–4309**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"method"`, `"gI"`, `"invoke"`, `"Object"`, `"close"`, `"getHandler"`, `"commandActionPointer"`, `"doJoinPark"`

## 111. _0x500834 — F680

- Loại: `ArrowFunctionExpression`; dòng gốc: **4309–4317**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"Object"`, `"field"`, `"instance"`, `"value"`, `"method"`, `"doExit"`, `"invoke"`, `"now"`

## 112. onEnter — F681

- Loại: `ObjectMethod`; dòng gốc: **4318–4320**.
- Ngữ cảnh: `MapScr.joinCitymap`.
- Strings trực tiếp: `"onEnter"`

## 113. onLeave — F682

- Loại: `ObjectMethod`; dòng gốc: **4320–4344**.
- Ngữ cảnh: `MapScr.joinCitymap`.
- Strings trực tiếp: `"onLeave"`, `"field"`, `"me"`, `"value"`, `"selected"`, `"method"`, `"gI"`, `"invoke"`, `"commandActionPointer"`, `"Object"`, `"instance"`, `"getHandler"`

## 114. _0xec5551 — F683

- Loại: `ArrowFunctionExpression`; dòng gốc: **4345–4359**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"Object"`, `"field"`, `"listItemFarm"`, `"value"`, `"method"`, `"size"`, `"invoke"`, `"instance"`, `"doBuyItem"`, `"elementAt"`, `"push"`, `"id"`, `"ID"`, `"number"`, `"map"`

## 115. _0xef4611["map"] callback — F684

- Loại: `ArrowFunctionExpression`; dòng gốc: **4352–4358**.
- Ngữ cảnh: `_0xec5551`.
- Strings trực tiếp: `"findIndex"`, `"method"`, `"doBuyItem"`, `"invoke"`, `"id"`, `"price"`

## 116. _0x209f98["findIndex"] callback — F685

- Loại: `ArrowFunctionExpression`; dòng gốc: **4354–4354**.
- Ngữ cảnh: `_0xef4611["map"] callback`.
- Strings trực tiếp: `"id"`, `"number"`

## 117. _0x403d54 — F686

- Loại: `ArrowFunctionExpression`; dòng gốc: **4361–4374**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"x"`, `"y"`, `"field"`, `"instance"`, `"value"`, `"isNull"`, `"method"`, `"pointerPressed"`, `"invoke"`, `"pointerReleased"`

## 118. setTimeout callback — F687

- Loại: `ArrowFunctionExpression`; dòng gốc: **4366–4371**.
- Ngữ cảnh: `_0x403d54`.
- Strings trực tiếp: `"perform"`

## 119. Il2Cpp["perform"] callback — F688

- Loại: `ArrowFunctionExpression`; dòng gốc: **4368–4370**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 120. onEnter — F689

- Loại: `ObjectMethod`; dòng gốc: **4375–4400**.
- Ngữ cảnh: `CookingScr.switchToMe`.
- Strings trực tiếp: `"onEnter"`, `"Object"`, `"field"`, `"listDetailCooking"`, `"value"`, `"method"`, `"gI"`, `"invoke"`, `"isNull"`, `"size"`, `"elementAt"`, `"time"`, `"id"`, `"doHarvestCook"`, `"doCooking"`, `"close"`

## 121. _0x18ddcd — F690

- Loại: `ArrowFunctionExpression`; dòng gốc: **4401–4422**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"perform"`

## 122. Il2Cpp["perform"] callback — F691

- Loại: `ArrowFunctionExpression`; dòng gốc: **4403–4421**.
- Ngữ cảnh: `_0x18ddcd`.
- Strings trực tiếp: `"length"`

## 123. _0x32ccbf — F692

- Loại: `ArrowFunctionExpression`; dòng gốc: **4407–4419**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"length"`, `"perform"`

## 124. Il2Cpp["perform"] callback — F693

- Loại: `ArrowFunctionExpression`; dòng gốc: **4411–4418**.
- Ngữ cảnh: `_0x32ccbf`.
- Strings trực tiếp: `"field"`, `"instance"`, `"value"`, `"isNull"`, `"Object"`, `"method"`, `"doPlantSeed"`, `"invoke"`

## 125. _0xfcca0f — F694

- Loại: `ArrowFunctionExpression`; dòng gốc: **4422–4473**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: `"Object"`, `"field"`, `"cell"`, `"value"`, `"method"`, `"size"`, `"invoke"`, `"instance"`, `"idFarm"`, `"elementAt"`, `"statusTree"`, `"idTree"`, `"isWorm"`, `"setBonPhan"`, `"isGrass"`, `"doHervest"`, `"push"`, `"doUsingItem"`, `"doPlantSeed"`, `"gI"`, `"animalLists"`, `"listAnimalInfo"`, `"species"`, `"diedTime"`, `"priceProduct"`, `"harvestTime"`, `"getAnimalByIndex"`, `"isNull"`, `"bornTime"`, `"IDDB"`, `"doHarvestAnimal"`, `"requestTakeCareAnimal"`, `"findIndex"`, `"doSellAnimal"`, `"pointerPressed"`, `"pointerReleased"`, `"length"`

## 126. _0x8ee63c["findIndex"] callback — F695

- Loại: `ArrowFunctionExpression`; dòng gốc: **4445–4445**.
- Ngữ cảnh: `_0xfcca0f`.
- Strings trực tiếp: `"species"`

## 127. setTimeout callback — F696

- Loại: `ArrowFunctionExpression`; dòng gốc: **4459–4465**.
- Ngữ cảnh: `_0xfcca0f`.
- Strings trực tiếp: `"perform"`

## 128. Il2Cpp["perform"] callback — F697

- Loại: `ArrowFunctionExpression`; dòng gốc: **4460–4464**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 129. _0x18ddcd callback — F698

- Loại: `ArrowFunctionExpression`; dòng gốc: **4461–4463**.
- Ngữ cảnh: `Il2Cpp["perform"] callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 130. setTimeout callback — F699

- Loại: `ArrowFunctionExpression`; dòng gốc: **4465–4469**.
- Ngữ cảnh: `_0xfcca0f`.
- Strings trực tiếp: `"perform"`

## 131. Il2Cpp["perform"] callback — F700

- Loại: `ArrowFunctionExpression`; dòng gốc: **4466–4468**.
- Ngữ cảnh: `setTimeout callback`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 132. onLeave — F701

- Loại: `ObjectMethod`; dòng gốc: **4474–4484**.
- Ngữ cảnh: `FarmScr.resizeMap`.
- Strings trực tiếp: `"onLeave"`

## 133. setTimeout callback — F702

- Loại: `ArrowFunctionExpression`; dòng gốc: **4476–4481**.
- Ngữ cảnh: `FarmScr.resizeMap`.
- Strings trực tiếp: `"perform"`, `"main"`

## 134. Il2Cpp["perform"] callback — F703

- Loại: `ArrowFunctionExpression`; dòng gốc: **4478–4480**.
- Ngữ cảnh: `FarmScr.resizeMap`.
- Strings trực tiếp: Không có string literal trực tiếp.

## 135. onLeave — F704

- Loại: `ObjectMethod`; dòng gốc: **4484–4487**.
- Ngữ cảnh: `FishingScr.onStartFishing`.
- Strings trực tiếp: `"onLeave"`

## 136. onEnter — F705

- Loại: `ObjectMethod`; dòng gốc: **4487–4489**.
- Ngữ cảnh: `FishingScr.doClose`.
- Strings trực tiếp: `"onEnter"`

## 137. onEnter — F706

- Loại: `ObjectMethod`; dòng gốc: **4489–4566**.
- Ngữ cảnh: `FishingScr.update`.
- Strings trực tiếp: `"onEnter"`, `"Object"`, `"field"`, `"listKeyRecieve"`, `"value"`, `"listKeySend"`, `"isNull"`, `"method"`, `"size"`, `"invoke"`, `"hideIcon"`, `"now"`, `"cmdClose"`, `"perform"`, `"commandActionPointer"`, `"autocauca.io.vn"`, `"cmdQuanCau"`, `"cmdXong"`, `"length"`, `"setIndex"`

## 138. onEnter — F707

- Loại: `ObjectMethod`; dòng gốc: **4569–4609**.
- Ngữ cảnh: `FishingScr.onCaCanCau`.
- Strings trực tiếp: `"onEnter"`, `"toInt32"`, `"isNull"`, `"Array"`, `"length"`, `"get"`, `"push"`

## 139. onEnter — F708

- Loại: `ObjectMethod`; dòng gốc: **4609–4615**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"onEnter"`, `"incomingId"`, `"toInt32"`, `"value"`

## 140. onLeave — F709

- Loại: `ObjectMethod`; dòng gốc: **4615–4649**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"onLeave"`, `"incomingId"`, `"value"`

## 141. setTimeout callback — F710

- Loại: `ArrowFunctionExpression`; dòng gốc: **4620–4648**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"perform"`

## 142. Il2Cpp["perform"] callback — F711

- Loại: `ArrowFunctionExpression`; dòng gốc: **4622–4647**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"value"`, `"field"`, `"instance"`, `"isNull"`, `"Object"`, `"method"`, `"pointerPressed"`, `"invoke"`

## 143. setTimeout callback — F712

- Loại: `ArrowFunctionExpression`; dòng gốc: **4630–4639**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"perform"`

## 144. Il2Cpp["perform"] callback — F713

- Loại: `ArrowFunctionExpression`; dòng gốc: **4632–4638**.
- Ngữ cảnh: `FishingScr.onFinish`.
- Strings trực tiếp: `"method"`, `"pointerReleased"`, `"invoke"`
