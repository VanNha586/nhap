// Ban phan tich tinh: phan bot avatar.js; phu thuoc Frida + Il2Cpp.
// Ten _0x... duoc giu nguyen; day khong phai ten ham goc da khoi phuc.
// Khoi tao frida-il2cpp-bridge nam trong avatar.decoded.js.

setTimeout(() => {
  function _0x74df60(_0x2568bd = "LICENSE_KEY") {
    const _0x2c2a6e = "/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml";
    try {
      const _0xdde9e0 = new File(_0x2c2a6e, "r"),
        _0x556dc4 = _0xdde9e0.readText();
      _0xdde9e0.close();
      let _0x32984a = _0x556dc4.match(new RegExp("<string name=\"" + _0x2568bd + "\">([^<]+)</string>"));
      if (_0x32984a && _0x32984a[1]) {
        let _0x4997cf = _0x32984a[1];
        return _0x4997cf = _0x4997cf.replace(/&quot;/g, "\""), _0x4997cf;
      }
      let _0x5c5d6a = _0x556dc4.match(new RegExp("<int name=\"" + _0x2568bd + "\" value=\"([^\"]+)\""));
      if (_0x5c5d6a && _0x5c5d6a[1]) return parseInt(_0x5c5d6a[1], 10);
      let _0x27b6b8 = _0x556dc4.match(new RegExp("<boolean name=\"" + _0x2568bd + "\" value=\"([^\"]+)\""));
      if (_0x27b6b8 && _0x27b6b8[1]) return _0x27b6b8[1] === "true";
      return null;
    } catch (_0x178f06) {
      return null;
    }
  }
  function _0x38515e(_0x148039, _0x145592) {
    const _0x3ab599 = "/data/data/com.TeaM.Avatar/shared_prefs/AutoAppPrefs.xml";
    try {
      const _0x2fd79c = new File(_0x3ab599, "r");
      let _0x159901 = _0x2fd79c.readText();
      _0x2fd79c.close();
      const _0x544165 = new RegExp("<string name=\"" + _0x148039 + "\">([^<]*)</string>");
      _0x544165.test(_0x159901) ? _0x159901 = _0x159901.replace(_0x544165, "<string name=\"" + _0x148039 + "\">" + _0x145592 + "</string>") : _0x159901 = _0x159901.replace("</map>", "    <string name=\"" + _0x148039 + "\">" + _0x145592 + "</string>\n</map>");
      const _0x258485 = new File(_0x3ab599, "w");
      return _0x258485.write(_0x159901), _0x258485.flush(), _0x258485.close(), true;
    } catch (_0x5b8b61) {
      return false;
    }
  }
  Il2Cpp.perform(() => {
    try {
      let _0x385fac = function (_0x24cb56) {
          const _0x1f076f = [],
            _0xaca44f = _0x24cb56.split("\n"),
            _0x561364 = /-\s*(?:fish|câu)\s+(\d+)\s+(.*?)\s*-\s*(.+)$/i;
          for (let _0x4cdb10 of _0xaca44f) {
            _0x4cdb10 = _0x4cdb10.trim();
            if (_0x4cdb10.toLowerCase().startsWith("reward") || _0x4cdb10.toLowerCase().startsWith("phần thưởng")) break;
            const _0x569f9b = _0x4cdb10.match(_0x561364);
            if (_0x569f9b) {
              const _0x43d754 = parseInt(_0x569f9b[1], 10),
                _0x5a7323 = _0x569f9b[2].trim().toLowerCase(),
                _0x2a0133 = _0x569f9b[3].trim().toLowerCase();
              let _0x4b0a89 = 0,
                _0x3a4db1 = 0;
              _0x2a0133.includes("/") ? _0x4b0a89 = parseInt(_0x2a0133.split("/")[0], 10) : _0x4b0a89 = _0x43d754;
              _0x4b0a89 >= _0x43d754 && (_0x4b0a89 = _0x43d754, _0x3a4db1 = 1);
              let _0x3f963e = null,
                _0x2ca414 = null;
              for (const _0x51b793 of _0x394b35) {
                if (_0x5a7323.includes(_0x51b793.name)) {
                  _0x3f963e = _0x51b793.id, _0x2ca414 = _0x51b793.idMap;
                  break;
                }
              }
              _0x1f076f.push({
                idFish: _0x3f963e,
                idMap: _0x2ca414,
                name: _0x5a7323,
                currentNum: _0x4b0a89,
                requestNum: _0x43d754,
                status: _0x3a4db1
              });
            }
          }
          return _0x1f076f;
        },
        _0x4314e6 = function (_0x403223, _0x5ce806) {
          const _0x1d7a47 = _0x20ebd9.field("w").value,
            _0x408fd2 = _0x20ebd9.field("h").value,
            _0x2e5a4c = Math.round(_0x1d7a47 * (_0x403223 / 650)),
            _0x47111d = Math.round(_0x408fd2 * (_0x5ce806 / 300));
          return {
            x: _0x2e5a4c,
            y: _0x47111d
          };
        },
        _0x2bf4ba = function (_0x7c4ec9, _0x2d1b2f) {
          const _0x1fa610 = _0x492cda.method("gI").invoke(),
            _0x25f0b0 = new Il2Cpp.Object(_0x1fa610),
            _0x12a3e5 = Number(_0x25f0b0.field("xCam").value),
            _0x17bf9f = Number(_0x25f0b0.field("yCam").value),
            _0x4d05d7 = Number(_0x146bb4.field("zoom").value),
            _0x4817cc = Number(_0x20ebd9.field("transTab").value);
          return {
            x: Math.trunc((_0x7c4ec9 - _0x12a3e5) * _0x4d05d7),
            y: Math.trunc((_0x2d1b2f - _0x17bf9f + _0x4817cc) * _0x4d05d7)
          };
        },
        _0x17ca5e = function () {
          const _0x5140a9 = /* @__PURE__ */new Date(),
            _0xe6068c = _0x5140a9.getFullYear(),
            _0x58bdae = _0x5140a9.getMonth() + 1,
            _0x76841d = _0x5140a9.getDate(),
            _0x274740 = _0x5140a9.getHours(),
            _0x35d2dd = _0xe6068c === 2026 && (_0x58bdae === 9 && _0x76841d >= 23 && _0x76841d <= 30 || _0x58bdae === 10 && _0x76841d >= 1 && _0x76841d <= 6),
            _0x23f980 = _0x274740 >= 6 && _0x274740 < 9 || _0x274740 >= 10 && _0x274740 < 14 || _0x274740 >= 19 && _0x274740 < 22;
          return _0x35d2dd && _0x23f980;
        },
        _0x449de4 = function (_0x2909bc) {
          if (!_0x2909bc) return false;
          const _0x951de9 = _0x2909bc.toLowerCase();
          if (_0x951de9.includes("1 hộp bánh") || _0x951de9.includes("1 mooncake box")) {
            const _0x238ddf = /(\d+)\s*\/\s*(\d+)/,
              _0x21ddd5 = _0x951de9.match(_0x238ddf);
            if (_0x21ddd5) {
              const _0x407807 = parseInt(_0x21ddd5[1], 10),
                _0x3e5b49 = parseInt(_0x21ddd5[2], 10);
              if (_0x407807 === _0x3e5b49) return true;
            }
          }
          return false;
        },
        _0x3c4d04 = function () {
          const _0x1c87da = /* @__PURE__ */new Date(),
            _0x64b196 = _0x1c87da.getDate() + "/" + (_0x1c87da.getMonth() + 1) + "/" + _0x1c87da.getFullYear(),
            _0x2b0856 = _0x74df60("GIFT_LIST");
          if (!_0x2b0856) return true;
          try {
            const _0x5dd9bd = JSON.parse(_0x2b0856);
            if (_0x5dd9bd.date !== _0x64b196) return true;
            if (_0x5dd9bd.idPlayers && Array.isArray(_0x5dd9bd.idPlayers)) {
              if (_0x5dd9bd.idPlayers.includes(_0x4df42f)) return false;
            }
            return true;
          } catch (_0x405a0e) {
            return true;
          }
        },
        _0x55bf4a = function () {
          const _0x405032 = /* @__PURE__ */new Date(),
            _0xf8c4b8 = _0x405032.getDate() + "/" + (_0x405032.getMonth() + 1) + "/" + _0x405032.getFullYear();
          let _0x31572d = _0x74df60("GIFT_LIST"),
            _0x32aedd = {
              date: _0xf8c4b8,
              idPlayers: []
            };
          if (_0x31572d) try {
            let _0x16172e = JSON.parse(_0x31572d);
            _0x16172e.date === _0xf8c4b8 && (_0x32aedd.idPlayers = _0x16172e.idPlayers || []);
          } catch (_0x44c522) {}
          !_0x32aedd.idPlayers.includes(_0x4df42f) && _0x32aedd.idPlayers.push(_0x4df42f);
          const _0x52be89 = JSON.stringify(_0x32aedd);
          _0x38515e("GIFT_LIST", _0x52be89);
        },
        _0x2e1e09 = function () {
          _0x32ab22 !== null && (clearInterval(_0x32ab22), _0x32ab22 = null), _0x2b672a !== null && (clearTimeout(_0x2b672a), _0x2b672a = null);
        },
        _0x19bea8 = function () {
          _0x3d003d = true, _0x1999af = false, _0x415982 = [], setImmediate(function () {
            try {
              const _0x16d0dc = "/data/data/com.TeaM.Avatar/files",
                _0x3d9c9e = _0x16d0dc + "/minigame_in.json",
                _0x8fd59d = _0x16d0dc + "/minigame_out.json";
              _0x2e1e09();
              try {
                const _0x1895bf = new File(_0x8fd59d, "w");
                _0x1895bf.write(""), _0x1895bf.flush(), _0x1895bf.close();
              } catch (_0x385e92) {}
              const _0x3c96a0 = JSON.stringify({
                  sources: _0x3c8caa,
                  targets: _0x3963a7
                }),
                _0x3116dd = _0x3d9c9e + ".tmp",
                _0x2fc4f2 = new File(_0x3116dd, "w");
              _0x2fc4f2.write(_0x3c96a0), _0x2fc4f2.flush(), _0x2fc4f2.close();
              const _0xcfa603 = new File(_0x3d9c9e, "w");
              _0xcfa603.write(_0x3c96a0), _0xcfa603.flush(), _0xcfa603.close(), _0x2e1e09(), _0x32ab22 = setInterval(function () {
                try {
                  const _0x203f30 = new File(_0x8fd59d, "r"),
                    _0x32ad2d = _0x203f30.readText().trim();
                  _0x203f30.close();
                  if (!_0x32ad2d) return;
                  const _0x4574ff = JSON.parse(_0x32ad2d);
                  if (!Array.isArray(_0x4574ff)) return;
                  _0x415982 = _0x4574ff, _0x1999af = true, _0x2e1e09(), _0x3d003d = false;
                } catch (_0x26d4ea) {}
              }, 100), _0x2b672a = setTimeout(function () {
                _0x1999af = true, _0x2e1e09(), _0x3d003d = false;
              }, 3e3);
            } catch (_0x3ed4ce) {
              _0x2e1e09(), _0x3d003d = false;
            }
          });
        };
      const _0x22042d = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("FishingScr"),
        _0x20ebd9 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Canvas"),
        _0xdfcea2 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("GameMidlet"),
        _0x5a5c11 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("LoadMap"),
        _0x27324f = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("MapScr"),
        _0x2d2dec = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("MsgDlg"),
        _0x240da0 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("AvatarService"),
        _0x13a562 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("GlobalService"),
        _0x4a7efc = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("FarmScr"),
        _0x32cfe0 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("FarmService"),
        _0x1ecc2b = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("ChatTextField/IActionChat2"),
        _0x193843 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("TField"),
        _0x2a5ff1 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("ChatTextField"),
        _0x211ffe = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("MiniMap"),
        _0x2bcf23 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("FarmData"),
        _0x21b8eb = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("ParkService"),
        _0x2077c0 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("ParkListSrc"),
        _0x146bb4 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("AvMain"),
        _0x492cda = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("AvCamera"),
        _0x2b6250 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("LoginScr"),
        _0x34c6fb = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("CustomTab"),
        _0x582a28 = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("CookingScr");
      var _0x2d4228 = false,
        _0x5a3a62 = false;
      let _0x55e5bc = false,
        _0x3866c8 = false,
        _0x296f4c = 0;
      const _0xd74e0 = 30,
        _0x325334 = 15;
      let _0x15b8b3 = 0,
        _0x47ac34 = 0,
        _0x415982 = [],
        _0x2b4842 = 0,
        _0x29a5e9 = false,
        _0x2ffdf7 = _0x74df60("SEED_ID") ?? -1,
        _0x335d3b = true,
        _0x535564 = true,
        _0x1d127d = false,
        _0x2f6780 = false,
        _0x5e4769 = _0x74df60("FOOD_ID") ?? -1,
        _0x4df42f = -1,
        _0x58a09d = null,
        _0x5acb36 = 0,
        _0x318e92 = 0,
        _0x18e9f1 = 0,
        _0x5d284b = true,
        _0x22eea9 = false,
        _0x5b59ad = [],
        _0x253d06 = -1,
        _0x4f92a9 = -1,
        _0x106a7e = false,
        _0x16a34e = false,
        _0x15025f = false,
        _0x1ee085 = false,
        _0x23c09b = -1,
        _0x818a48 = [],
        _0x568339 = [],
        _0x5b8c12 = [],
        _0x315095 = false,
        _0x5631bc = false,
        _0x505798 = null,
        _0x1f869c = false,
        _0x519b9a = -1,
        _0x5f2641 = 1,
        _0x55a468 = 1;
      const _0x464150 = _0x74df60("FARM_TIME") ?? 0;
      let _0x4526cc = _0x464150 > 0 ? _0x464150 * 60 * 1e3 : 0,
        _0x574d5a = 0;
      const _0x3e4b0f = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31, 34, 35, 36, 39, 41, 42, 43, 44, 45, 46, 47, 48];
      let _0x4b0b58 = [],
        _0x17e832 = false,
        _0x5ecd2d = 0;
      ;
      let _0x1aef60 = false,
        _0x5cad52 = 0,
        _0x1a3d6a = 0,
        _0x3fb506 = false;
      const _0x4b251e = [{
        id: 449,
        idMap: 14,
        names: ["cá lòng tong", "tiny fish"]
      }, {
        id: 444,
        idMap: 14,
        names: ["cá rô", "perch fish"]
      }, {
        id: 450,
        idMap: 14,
        names: ["cá chép vàng", "carp"]
      }, {
        id: 451,
        idMap: 15,
        names: ["cá lóc", "snake head"]
      }, {
        id: 452,
        idMap: 15,
        names: ["cá nóc", "puffer"]
      }, {
        id: 453,
        idMap: 15,
        names: ["cua", "crab"]
      }, {
        id: 456,
        idMap: 16,
        names: ["cá ngựa", "horsefish"]
      }, {
        id: 454,
        idMap: 16,
        names: ["cá chim", "butter"]
      }, {
        id: 455,
        idMap: 16,
        names: ["cá đuối", "rayfish"]
      }, {
        id: 4506,
        idMap: 27,
        names: ["cá hề", "nemo"]
      }, {
        id: 4504,
        idMap: 27,
        names: ["cá lia thia", "paradise"]
      }, {
        id: 4507,
        idMap: 27,
        names: ["cá vàng", "golden fish"]
      }, {
        id: 4505,
        idMap: 27,
        names: ["cá chép", "perch"]
      }, {
        id: 4508,
        idMap: 27,
        names: ["nhái", "frog"]
      }, {
        id: 4509,
        idMap: 27,
        names: ["chàng hiu", "green frog"]
      }, {
        id: 4510,
        idMap: 27,
        names: ["ếch", "blue frog"]
      }, {
        id: 4516,
        idMap: 27,
        names: ["mực", "squid"]
      }, {
        id: 4518,
        idMap: 27,
        names: ["bạch tuộc", "octopus"]
      }, {
        id: 4511,
        idMap: 27,
        names: ["sứa", "jellyfish"]
      }];
      setTimeout(() => {
        try {
          if (!_0x29a5e9) {
            const _0x2998fa = _0x74df60("LICENSE_KEY"),
              _0x1ba351 = _0x74df60("STATUS");
            if (_0x2998fa && _0x1ba351) {
              const _0xc0352f = _0x2998fa.replace(/\D/g, ""),
                _0x597f1f = _0xc0352f ? parseInt(_0xc0352f, 10) : 0,
                _0x58ef25 = parseInt(_0x1ba351, 10),
                _0x58de23 = _0x58ef25 - _0x597f1f,
                _0x9a9f6b = Math.floor(Date.now() / 1e3);
              _0x9a9f6b - _0x58de23 > 3600 && (_0x2f6780 = false);
            } else _0x2f6780 = false;
          }
          const _0x571b3c = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application");
          _0x571b3c.method("set_runInBackground").invoke(true);
        } catch (_0x272260) {}
      }, 5e3);
      const _0x394b35 = [];
      for (const _0x238733 of _0x4b251e) {
        for (const _0x1c52ad of _0x238733.names) {
          _0x394b35.push({
            name: _0x1c52ad.toLowerCase(),
            id: _0x238733.id,
            idMap: _0x238733.idMap
          });
        }
      }
      _0x394b35.sort((_0x5a5f32, _0x14d9f5) => _0x14d9f5.name.length - _0x5a5f32.name.length);
      const _0x59afe4 = () => {
        const _0x397544 = _0xdfcea2.field("avatar").value;
        if (!_0x397544.isNull()) try {
          const _0x2155f7 = _0x397544.field("IDDB").value,
            _0x327a0f = new Il2Cpp.String(_0x397544.field("name").value).toString();
          if (_0x327a0f) {
            _0x38515e("USERNAME", _0x327a0f);
            let _0x2ca76a = [];
            try {
              const _0x3cfd91 = _0x74df60("BLACKLISTED_USERNAMES");
              _0x3cfd91 && (_0x2ca76a = JSON.parse(_0x3cfd91));
            } catch (_0xf44913) {}
            const _0x2e424f = _0x2ca76a.some(_0x25ae3a => _0x327a0f.includes(_0x25ae3a));
            _0x2e424f && (_0x2f6780 = false);
          }
          if (_0x2155f7 > 0 && _0x2155f7 < 2e9) return _0x4df42f = _0x2155f7, _0x4df42f;
        } catch (_0x4410d9) {}
      };
      const _0x35fda9 = () => {
        try {
          const _0x4b89e2 = _0x20ebd9.field("instance").value,
            _0x396af8 = new Il2Cpp.Object(_0x4b89e2),
            _0x3b5688 = _0x4314e6(278, 185);
          _0x396af8.method("pointerPressed").invoke(_0x3b5688.x, _0x3b5688.y), setTimeout(() => {
            _0x396af8.method("pointerReleased").invoke(_0x3b5688.x, _0x3b5688.y);
          }, 50), setTimeout(() => {
            if (_0x1f869c) _0x35fda9();else return;
          }, 16e3);
        } catch (_0x435732) {}
      };
      let _0x476835 = (_0xdcec77, _0x2f63f9, _0x1c4998 = 10) => {
        _0x58a09d = {
          x: _0xdcec77,
          y: _0x2f63f9
        }, _0x5acb36 = _0x1c4998, _0x318e92 = Date.now();
      };
      const _0x5bb368 = _0x2fd9a7 => {
          if (!_0x4b0b58 || _0x4b0b58.length === 0) return;
          for (let _0x3e31e6 = 0; _0x3e31e6 < _0x4b0b58.length; _0x3e31e6++) {
            let _0x351255 = _0x4b0b58[_0x3e31e6];
            if (_0x351255.status === 0 && _0x351255.idFish === _0x2fd9a7) {
              _0x351255.currentNum += 1;
              _0x351255.currentNum >= _0x351255.requestNum && (_0x351255.currentNum = _0x351255.requestNum, _0x351255.status = 1, _0x4f2777());
              break;
            }
          }
        },
        _0x4f2777 = () => {
          try {
            const _0x72563 = _0x13a562.method("gI").invoke();
            if (_0x72563 != null) {
              const _0x461010 = new Il2Cpp.Object(_0x72563);
              try {
                _0x461010.method("doMenuOption").invoke(38, 0, 0), setTimeout(() => {
                  Il2Cpp.perform(() => {
                    const _0x51adba = _0x34c6fb.method("gI").invoke(),
                      _0x473eae = new Il2Cpp.Object(_0x51adba);
                    _0x473eae.method("close").invoke();
                    try {
                      if (_0x4b0b58 && _0x4b0b58.length > 0) {
                        let _0x495cbd = null;
                        for (let _0x44cd58 = 0; _0x44cd58 < _0x4b0b58.length; _0x44cd58++) {
                          if (_0x4b0b58[_0x44cd58].status === 0) {
                            _0x495cbd = _0x4b0b58[_0x44cd58];
                            break;
                          }
                        }
                        if (_0x495cbd !== null) {
                          if (_0x495cbd.idMap !== _0x253d06) {
                            _0x4f92a9 = _0x495cbd.idMap, _0x22eea9 = true, _0x5631bc = true;
                            if (_0x2d4228) try {
                              const _0x1f5f5b = _0x22042d.method("gI").invoke();
                              if (!_0x1f5f5b.isNull()) {
                                const _0x1f75f6 = new Il2Cpp.Object(_0x1f5f5b),
                                  _0x4b31e0 = _0x1f75f6.field("cmdClose").value;
                                !_0x4b31e0.isNull() && new Il2Cpp.Object(_0x4b31e0).method("perform").invoke();
                              }
                            } catch (_0x5835e7) {}
                            _0x500834();
                          } else {
                            if (!_0x2d4228) {
                              if (_0x253d06 == 27) {
                                if (!_0x106a7e && _0x335d3b && _0x5b8c12.length > 0 && !_0x29a5e9) return _0x23c09b = Math.floor(Math.random() * (10 - 3 + 1)) + 3, _0x22eea9 = true, _0x5631bc = true, _0x5834a4();
                              }
                              _0x234e45();
                            }
                          }
                        } else {}
                      } else {}
                    } catch (_0x22f834) {}
                  }, "main");
                }, 1e3);
              } catch (_0x15eda1) {}
            }
          } catch (_0x2f5be7) {}
        },
        _0x5834a4 = () => {
          try {
            _0x16a34e = false;
            try {
              if (_0x5b8c12.length === 0) return;
              const _0xdcf1e9 = _0x2bf4ba(_0x5b8c12[0].x, _0x5b8c12[0].y);
              if (_0xdcf1e9.x <= 0 || _0xdcf1e9.y <= 0) _0x476835(_0x5b8c12[0].x, _0x5b8c12[0].y);else {
                const _0x449cff = _0x20ebd9.field("instance").value;
                !_0x449cff.isNull() && (_0x449cff.method("pointerPressed").invoke(_0xdcf1e9.x, _0xdcf1e9.y), _0x449cff.method("pointerReleased").invoke(_0xdcf1e9.x, _0xdcf1e9.y));
              }
            } catch (_0x306333) {
              _0x476835(_0x5b8c12[0].x, _0x5b8c12[0].y);
            }
            setTimeout(() => {
              Il2Cpp.perform(() => {
                try {
                  !_0x16a34e && (_0x315095 = false, _0x22eea9 = false, _0x5631bc = false, _0x106a7e = false, _0x234e45());
                } catch (_0x115f29) {}
              });
            }, 1e4);
          } catch (_0x1ee8d7) {} finally {
            _0x106a7e = true;
          }
        };
      try {
        const _0x5a292c = _0x193843.method("setText");
        Interceptor.attach(_0x5a292c.virtualAddress, {
          onEnter(_0x110848) {
            try {
              if (_0x110848[1].isNull()) return;
              const _0x84593c = new Il2Cpp.String(_0x110848[1]),
                _0x4933e3 = _0x84593c.content;
              if (_0x4933e3) {
                if (!_0x29a5e9) {
                  const _0xf17f0e = _0x4933e3.toLowerCase().trim(),
                    _0x453e84 = _0xf17f0e.match(/^farmkt(\d+)ok$/);
                  if (_0x453e84) {
                    const _0x4c3d05 = parseInt(_0x453e84[1], 10);
                    if (_0x4c3d05 >= 15) _0x574d5a = Date.now() + _0x4c3d05 * 60 * 1e3, setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("OK sếp, lần chăm farm kế tiếp sau " + _0x4c3d05 + " phút", 10);
                        } catch (_0x494c4d) {}
                      }, "main");
                    }, 1e3);else {}
                  }
                  const _0x109039 = _0xf17f0e.match(/^farm(\d+)ok$/);
                  if (_0x109039) {
                    const _0x454cec = parseInt(_0x109039[1], 10);
                    _0x454cec >= 15 && (_0x4526cc = _0x454cec * 60 * 1e3, _0x574d5a = 0, setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("OK sếp, chăm farm sau " + _0x454cec + " phút", 10);
                        } catch (_0x4a51fc) {}
                      }, "main");
                    }, 1e3));
                  }
                  const _0xef89b9 = _0xf17f0e.match(/^gieohat(\d+)ok$/);
                  if (_0xef89b9) {
                    const _0x58d72a = parseInt(_0xef89b9[1], 10);
                    _0x58d72a >= 1 && _0x58d72a <= _0x3e4b0f.length && (_0x2ffdf7 = _0x3e4b0f[_0x58d72a - 1], setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("OK sếp, đã đổi hạt giống thứ tự " + _0x58d72a, 10);
                        } catch (_0x28ab81) {}
                      }, "main");
                    }, 1e3));
                  }
                  const _0x6956b5 = _0xf17f0e.match(/^autofarm(\d+)ok$/);
                  if (_0x6956b5 && _0x253d06 == 25) {
                    const _0x2471ef = parseInt(_0x6956b5[1], 10);
                    [14, 15, 16, 27].includes(_0x2471ef) ? setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("OK sếp, bắt đầu chăm farm rồi đi câu cá.", 10), _0x22eea9 = true, _0x4f92a9 = _0x2471ef, _0x3fb506 = false, _0xec5551();
                          const _0x1d8b6c = _0x2bf4ba(_0x5b59ad[1].x, _0x5b59ad[1].y),
                            _0x464e91 = _0x20ebd9.field("instance").value;
                          !_0x464e91.isNull() && (_0x464e91.method("pointerPressed").invoke(_0x1d8b6c.x, _0x1d8b6c.y), _0x464e91.method("pointerReleased").invoke(_0x1d8b6c.x, _0x1d8b6c.y)), setTimeout(() => {
                            !_0x3fb506 && Il2Cpp.perform(() => {
                              try {
                                _0x476835(_0x5b59ad[1].x, _0x5b59ad[1].y), setTimeout(() => {
                                  Il2Cpp.perform(() => {
                                    _0xfcca0f();
                                  });
                                }, 2e3);
                              } catch (_0x30cd3a) {}
                            });
                          }, 7e3);
                        } catch (_0x77c7ae) {}
                      }, "main");
                    }, 1e3) : _0x57ee7a("Không tìm thấy id bản đồ. Cá rô: 14, Cá mập: 15, Cá lóc: 16, Bến tàu: 27", 10);
                  }
                  _0xf17f0e.includes("zoneon") && (_0x335d3b = true, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã bật tự động chuyển khu thưa sếp.", 10);
                      } catch (_0x4f66ae) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("zoneoff") && (_0x335d3b = false, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã tắt tự động chuyển khu thưa sếp.", 10);
                      } catch (_0x389405) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("faston") && (_0x535564 = true, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã bật auto siêu tốc thưa sếp.", 10);
                      } catch (_0x3b5a54) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("fastoff") && (_0x535564 = false, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã tắt siêu tốc thưa sếp.", 10);
                      } catch (_0x359cff) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("queston") && (_0x1d127d = true, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã bật hoàn thành nhiệm vụ.", 10), _0x4f2777();
                      } catch (_0x1e33cb) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("questoff") && (_0x1d127d = false, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã tắt hoàn thành nhiệm vụ.", 10);
                      } catch (_0x4589ce) {}
                    }, "main");
                  }, 1e3));
                  _0xf17f0e.includes("npcoff") && (_0x5ecd2d = 0, setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x57ee7a("Đã tắt tìm npc.", 10);
                      } catch (_0x1372cd) {}
                    }, "main");
                  }, 1e3));
                  const _0x1b654e = _0xf17f0e.match(/^npc(\d+)ok$/);
                  if (_0x1b654e) {
                    const _0x14f11f = parseInt(_0x1b654e[1], 10);
                    if (!_0x17ca5e()) try {
                      return _0x57ee7a("Giờ này làm gì có chú cuội hả fen", 10);
                    } catch (_0x4f56a2) {}
                    if (!_0x3c4d04()) try {
                      return _0x57ee7a("Bạn đã nhận đủ quà rồi.", 10);
                    } catch (_0x351d23) {}
                    _0x5ecd2d = 1, _0x4f92a9 = _0x14f11f;
                    if (_0x2d4228) try {
                      const _0x467bb8 = _0x22042d.method("gI").invoke(),
                        _0x2a1ea9 = new Il2Cpp.Object(_0x467bb8),
                        _0x19f894 = _0x2a1ea9.field("cmdClose").value;
                      if (!_0x19f894.isNull()) new Il2Cpp.Object(_0x19f894).method("perform").invoke();
                    } catch (_0x27e280) {}
                    _0x500834();
                  }
                  const _0x2954f2 = _0xf17f0e.match(/^cook(\d+)ok$/);
                  if (_0x2954f2) {
                    const _0x15ebbe = parseInt(_0x2954f2[1], 10);
                    if (_0x15ebbe < 1 || _0x15ebbe > 35) try {
                      _0x57ee7a("Mã món ăn không hợp lệ.", 10);
                    } catch (_0x16f733) {}
                    _0x5e4769 = _0x15ebbe, setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("Đã đổi món ăn " + _0x15ebbe + " thưa sếp.", 10);
                        } catch (_0x437a1f) {}
                      }, "main");
                    }, 1e3);
                  }
                  const _0x3d2c5c = _0xf17f0e.match(/^cook(\d+)off$/);
                  if (_0x3d2c5c) {
                    const _0x2c224b = parseInt(_0x3d2c5c[1], 10);
                    if (_0x2c224b < 0) try {
                      _0x57ee7a("Số lần phải từ 0 trở lên", 10);
                    } catch (_0x52e805) {}
                    _0x2c224b == 0 ? (_0x5e4769 = -1, setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("Đã tắt tự động nấu ăn.", 10);
                        } catch (_0x1feaa2) {}
                      }, "main");
                    }, 1e3)) : (_0x5cad52 = 0, _0x1a3d6a = _0x2c224b, setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x57ee7a("Tự động nấu ăn sẽ tắt sau " + _0x2c224b + " lần.", 10);
                        } catch (_0x52a6b1) {}
                      }, "main");
                    }, 1e3));
                  }
                }
              }
            } catch (_0x297d59) {}
          }
        });
      } catch (_0x2827b3) {}
      const _0x21db8b = () => {
        try {
          const _0x331b8b = _0x5a5c11.field("playerLists").value;
          if (_0x331b8b == null) return false;
          const _0x4438ee = new Il2Cpp.Object(_0x331b8b),
            _0x4e5eb4 = _0x4438ee.method("size").invoke();
          for (let _0x592b0e = 0; _0x592b0e < _0x4e5eb4; _0x592b0e++) {
            const _0xe156e1 = _0x4438ee.method("elementAt").invoke(_0x592b0e),
              _0x2a46ea = new Il2Cpp.Object(_0xe156e1),
              _0x3e93ce = _0x2a46ea.field("name").value.toString().trim().toLocaleLowerCase();
            if (_0x3e93ce.includes("chú cuội") || _0x3e93ce.includes("uncle cuoi")) return true;
          }
          return false;
        } catch (_0x48fe17) {}
      };
      let _0x1e0968 = null;
      const _0x108c70 = () => {
          try {
            _0x1e0968 !== null && clearInterval(_0x1e0968), _0x1e0968 = setInterval(() => {
              Il2Cpp.perform(() => {
                try {
                  (!_0x1aef60 || !_0x17ca5e()) && (clearInterval(_0x1e0968), _0x4f92a9 = _0x5ecd2d, _0x22eea9 = true, _0x500834());
                  const _0x590a81 = _0x21db8b();
                  if (_0x590a81) {} else _0x23c09b = _0x23c09b + 1, _0x23c09b > 19 && (_0x23c09b = 0), _0x5834a4();
                } catch (_0xbc21d6) {}
              }, "main");
            }, 3e3);
          } catch (_0x1227e0) {}
        },
        _0x579be2 = _0x20ebd9.method("addFlyText").overload("System.String", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32");
      Interceptor.attach(_0x579be2.virtualAddress, {
        onEnter(_0x4ccd33) {
          try {
            const _0x1e6602 = _0x4ccd33[0],
              _0x1adeb0 = _0x1e6602.isNull() ? "null" : new Il2Cpp.String(_0x1e6602).content;
            _0x449de4(_0x1adeb0) && (_0x1aef60 = false, _0x55bf4a());
          } catch (_0x443b46) {}
        }
      }), Interceptor.attach(_0x34c6fb.method("addd").virtualAddress, {
        onEnter(_0x4d3019) {
          try {
            if (_0x29a5e9 || !_0x1d127d) return;
            const _0x3bfb40 = new Il2Cpp.String(_0x4d3019[1]);
            if (_0x3bfb40) {
              const _0x32e27a = _0x3bfb40.toString().toLocaleLowerCase();
              (_0x32e27a.includes("fish mission") || _0x32e27a.includes("nhiệm vụ thợ câu")) && (_0x4b0b58 = _0x385fac(_0x32e27a), _0x17e832 = true);
            }
          } catch (_0x161bc8) {}
        }
      }), Interceptor.attach(_0x2b6250.method("switchToMe").virtualAddress, {
        onLeave(_0x3b7864) {
          if (_0x4f92a9 == -1 || _0x29a5e9) return;
          try {
            _0x5a3a62 = false, _0x22eea9 = true, _0x1f869c = true, _0x35fda9();
          } catch (_0x2d4197) {}
        }
      }), Interceptor.attach(_0x2077c0.method("switchToMe").virtualAddress, {
        onLeave(_0x23de9a) {
          if (!_0x335d3b || _0x23c09b === -1 || _0x29a5e9) return;
          _0x16a34e = true;
          try {
            const _0x4d71fc = _0x2077c0.method("gI").invoke(),
              _0x22227d = new Il2Cpp.Object(_0x4d71fc);
            try {
              _0x22227d.method(".ctor").invoke();
            } catch (_0x5782c7) {}
            _0x22227d.field("selected").value = _0x23c09b, _0x22227d.method("setSelected").invoke(_0x23c09b, false), _0x22227d.method("setSelected").invoke(_0x23c09b, true);
          } catch (_0x77ce02) {
            _0x315095 = false, _0x22eea9 = false, _0x5631bc = false, _0x106a7e = false, _0x234e45();
          } finally {
            _0x23c09b = -1;
          }
        }
      });
      let _0x57ee7a = (_0x2f0e4e, _0xf705e5) => {
          try {
            _0x18e9f1 = _0x18e9f1 + _0xf705e5;
            if (_0x18e9f1 >= 10) {
              _0x18e9f1 = 0;
              const _0x42702f = _0x2a5ff1.field("instance").value;
              if (_0x42702f.isNull()) return;
              const _0x47645c = new Il2Cpp.Object(_0x42702f),
                _0x2da0e4 = _0x47645c.field("tfChat").value;
              if (_0x2da0e4.isNull()) return;
              _0x5d284b && (_0x5d284b = false, _0x47645c.method("showTF").invoke());
              const _0x581d27 = Il2Cpp.string(_0x2f0e4e),
                _0x33d64d = new Il2Cpp.Object(_0x2da0e4);
              try {
                _0x33d64d.method("setText").invoke(_0x581d27);
              } catch (_0x690d91) {}
              const _0x363e91 = _0x1ecc2b.alloc();
              _0x363e91.method(".ctor").invoke(_0x42702f);
              try {
                _0x363e91.method("perform").invoke();
              } catch (_0x5d4d1c) {}
            }
          } catch (_0x528efd) {}
        },
        _0x2763b5 = (_0x6c77c1 = 10, _0x50a362 = 10) => {
          setTimeout(() => {
            if (_0x50a362 === 0) return;
            Il2Cpp.perform(() => {
              try {
                const _0x4b4543 = _0x27324f.field("instance").value,
                  _0x4fdd1e = new Il2Cpp.Object(_0x4b4543);
                _0x4fdd1e.field("idShop").value = _0x6c77c1, setTimeout(() => {
                  Il2Cpp.perform(() => {
                    try {
                      const _0x373c96 = _0x240da0.method("gI").invoke();
                      if (!_0x373c96.isNull()) {
                        const _0x185a8c = new Il2Cpp.Object(_0x373c96);
                        if (_0x2f6780) for (let _0xe8b688 = 0; _0xe8b688 < 100; _0xe8b688++) {
                          _0x185a8c.method("doBuyItem", 3).invoke(442, 1, 1), _0x185a8c.method("doBuyItem", 3).invoke(445, 1, 2);
                        } else _0x185a8c.method("doBuyItem", 3).invoke(_0x519b9a, _0x5f2641, _0x55a468);
                        _0x519b9a = -1;
                      }
                    } catch (_0x573412) {
                      _0x2763b5(_0x6c77c1, _0x50a362 - 1);
                    }
                  });
                }, 1e3);
              } catch (_0x27adfd) {
                _0x2763b5(_0x6c77c1, _0x50a362 - 1);
              }
            });
          }, 1e3);
        },
        _0x1df3df = () => {
          if (!_0x505798 || _0x505798.isNull()) return [];
          try {
            let _0x1f325c = _0x5a5c11.field("wMap").value,
              _0x36705c = _0x5a5c11.field("Hmap").value;
            (_0x1f325c === 0 || _0x36705c === 0) && (_0x1f325c = 100, _0x36705c = 100);
            const _0x1cbca9 = _0x1f325c * 24,
              _0x4d52f9 = _0x36705c * 24;
            for (let _0x28db79 = 0; _0x28db79 < _0x1cbca9; _0x28db79 += 24) {
              for (let _0x31f490 = 0; _0x31f490 < _0x4d52f9; _0x31f490 += 24) {
                let _0x12cb35 = -1;
                try {
                  _0x12cb35 = _0x5a5c11.method("getTypeMap").invoke(_0x28db79, _0x31f490);
                } catch (_0x73e0b2) {}
                if (_0x12cb35 == 54) _0x818a48.push({
                  x: _0x28db79,
                  y: _0x31f490
                });else {
                  if (_0x12cb35 == 29) _0x5b8c12.push({
                    x: _0x28db79,
                    y: _0x31f490
                  });else _0x12cb35 == 98 && _0x568339.push({
                    x: _0x28db79,
                    y: _0x31f490
                  });
                }
              }
            }
          } catch (_0x1ef499) {}
        },
        _0x234e45 = (_0x2471d0 = 1) => {
          if (_0x1ee085) return;
          _0x1ee085 = true;
          const _0x7669c9 = (_0x233791 = "") => {
            if (!_0x1ee085) return;
            _0x1ee085 = false;
          };
          try {
            if (!_0x818a48 || _0x818a48.length === 0) {
              _0x7669c9("no fishing spot");
              return;
            }
            if (_0x2471d0 >= _0x818a48.length) {
              _0x7669c9("all seats failed");
              return;
            }
            const _0x2d191c = Math.floor(Math.random() * Math.min(6, _0x818a48.length));
            if (_0x2d191c < 0 || _0x2d191c >= _0x818a48.length) {
              _0x7669c9("invalid seat index");
              return;
            }
            Il2Cpp.perform(() => {
              try {
                const _0x35767a = _0x818a48[_0x2d191c],
                  _0x16280e = _0x2bf4ba(_0x35767a.x, _0x35767a.y);
                if (_0x16280e.x > 0 && _0x16280e.y > 0) {
                  const _0x2d4ab9 = _0x20ebd9.field("instance").value;
                  if (_0x2d4ab9.isNull()) {
                    _0x7669c9("Canvas null");
                    return;
                  }
                  const _0x5142a7 = new Il2Cpp.Object(_0x2d4ab9);
                  _0x5142a7.method("pointerPressed").invoke(_0x16280e.x, _0x16280e.y), _0x5142a7.method("pointerReleased").invoke(_0x16280e.x, _0x16280e.y), setTimeout(() => {
                    Il2Cpp.perform(() => {
                      try {
                        _0x5142a7.method("pointerPressed").invoke(_0x16280e.x, _0x16280e.y), _0x5142a7.method("pointerReleased").invoke(_0x16280e.x, _0x16280e.y);
                      } catch (_0x45e8ef) {}
                    });
                  }, 500);
                } else _0x476835(_0x35767a.x, _0x35767a.y);
              } catch (_0x2271d9) {
                _0x7669c9("click error");
              }
            }), setTimeout(() => {
              Il2Cpp.perform(() => {
                try {
                  if (_0x5a3a62 === true) {
                    _0x7669c9("đã quăng câu");
                    return;
                  }
                  if (_0x22eea9) {
                    _0x7669c9("isFarming");
                    return;
                  }
                  if (_0x15025f) {
                    _0x7669c9("isStopTakeSeat");
                    return;
                  }
                  try {
                    const _0x3fb61d = _0x22042d.method("gI").invoke();
                    if (!_0x3fb61d.isNull()) {
                      const _0x15cbf2 = new Il2Cpp.Object(_0x3fb61d),
                        _0x316368 = _0x15cbf2.field("cmdClose").value;
                      !_0x316368.isNull() && new Il2Cpp.Object(_0x316368).method("perform").invoke();
                    }
                  } catch (_0x2f918b) {}
                  _0x818a48.length > _0x2d191c && _0x476835(_0x818a48[_0x2d191c].x, _0x818a48[_0x2d191c].y), _0x7669c9("attempt finished");
                } catch (_0x13a412) {
                  _0x7669c9("timeout error");
                }
              }, "main");
            }, 8e3);
          } catch (_0x10b7b0) {
            _0x7669c9("outer error");
          }
        };
      Interceptor.attach(_0x5a5c11.method("update").virtualAddress, {
        onEnter(_0x183efe) {
          if (!_0x183efe[0].isNull()) {
            _0x505798 = _0x183efe[0];
            if (_0x58a09d !== null) {
              let _0x18725f = Date.now();
              if (_0x18725f - _0x318e92 >= 1e3) {
                _0x318e92 = _0x18725f;
                if (_0x5acb36 <= 0) {
                  _0x58a09d = null;
                  return;
                }
                try {
                  const _0x12605e = new Il2Cpp.Object(_0x183efe[0]);
                  _0x12605e.method("doJoin").invoke(_0x58a09d.x, _0x58a09d.y), _0x58a09d = null;
                } catch (_0x2a144f) {
                  _0x5acb36--;
                }
              }
            }
          }
        }
      }), Interceptor.attach(_0x27324f.method("onJoinPark").virtualAddress, {
        onEnter(_0x555f59) {
          _0x5b59ad = [], _0x818a48 = [], _0x5b8c12 = [], _0x253d06 = _0x555f59[1].toInt32(), _0x23c09b = _0x555f59[2].toInt32();
          if ([14, 15, 16, 27].includes(_0x253d06)) _0x4f92a9 = _0x253d06;
        },
        onLeave(_0x56b7c4) {
          try {
            setTimeout(() => {
              Il2Cpp.perform(() => {
                try {
                  _0x1df3df();
                  _0x1aef60 && (_0x253d06 == 11 && _0x476835(336, 12), _0x253d06 == 0 && setTimeout(() => {
                    Il2Cpp.perform(() => {
                      const _0x2d7cac = _0x4314e6(124, 33),
                        _0x2e2949 = _0x20ebd9.field("instance").value;
                      !_0x2e2949.isNull() && (_0x2e2949.method("pointerPressed").invoke(_0x2d7cac.x, _0x2d7cac.y), _0x2e2949.method("pointerReleased").invoke(_0x2d7cac.x, _0x2d7cac.y)), _0x57ee7a("avatar", 10), _0x476835(3, 96);
                    });
                  }, 1e3), _0x253d06 == 1 && _0x108c70());
                  if ([13, 14, 15, 16, 27].includes(_0x253d06) && !_0x17e832 && !_0x29a5e9 && _0x1d127d) return _0x4f2777();
                  if (!_0x315095 && !_0x22eea9) return;
                  _0x22eea9 && (_0x253d06 == 17 || _0x253d06 == 20) && _0x476835(_0x5b59ad[1].x, _0x5b59ad[1].y);
                  if (_0x253d06 == 13) {
                    if (_0x22eea9) {
                      if (_0x4f92a9 === 14) _0x476835(_0x5b59ad[2].x, _0x5b59ad[2].y);else {
                        if (_0x4f92a9 === 15) _0x476835(_0x5b59ad[3].x, _0x5b59ad[3].y);else {
                          if (_0x4f92a9 === 16) _0x476835(_0x5b59ad[0].x, _0x5b59ad[0].y);
                        }
                      }
                    }
                    if (_0x315095) _0x2763b5(10);
                  } else {
                    if ([14, 15, 16].includes(_0x253d06) || _0x253d06 == 27) (_0x5631bc || _0x22eea9 || _0x253d06 == 27) && (!_0x106a7e && _0x335d3b && _0x5b8c12.length > 0 && !_0x29a5e9 ? (_0x23c09b = Math.floor(Math.random() * (10 - 3 + 1)) + 3, _0x5834a4()) : (_0x315095 = false, _0x22eea9 = false, _0x5631bc = false, _0x106a7e = false, _0x234e45()));else {
                      if (_0x253d06 == 25 && _0x22eea9) {
                        _0xec5551();
                        const _0x392e72 = _0x2bf4ba(_0x5b59ad[1].x, _0x5b59ad[1].y),
                          _0x5ef632 = _0x20ebd9.field("instance").value;
                        _0x3fb506 = false, !_0x5ef632.isNull() && (_0x5ef632.method("pointerPressed").invoke(_0x392e72.x, _0x392e72.y), _0x5ef632.method("pointerReleased").invoke(_0x392e72.x, _0x392e72.y)), setTimeout(() => {
                          !_0x3fb506 && Il2Cpp.perform(() => {
                            try {
                              _0x476835(_0x5b59ad[1].x, _0x5b59ad[1].y), setTimeout(() => {
                                Il2Cpp.perform(() => {
                                  _0xfcca0f();
                                });
                              }, 2e3);
                            } catch (_0x212dd0) {}
                          });
                        }, 7e3);
                      }
                    }
                  }
                } catch (_0x4f09ef) {}
              });
            }, 1500);
          } catch (_0x50c195) {}
        }
      }), Interceptor.attach(_0x5a5c11.method("addPopup").virtualAddress, {
        onEnter(_0x5b1c00) {
          _0x5b59ad.push({
            x: _0x5b1c00[1].toInt32(),
            y: _0x5b1c00[2].toInt32()
          });
        }
      }), Interceptor.attach(_0x20ebd9.method("startOKDlg").virtualAddress, {
        onEnter(_0x4b70d6) {
          this.str = new Il2Cpp.String(_0x4b70d6[0]).content;
        },
        onLeave(_0x7da26c) {
          const _0x272715 = this.str.toLocaleLowerCase();
          if ((_0x272715.includes("khu vực") || _0x272715.includes("this area") || _0x272715.includes("slow down") || _0x272715.includes("chầm chậm")) && !_0x272715.includes("vé") && !_0x272715.includes("ticket")) try {
            _0x20ebd9.method("endDlg").invoke();
          } catch (_0x45d806) {}
          if (!_0x315095 || _0x2f6780) return;
          _0x20ebd9.method("endDlg").invoke(), setTimeout(() => {
            Il2Cpp.perform(() => {
              try {
                _0x5631bc = true, _0x15025f = false;
                try {
                  if (_0x4f92a9 === 14) _0x476835(_0x5b59ad[2].x, _0x5b59ad[2].y);else {
                    if (_0x4f92a9 === 15) _0x476835(_0x5b59ad[3].x, _0x5b59ad[3].y);else {
                      if (_0x4f92a9 === 16) _0x476835(_0x5b59ad[0].x, _0x5b59ad[0].y);else _0x253d06 == 27 && (_0x315095 = false, _0x5631bc = false, _0x234e45());
                    }
                  }
                } catch (_0x207453) {}
              } catch (_0x47b67e) {}
            });
          }, 1e3);
        }
      }), Interceptor.attach(_0x2d2dec.method("setPosButton").virtualAddress, {
        onEnter(_0xaa64cd) {
          if (_0xaa64cd[0].isNull()) return;
          const _0x38dc58 = new Il2Cpp.Object(_0xaa64cd[0]),
            _0x38a260 = _0x38dc58.field("str").value;
          if (!_0x38a260.isNull()) {
            const _0x1a151c = new Il2Cpp.String(_0x38a260).content,
              _0x2dcb79 = _0x1a151c.toLocaleLowerCase();
            if (_0x2dcb79.includes("use boraras bait") || _0x2dcb79.includes("cần sử dụng mồi câu cá trâm")) _0x519b9a = 4875, _0x5f2641 = 50, _0x55a468 = 1;else {
              if (_0x2dcb79.includes("sử dụng mồi câu") || _0x2dcb79.includes("need a bait")) _0x519b9a = 448, _0x5f2641 = 50, _0x55a468 = 1;else {
                if (_0x2dcb79.includes("cần vé câu cá mập") || _0x2dcb79.includes("need a shark ticket")) _0x519b9a = 460, _0x5f2641 = 1, _0x55a468 = 2;else {
                  if (_0x2dcb79.includes("cần vé câu cá lóc") || _0x2dcb79.includes("need a snake head ticket")) _0x519b9a = 459, _0x5f2641 = 1, _0x55a468 = 1;else (_0x2dcb79.includes("cần vé câu cá bến tàu") || _0x2dcb79.includes("need a pier fishing ticket")) && (_0x519b9a = 4876, _0x5f2641 = 1, _0x55a468 = 1);
                }
              }
            }
            if (_0x519b9a == -1) return;
            _0x2d4228 = false, _0x15025f = true;
            if (_0x29a5e9) return;
            setTimeout(() => {
              Il2Cpp.perform(() => {
                try {
                  _0x20ebd9.method("endDlg").invoke();
                } catch (_0x120326) {}
                setTimeout(() => {
                  Il2Cpp.perform(() => {
                    try {
                      const _0x516bb2 = _0x22042d.method("gI").invoke();
                      if (!_0x516bb2.isNull()) {
                        const _0x23fcf8 = new Il2Cpp.Object(_0x516bb2),
                          _0x4e54ec = _0x23fcf8.field("cmdClose").value;
                        if (!_0x4e54ec.isNull()) new Il2Cpp.Object(_0x4e54ec).method("perform").invoke();
                        if ([14, 15, 16].includes(_0x253d06)) _0x315095 = true, _0x5631bc = false, _0x4f92a9 = _0x253d06, setTimeout(() => {
                          Il2Cpp.perform(() => {
                            _0x476835(_0x5b59ad[0].x, _0x5b59ad[0].y);
                          });
                        }, 1e3);else _0x253d06 == 27 && (_0x315095 = true, _0x2763b5(11));
                      }
                    } catch (_0x461e6d) {}
                  });
                }, 500);
              });
            }, 1e3);
          }
        }
      });
      let _0x195f13 = [],
        _0x8ee63c = [];
      const _0xef4611 = [{
          id: 112,
          price: 10
        }, {
          id: 116,
          price: 1
        }, {
          id: 117,
          price: 1
        }, {
          id: 118,
          price: 1
        }, {
          id: 120,
          price: 10
        }, {
          id: 121,
          price: 10
        }, {
          id: 123,
          price: 5
        }, {
          id: 124,
          price: 5
        }],
        _0x28d3f9 = () => {
          let _0x5db262 = false;
          try {
            _0x5631bc = true;
            try {
              const _0x497087 = _0x4a7efc.method("gI").invoke();
              new Il2Cpp.Object(_0x497087).method("close").invoke(), _0x5db262 = true;
            } catch (_0x4e7baf) {
              try {
                const _0x57fb10 = _0x13a562.method("gI").invoke();
                new Il2Cpp.Object(_0x57fb10).method("getHandler").invoke(8), _0x5db262 = true;
              } catch (_0x3b46e6) {
                try {
                  const _0x57a4e8 = _0x4a7efc.method("gI").invoke();
                  new Il2Cpp.Object(_0x57a4e8).method("commandActionPointer").invoke(0, 0), _0x5db262 = true;
                } catch (_0x51bc08) {}
              }
            }
          } catch (_0x139569) {
            !_0x5db262 && new Il2Cpp.Object(_0x21b8eb.method("gI").invoke()).method("doJoinPark").invoke(25, 0);
          }
        },
        _0x500834 = () => {
          try {
            const _0x371918 = new Il2Cpp.Object(_0x27324f.field("instance").value);
            _0x371918.method("doExit").invoke();
          } catch (_0x7ae12) {
            _0x574d5a = Date.now() + 3e5, _0x234e45();
          }
        };
      Interceptor.attach(_0x27324f.method("joinCitymap").virtualAddress, {
        onEnter(_0x4bb0d2) {
          _0x1f869c = false;
        },
        onLeave(_0x5f1839) {
          try {
            _0x5ecd2d !== 0 ? (_0x5ecd2d = 0, _0x59afe4(), _0x1aef60 = true) : _0x1aef60 = false;
            const _0x116d48 = _0x211ffe.field("me").value;
            if (_0x4f92a9 == -1) return;
            if (_0x1aef60) {
              _0x116d48.field("selected").value = 3, _0x27324f.method("gI").invoke().method("commandActionPointer").invoke(3, 0);
              return;
            }
            if (_0x5631bc) try {
              if (_0x4f92a9 == 27) _0x116d48.field("selected").value = 5;else _0x116d48.field("selected").value = 0;
              _0x27324f.method("gI").invoke().method("commandActionPointer").invoke(3, 0);
            } catch (_0x3663b7) {} else {
              if (_0x22eea9) try {
                new Il2Cpp.Object(_0x13a562.field("instance").value).method("getHandler").invoke(10);
              } catch (_0x463777) {}
            }
          } catch (_0x390852) {}
        }
      });
      const _0xec5551 = () => {
        const _0xd4ce4d = new Il2Cpp.Object(_0x4a7efc.field("listItemFarm").value),
          _0x4018ae = _0xd4ce4d.method("size").invoke(),
          _0x452dc5 = new Il2Cpp.Object(_0x32cfe0.field("instance").value),
          _0x209f98 = [];
        if (_0x2ffdf7 > -1) _0x452dc5.method("doBuyItem").invoke(_0x2ffdf7, 50, 1, 500);
        for (let _0x21fddf = 0; _0x21fddf < _0x4018ae; _0x21fddf++) {
          const _0x211107 = new Il2Cpp.Object(_0xd4ce4d.method("elementAt").invoke(_0x21fddf));
          _0x209f98.push({
            id: _0x211107.field("ID").value,
            number: _0x211107.field("number").value
          });
        }
        _0xef4611.map(_0x32274e => {
          if (_0x209f98.findIndex(_0x267884 => _0x267884.id === _0x32274e.id && _0x267884.number >= 50) == -1) try {
            _0x452dc5.method("doBuyItem").invoke(_0x32274e.id, 50, 1, 50 * _0x32274e.price);
          } catch (_0x36990d) {}
        });
      };
      let _0xbf3ddf = false;
      const _0x403d54 = () => {
        try {
          _0xbf3ddf = false, _0x568339 = [], _0x1df3df();
          const _0x2f768b = _0x2bf4ba(_0x568339[0].x, _0x568339[0].y),
            _0x14ede6 = _0x20ebd9.field("instance").value;
          !_0x14ede6.isNull() && (_0x14ede6.method("pointerPressed").invoke(_0x2f768b.x, _0x2f768b.y), _0x14ede6.method("pointerReleased").invoke(_0x2f768b.x, _0x2f768b.y)), setTimeout(() => {
            !_0xbf3ddf && Il2Cpp.perform(() => {
              _0x28d3f9();
            });
          }, 7e3);
        } catch (_0x2d2810) {}
      };
      Interceptor.attach(_0x582a28.method("switchToMe").virtualAddress, {
        onEnter(_0x1e1b72) {
          if (!_0x22eea9) return;
          try {
            _0xbf3ddf = true;
            const _0x34cc79 = new Il2Cpp.Object(_0x1e1b72[0]),
              _0x264815 = _0x34cc79.field("listDetailCooking").value,
              _0x5e38d2 = new Il2Cpp.Object(_0x264815),
              _0x216fcd = _0x32cfe0.method("gI").invoke(),
              _0x12b38a = new Il2Cpp.Object(_0x216fcd);
            if (!_0x5e38d2.isNull()) {
              const _0x2de402 = _0x5e38d2.method("size").invoke();
              for (let _0x337f8b = 0; _0x337f8b < _0x2de402; _0x337f8b++) {
                const _0x4809ed = _0x5e38d2.method("elementAt").invoke(_0x337f8b),
                  _0x4faef6 = new Il2Cpp.Object(_0x4809ed);
                if (!_0x4faef6.isNull()) {
                  const _0x48bdfc = _0x4faef6.field("time").value,
                    _0x11715a = _0x4faef6.field("id").value;
                  if (_0x48bdfc == 0 && _0x11715a > 0) try {
                    _0x12b38a.method("doHarvestCook").invoke(_0x337f8b), _0x5e4769 != -1 && (_0x12b38a.method("doCooking").invoke(_0x337f8b, _0x5e4769), _0x5cad52++, _0x1a3d6a > 0 && _0x5cad52 == _0x1a3d6a && (_0x5e4769 = -1));
                  } catch (_0x14b444) {}
                  _0x11715a == -1 && _0x5e4769 != -1 && (_0x12b38a.method("doCooking").invoke(_0x337f8b, _0x5e4769), _0x5cad52++, _0x1a3d6a > 0 && _0x5cad52 == _0x1a3d6a && (_0x5e4769 = -1));
                }
              }
            }
            _0x34cc79.method("close").invoke();
          } catch (_0x290fd8) {} finally {
            _0x28d3f9();
          }
        }
      });
      const _0x18ddcd = _0x3e0642 => {
          Il2Cpp.perform(() => {
            if (_0x195f13.length === 0) return _0x3e0642();
            let _0x4485d8 = 0;
            const _0x32ccbf = () => {
              if (_0x4485d8 >= _0x195f13.length) return _0x195f13 = [], _0x3e0642();
              const _0x3fab2e = _0x195f13[_0x4485d8];
              Il2Cpp.perform(() => {
                try {
                  const _0x5f2c05 = _0x32cfe0.field("instance").value;
                  !_0x5f2c05.isNull() && new Il2Cpp.Object(_0x5f2c05).method("doPlantSeed").invoke(_0x4df42f, _0x3fab2e, _0x2ffdf7);
                } catch (_0x36f686) {}
              }), _0x4485d8++, setTimeout(_0x32ccbf, 300);
            };
            _0x32ccbf();
          });
        },
        _0xfcca0f = () => {
          try {
            const _0x266ca4 = new Il2Cpp.Object(_0x4a7efc.field("cell").value),
              _0x4f3423 = _0x266ca4.method("size").invoke(),
              _0x5f50db = new Il2Cpp.Object(_0x4a7efc.field("instance").value),
              _0x4c64a4 = new Il2Cpp.Object(_0x32cfe0.field("instance").value),
              _0x6a2c7c = _0x4a7efc.field("idFarm").value,
              _0x15f041 = _0x20ebd9.field("instance").value;
            _0x3fb506 = true, _0x59afe4();
            for (let _0x259085 = 0; _0x259085 < _0x4f3423; _0x259085++) {
              const _0x4e4514 = _0x266ca4.method("elementAt").invoke(_0x259085),
                _0x339bc6 = new Il2Cpp.Object(_0x4e4514),
                _0x3a9841 = _0x339bc6.field("statusTree").value,
                _0x3b3c86 = _0x339bc6.field("idTree").value;
              if (_0x339bc6.field("isWorm").value) _0x5f50db.method("setBonPhan").invoke(_0x4e4514, _0x259085, 7);
              if (_0x339bc6.field("isGrass").value) _0x5f50db.method("setBonPhan").invoke(_0x4e4514, _0x259085, 3);
              _0x3a9841 == 5 && _0x3b3c86 > -1 && (_0x4c64a4.method("doHervest").invoke(_0x6a2c7c, _0x259085), _0x195f13.push(_0x259085));
              if (_0x3a9841 < 5 && _0x3b3c86 > -1) _0x4c64a4.method("doUsingItem").invoke(_0x4df42f, _0x259085, 100);
              if (_0x2ffdf7 > -1 && _0x3b3c86 < 0) _0x4c64a4.method("doPlantSeed").invoke(_0x4df42f, _0x259085, _0x2ffdf7);
            }
            const _0x11214d = new Il2Cpp.Object(_0x13a562.method("gI").invoke()),
              _0x5c920d = new Il2Cpp.Object(_0x4a7efc.field("animalLists").value),
              _0x428aec = _0x5c920d.method("size").invoke(),
              _0x3e2765 = new Il2Cpp.Object(_0x2bcf23.field("listAnimalInfo").value),
              _0x4ebf3f = _0x3e2765.method("size").invoke();
            for (let _0x501e0f = 0; _0x501e0f < _0x4ebf3f; _0x501e0f++) {
              const _0x44a9ca = new Il2Cpp.Object(_0x3e2765.method("elementAt").invoke(_0x501e0f));
              _0x8ee63c.push({
                species: _0x44a9ca.field("species").value,
                diedTime: _0x44a9ca.field("diedTime").value,
                priceProduct: _0x44a9ca.field("priceProduct").value,
                harvestTime: _0x44a9ca.field("harvestTime").value
              });
            }
            for (let _0x319c12 = 0; _0x319c12 < _0x428aec; _0x319c12++) {
              const _0x3a88a0 = new Il2Cpp.Object(_0x4a7efc.method("getAnimalByIndex").invoke(_0x319c12));
              if (_0x3a88a0.isNull()) continue;
              const _0x184f81 = _0x3a88a0.field("bornTime").value,
                _0x3e4a74 = _0x3a88a0.field("species").value,
                _0x1065be = _0x3a88a0.field("IDDB").value;
              _0x4c64a4.method("doHarvestAnimal").invoke(_0x6a2c7c, _0x1065be), _0x11214d.method("requestTakeCareAnimal").invoke(_0x1065be);
              let _0x961a00 = _0x8ee63c.findIndex(_0x46a8e9 => _0x46a8e9.species == _0x3e4a74),
                _0x5f478a = _0x8ee63c[_0x961a00];
              if (_0x184f81 >= _0x5f478a.harvestTime * 60) {
                if (_0x5f478a.priceProduct > 0) {
                  if (_0x184f81 >= _0x5f478a.diedTime * 60 - 6 * 60) _0x4c64a4.method("doSellAnimal").invoke(_0x6a2c7c, _0x1065be);
                } else _0x4c64a4.method("doSellAnimal").invoke(_0x6a2c7c, _0x1065be);
              }
            }
            try {
              if (!_0x15f041.isNull()) {
                const _0x144326 = new Il2Cpp.Object(_0x15f041);
                _0x144326.method("pointerPressed").invoke(200, 200), _0x144326.method("pointerReleased").invoke(200, 200);
              }
            } catch (_0x2f944d) {}
            _0x195f13.length > 0 && _0x2ffdf7 > -1 ? setTimeout(() => {
              Il2Cpp.perform(() => {
                _0x18ddcd(() => {
                  _0x5e4769 == -1 ? _0x28d3f9() : _0x403d54();
                });
              });
            }, 1e3) : setTimeout(() => {
              Il2Cpp.perform(() => {
                _0x5e4769 == -1 ? _0x28d3f9() : _0x403d54();
              });
            }, 1e3);
          } catch (_0x36af7e) {
            _0x28d3f9();
          }
        };
      Interceptor.attach(_0x4a7efc.method("resizeMap").virtualAddress, {
        onLeave(_0x543a42) {
          try {
            _0x22eea9 && setTimeout(() => {
              Il2Cpp.perform(() => {
                _0xfcca0f();
              }, "main");
            }, 2e3);
          } catch (_0x1681db) {}
        }
      }), Interceptor.attach(_0x22042d.method("onStartFishing").virtualAddress, {
        onLeave(_0xc900c3) {
          _0x59afe4(), _0x5a3a62 = false, _0x2d4228 = true, _0x3866c8 = false, _0x296f4c = 0, _0x15b8b3 = 0, _0x415982 = [], _0x2b4842 = 0, _0x315095 = false, _0x18e9f1 = 0, _0x2e1e09(), _0x3d003d = false, _0x55e5bc = false;
          if (_0x29a5e9) _0x535564 = false;
        }
      }), Interceptor.attach(_0x22042d.method("doClose").virtualAddress, {
        onEnter(_0x146ba9) {
          _0x5a3a62 = false, _0x2d4228 = false, _0x18e9f1 = 0, _0x2e1e09(), _0x3d003d = false, _0x55e5bc = false;
        }
      }), Interceptor.attach(_0x22042d.method("update").virtualAddress, {
        onEnter(_0x9cd51) {
          if (!_0x2d4228) return;
          const _0x527727 = new Il2Cpp.Object(_0x9cd51[0]);
          try {
            const _0x7d50cf = _0x527727.field("listKeyRecieve").value,
              _0x2d3b11 = _0x527727.field("listKeySend").value;
            if (_0x7d50cf.isNull() || _0x2d3b11.isNull()) return;
            const _0x4ae43f = new Il2Cpp.Object(_0x7d50cf).method("size").invoke(),
              _0x596aca = new Il2Cpp.Object(_0x2d3b11).method("size").invoke();
            var _0x1e1189 = _0x527727.field("hideIcon").value;
            _0x4526cc > 0 && !_0x29a5e9 && _0x574d5a === 0 && (_0x574d5a = Date.now() + _0x4526cc);
            if (_0x5a3a62 === false && _0x1e1189 === false && _0x4ae43f === _0x596aca) {
              if (_0x4526cc > 0 && !_0x29a5e9 && Date.now() >= _0x574d5a) {
                _0x574d5a = Date.now() + _0x4526cc + 6e4, _0x4f92a9 = _0x253d06, _0x22eea9 = true;
                const _0x57dd9e = _0x527727.field("cmdClose").value;
                try {
                  if (!_0x57dd9e.isNull()) new Il2Cpp.Object(_0x57dd9e).method("perform").invoke();else _0x527727.method("commandActionPointer").invoke(0, 2);
                } catch (_0x49c275) {}
                return _0x500834();
              }
              _0x15b8b3++;
              if (_0x15b8b3 == 10 && _0x29a5e9) _0x57ee7a("autocauca.io.vn", 1);
              if (!_0x535564 ? _0x15b8b3 >= 60 : _0x15b8b3 >= 1) {
                const _0x399c61 = _0x527727.field("cmdQuanCau").value;
                try {
                  !_0x399c61.isNull() && new Il2Cpp.Object(_0x399c61).method("perform").invoke();
                } catch (_0x5288f3) {} finally {
                  _0x15b8b3 = 0, _0x47ac34 = 0, _0x5a3a62 = true;
                }
              }
              return;
            } else {
              _0x15b8b3 = 0, _0x47ac34++;
              if (_0x5a3a62 === true && _0x47ac34 >= 20 * 60) {
                try {
                  const _0x2dba2c = _0x527727.field("cmdClose").value;
                  _0x47ac34 = 0;
                  if (!_0x2dba2c.isNull()) new Il2Cpp.Object(_0x2dba2c).method("perform").invoke();else _0x527727.method("commandActionPointer").invoke(0, 2);
                } catch (_0x12f84e) {}
                _0x234e45();
              }
            }
            if (_0x5a3a62 === true && _0x1e1189 === true && _0x55e5bc === true) try {
              const _0x25b903 = _0x527727.field("cmdXong").value;
              if (!_0x25b903.isNull()) new Il2Cpp.Object(_0x25b903).method("perform").invoke();
            } catch (_0x367087) {} finally {
              _0x55e5bc = false, _0x5a3a62 = false;
            }
            if (_0x5a3a62 === true && _0x4ae43f > 3) {
              if (_0x1999af) {
                if (_0x415982.length === _0x4ae43f) {
                  if (_0x596aca < _0x4ae43f) {
                    _0x3866c8 = true;
                    if (_0x596aca === 0 && _0x296f4c < 30) {
                      _0x296f4c++;
                      return;
                    }
                    _0x2b4842++;
                    if (!_0x535564 ? _0x2b4842 >= _0x325334 : _0x2b4842 >= 7) {
                      _0x2b4842 = 0;
                      const _0x4b4914 = _0x596aca,
                        _0x2400c1 = _0x415982[_0x4b4914];
                      if (_0x2400c1 !== void 0) try {
                        _0x2f6780 && _0x29a5e9 ? _0x527727.method("setIndex").invoke(0, 0) : _0x527727.method("setIndex").invoke(_0x2400c1, 0);
                      } catch (_0x3f2215) {}
                    }
                  } else _0x596aca === _0x4ae43f && (_0x3866c8 = false, _0x415982 = [], _0x1999af = false, _0x296f4c = 0, _0x2b4842 = 0);
                } else !_0x3d003d && (_0x353b7c < _0x593aee ? (_0x353b7c++, _0x19bea8()) : (_0x1999af = false, _0x415982 = []));
              }
            } else (_0x4ae43f === 0 || _0x5a3a62 === false) && (_0x3866c8 || _0x1999af || _0x415982.length > 0) && (_0x3866c8 = false, _0x415982 = [], _0x1999af = false, _0x296f4c = 0, _0x2b4842 = 0);
          } catch (_0x3eabdb) {}
        }
      });
      let _0x3d003d = false,
        _0x2b672a = null,
        _0x32ab22 = null,
        _0x1999af = false,
        _0x3c8caa = [],
        _0x3963a7 = [],
        _0x353b7c = 0;
      const _0x593aee = 3;
      Interceptor.attach(_0x22042d.method("onCaCanCau").virtualAddress, {
        onEnter(_0x3dbd76) {
          try {
            if (!_0x5a3a62 || !_0x2d4228 || _0x4df42f === -1) return;
            if (_0x3dbd76[1].toInt32() !== _0x4df42f) return;
            if (_0x3d003d) return;
            const _0x28f0fb = _0x3dbd76[4],
              _0x245189 = _0x3dbd76[5];
            if (_0x28f0fb.isNull() || _0x245189.isNull()) return;
            const _0x20141f = new Il2Cpp.Array(_0x28f0fb),
              _0x2ac32c = new Il2Cpp.Array(_0x245189);
            if (_0x2ac32c.length < 3) return;
            _0x47ac34 = 0;
            const _0xe851f3 = [],
              _0x20080c = [];
            for (let _0x398237 = 0; _0x398237 < _0x20141f.length; _0x398237++) {
              const _0x1d2b29 = _0x20141f.get(_0x398237);
              if (!_0x1d2b29 || _0x1d2b29.isNull()) {
                _0xe851f3.push([]);
                continue;
              }
              const _0x1365ce = new Il2Cpp.Array(_0x1d2b29),
                _0x433bb2 = new Array(_0x1365ce.length);
              for (let _0x454b79 = 0; _0x454b79 < _0x1365ce.length; _0x454b79++) {
                _0x433bb2[_0x454b79] = _0x1365ce.get(_0x454b79);
              }
              _0xe851f3.push(_0x433bb2);
            }
            for (let _0x4041f7 = 0; _0x4041f7 < _0x2ac32c.length; _0x4041f7++) {
              const _0x45882f = _0x2ac32c.get(_0x4041f7);
              if (!_0x45882f || _0x45882f.isNull()) {
                _0x20080c.push([]);
                continue;
              }
              const _0xa5d5f7 = new Il2Cpp.Array(_0x45882f),
                _0xb2276f = new Array(_0xa5d5f7.length);
              for (let _0x334073 = 0; _0x334073 < _0xa5d5f7.length; _0x334073++) {
                _0xb2276f[_0x334073] = _0xa5d5f7.get(_0x334073);
              }
              _0x20080c.push(_0xb2276f);
            }
            _0x3c8caa = _0xe851f3, _0x3963a7 = _0x20080c, _0x353b7c = 0, _0x19bea8();
          } catch (_0x132634) {
            _0x2e1e09(), _0x3d003d = false;
          }
        }
      }), Interceptor.attach(_0x22042d.method("onFinish").virtualAddress, {
        onEnter(_0x182c39) {
          if (_0x5a3a62 === false || _0x2d4228 === false || _0x4df42f === -1) return;
          this.incomingId = _0x182c39[1].toInt32();
          if (this.incomingId !== _0x4df42f) return;
          this.value = _0x182c39[2].toInt32();
        },
        onLeave(_0x48482b) {
          if (_0x5a3a62 === false || _0x2d4228 === false || _0x4df42f === -1) return;
          if (this.incomingId !== _0x4df42f) return;
          const _0xedd7ee = this.value > 0;
          setTimeout(() => {
            Il2Cpp.perform(() => {
              try {
                if (_0xedd7ee) try {
                  _0x1d127d && _0x5bb368(this.value);
                  const _0x119d3e = _0x20ebd9.field("instance").value;
                  if (!_0x119d3e.isNull()) {
                    const _0x2114f4 = new Il2Cpp.Object(_0x119d3e);
                    _0x2114f4.method("pointerPressed").invoke(500, 500), setTimeout(() => {
                      Il2Cpp.perform(() => {
                        try {
                          _0x2114f4.method("pointerReleased").invoke(500, 500);
                        } catch (_0x118af7) {}
                      });
                    }, 50);
                  }
                } catch (_0x364415) {}
              } catch (_0x486acb) {} finally {
                _0x55e5bc = true;
              }
            });
          }, !_0x535564 ? 1e3 : 500);
        }
      });
    } catch (_0x4cd28f) {}
  });
}, 1e4);
