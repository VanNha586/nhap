var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};

// frida-builtins:/node-globals.js
var init_node_globals = __esm({
  "frida-builtins:/node-globals.js"() {}
});

// node_modules/frida-il2cpp-bridge/dist/index.js
function raise(message) {
  const error = new Error(message);
  error.name = "Il2CppError";
  error.stack = error.stack?.replace(/^(Il2Cpp)?Error/, "[0m[38;5;9mil2cpp[0m")?.replace(/\n    at (.+) \((.+):(.+)\)/, "[3m[2m")?.concat("[0m");
  throw error;
}
function warn(message) {
  globalThis.console.log(`\x1B[38;5;11mil2cpp\x1B[0m: ${message}`);
}
function ok(message) {
  globalThis.console.log(`\x1B[38;5;10mil2cpp\x1B[0m: ${message}`);
}
function inform(message) {
  globalThis.console.log(`\x1B[38;5;12mil2cpp\x1B[0m: ${message}`);
}
function decorate(target, decorator, descriptors = Object.getOwnPropertyDescriptors(target)) {
  for (const key in descriptors) {
    descriptors[key] = decorator(target, key, descriptors[key]);
  }
  Object.defineProperties(target, descriptors);
  return target;
}
function getter(target, key, get, decorator) {
  globalThis.Object.defineProperty(target, key, decorator?.(target, key, {
    get,
    configurable: true
  }) ?? {
    get,
    configurable: true
  });
}
function cyrb53(str) {
  let h1 = 3735928559;
  let h2 = 1103547991;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
function exportsHash(module) {
  return cyrb53(module.enumerateExports().sort((a, b) => a.name.localeCompare(b.name)).map(_ => _.name + _.address.sub(module.base)).join(""));
}
function lazy(_, propertyKey, descriptor) {
  const getter2 = descriptor.get;
  if (!getter2) {
    throw new Error("@lazy can only be applied to getter accessors");
  }
  descriptor.get = function () {
    const value = getter2.call(this);
    Object.defineProperty(this, propertyKey, {
      value,
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      writable: false
    });
    return value;
  };
  return descriptor;
}
function addFlippedEntries(obj) {
  return Object.keys(obj).reduce((obj2, key) => (obj2[obj2[key]] = key, obj2), obj);
}
function readNativeIterator(block) {
  const array = [];
  const iterator = Memory.alloc(Process.pointerSize);
  let handle = block(iterator);
  while (!handle.isNull()) {
    array.push(handle);
    handle = block(iterator);
  }
  return array;
}
function readNativeList(block) {
  const lengthPointer = Memory.alloc(Process.pointerSize);
  const startPointer = block(lengthPointer);
  if (startPointer.isNull()) {
    return [];
  }
  const array = new Array(lengthPointer.readInt());
  for (let i = 0; i < array.length; i++) {
    array[i] = startPointer.add(i * Process.pointerSize).readPointer();
  }
  return array;
}
function recycle(Class) {
  return new Proxy(Class, {
    cache: /* @__PURE__ */new Map(),
    construct(Target, argArray) {
      const handle = argArray[0].toUInt32();
      if (!this.cache.has(handle)) {
        this.cache.set(handle, new Target(argArray[0]));
      }
      return this.cache.get(handle);
    }
  });
}
var __decorate, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Android, NativeStruct, UnityVersion, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2, Il2Cpp2;
var init_dist = __esm({
  "node_modules/frida-il2cpp-bridge/dist/index.js"() {
    "use strict";

    init_node_globals();
    __decorate = function (decorators, target, key, desc) {
      var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    (function (Il2Cpp3) {
      Il2Cpp3.application = {
        /**
         * Gets the data path name of the current application, e.g.
         * `/data/emulated/0/Android/data/com.example.application/files`
         * on Android.
         *
         * **This information is not guaranteed to exist.**
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints /data/emulated/0/Android/data/com.example.application/files
         *     console.log(Il2Cpp.application.dataPath);
         * });
         * ```
         */
        get dataPath() {
          return unityEngineCall("get_persistentDataPath");
        },
        /**
         * Gets the identifier name of the current application, e.g.
         * `com.example.application` on Android.
         *
         * In case the identifier cannot be retrieved, the main module name is
         * returned instead, which typically is the process name.
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints com.example.application
         *     console.log(Il2Cpp.application.identifier);
         * });
         * ```
         */
        get identifier() {
          return unityEngineCall("get_identifier") ?? unityEngineCall("get_bundleIdentifier") ?? Process.mainModule.name;
        },
        /**
         * Gets the version name of the current application, e.g. `4.12.8`.
         *
         * In case the version cannot be retrieved, an hash of the IL2CPP
         * module is returned instead.
         *
         * ```ts
         * Il2Cpp.perform(() => {
         *     // prints 4.12.8
         *     console.log(Il2Cpp.application.version);
         * });
         * ```
         */
        get version() {
          return unityEngineCall("get_version") ?? exportsHash(Il2Cpp3.module).toString(16);
        }
      };
      getter(Il2Cpp3, "unityVersion", () => {
        try {
          const unityVersion = Il2Cpp3.$config.unityVersion ?? unityEngineCall("get_unityVersion");
          if (unityVersion != null) {
            return unityVersion;
          }
        } catch (_) {}
        const searchPattern = "69 6c 32 63 70 70";
        for (const range of Il2Cpp3.module.enumerateRanges("r--").concat(Process.getRangeByAddress(Il2Cpp3.module.base))) {
          for (let {
            address
          } of Memory.scanSync(range.base, range.size, searchPattern)) {
            while (address.readU8() != 0) {
              address = address.sub(1);
            }
            const match = UnityVersion.find(address.add(1).readCString());
            if (match != void 0) {
              return match;
            }
          }
        }
        raise("couldn't determine the Unity version, please specify it manually");
      }, lazy);
      getter(Il2Cpp3, "unityVersionIsBelow201830", () => {
        return UnityVersion.lt(Il2Cpp3.unityVersion, "2018.3.0");
      }, lazy);
      getter(Il2Cpp3, "unityVersionIsBelow202120", () => {
        return UnityVersion.lt(Il2Cpp3.unityVersion, "2021.2.0");
      }, lazy);
      function unityEngineCall(method) {
        const handle = Il2Cpp3.exports.resolveInternalCall(Memory.allocUtf8String("UnityEngine.Application::" + method));
        const nativeFunction = new NativeFunction(handle, "pointer", []);
        return nativeFunction.isNull() ? null : new Il2Cpp3.String(nativeFunction()).asNullable()?.content ?? null;
      }
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function boxed(value, type) {
        const mapping = {
          int8: "System.SByte",
          uint8: "System.Byte",
          int16: "System.Int16",
          uint16: "System.UInt16",
          int32: "System.Int32",
          uint32: "System.UInt32",
          int64: "System.Int64",
          uint64: "System.UInt64",
          char: "System.Char",
          intptr: "System.IntPtr",
          uintptr: "System.UIntPtr"
        };
        const className = typeof value == "boolean" ? "System.Boolean" : typeof value == "number" ? mapping[type ?? "int32"] : value instanceof Int64 ? "System.Int64" : value instanceof UInt64 ? "System.UInt64" : value instanceof NativePointer ? mapping[type ?? "intptr"] : raise(`Cannot create boxed primitive using value of type '${typeof value}'`);
        const object = Il2Cpp3.corlib.class(className ?? raise(`Unknown primitive type name '${type}'`)).alloc();
        (object.tryField("m_value") ?? object.tryField("_pointer") ?? raise(`Could not find primitive field in class '${className}'`)).value = value;
        return object;
      }
      Il2Cpp3.boxed = boxed;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      Il2Cpp3.$config = {
        moduleName: void 0,
        unityVersion: void 0,
        exports: void 0
      };
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function dump(fileName, path) {
        fileName = fileName ?? `${Il2Cpp3.application.identifier}_${Il2Cpp3.application.version}.cs`;
        path = path ?? Il2Cpp3.application.dataPath ?? Process.getCurrentDir();
        createDirectoryRecursively(path);
        const destination = `${path}/${fileName}`;
        const file = new File(destination, "w");
        for (const assembly of Il2Cpp3.domain.assemblies) {
          inform(`dumping ${assembly.name}...`);
          for (const klass of assembly.image.classes) {
            file.write(`${klass}

`);
          }
        }
        file.flush();
        file.close();
        ok(`dump saved to ${destination}`);
        showDeprecationNotice();
      }
      Il2Cpp3.dump = dump;
      function dumpTree(path, ignoreAlreadyExistingDirectory = false) {
        path = path ?? `${Il2Cpp3.application.dataPath ?? Process.getCurrentDir()}/${Il2Cpp3.application.identifier}_${Il2Cpp3.application.version}`;
        if (!ignoreAlreadyExistingDirectory && directoryExists(path)) {
          raise(`directory ${path} already exists - pass ignoreAlreadyExistingDirectory = true to skip this check`);
        }
        for (const assembly of Il2Cpp3.domain.assemblies) {
          inform(`dumping ${assembly.name}...`);
          const destination = `${path}/${assembly.name.replaceAll(".", "/")}.cs`;
          createDirectoryRecursively(destination.substring(0, destination.lastIndexOf("/")));
          const file = new File(destination, "w");
          for (const klass of assembly.image.classes) {
            file.write(`${klass}

`);
          }
          file.flush();
          file.close();
        }
        ok(`dump saved to ${path}`);
        showDeprecationNotice();
      }
      Il2Cpp3.dumpTree = dumpTree;
      function directoryExists(path) {
        return Il2Cpp3.corlib.class("System.IO.Directory").method("Exists").invoke(Il2Cpp3.string(path));
      }
      function createDirectoryRecursively(path) {
        Il2Cpp3.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp3.string(path));
      }
      function showDeprecationNotice() {
        warn("this api will be removed in a future release, please use `npx frida-il2cpp-bridge dump` instead");
      }
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function installExceptionListener(targetThread = "current") {
        const currentThread = Il2Cpp3.exports.threadGetCurrent();
        return Interceptor.attach(Il2Cpp3.module.getExportByName("__cxa_throw"), function (args) {
          if (targetThread == "current" && !Il2Cpp3.exports.threadGetCurrent().equals(currentThread)) {
            return;
          }
          inform(new Il2Cpp3.Object(args[0].readPointer()));
        });
      }
      Il2Cpp3.installExceptionListener = installExceptionListener;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      Il2Cpp3.exports = {
        get alloc() {
          return r("il2cpp_alloc", "pointer", ["size_t"]);
        },
        get arrayGetLength() {
          return r("il2cpp_array_length", "uint32", ["pointer"]);
        },
        get arrayNew() {
          return r("il2cpp_array_new", "pointer", ["pointer", "uint32"]);
        },
        get assemblyGetImage() {
          return r("il2cpp_assembly_get_image", "pointer", ["pointer"]);
        },
        get classForEach() {
          return r("il2cpp_class_for_each", "void", ["pointer", "pointer"]);
        },
        get classFromName() {
          return r("il2cpp_class_from_name", "pointer", ["pointer", "pointer", "pointer"]);
        },
        get classFromObject() {
          return r("il2cpp_class_from_system_type", "pointer", ["pointer"]);
        },
        get classGetArrayClass() {
          return r("il2cpp_array_class_get", "pointer", ["pointer", "uint32"]);
        },
        get classGetArrayElementSize() {
          return r("il2cpp_class_array_element_size", "int", ["pointer"]);
        },
        get classGetAssemblyName() {
          return r("il2cpp_class_get_assemblyname", "pointer", ["pointer"]);
        },
        get classGetBaseType() {
          return r("il2cpp_class_enum_basetype", "pointer", ["pointer"]);
        },
        get classGetDeclaringType() {
          return r("il2cpp_class_get_declaring_type", "pointer", ["pointer"]);
        },
        get classGetElementClass() {
          return r("il2cpp_class_get_element_class", "pointer", ["pointer"]);
        },
        get classGetFieldFromName() {
          return r("il2cpp_class_get_field_from_name", "pointer", ["pointer", "pointer"]);
        },
        get classGetFields() {
          return r("il2cpp_class_get_fields", "pointer", ["pointer", "pointer"]);
        },
        get classGetFlags() {
          return r("il2cpp_class_get_flags", "int", ["pointer"]);
        },
        get classGetImage() {
          return r("il2cpp_class_get_image", "pointer", ["pointer"]);
        },
        get classGetInstanceSize() {
          return r("il2cpp_class_instance_size", "int32", ["pointer"]);
        },
        get classGetInterfaces() {
          return r("il2cpp_class_get_interfaces", "pointer", ["pointer", "pointer"]);
        },
        get classGetMethodFromName() {
          return r("il2cpp_class_get_method_from_name", "pointer", ["pointer", "pointer", "int"]);
        },
        get classGetMethods() {
          return r("il2cpp_class_get_methods", "pointer", ["pointer", "pointer"]);
        },
        get classGetName() {
          return r("il2cpp_class_get_name", "pointer", ["pointer"]);
        },
        get classGetNamespace() {
          return r("il2cpp_class_get_namespace", "pointer", ["pointer"]);
        },
        get classGetNestedClasses() {
          return r("il2cpp_class_get_nested_types", "pointer", ["pointer", "pointer"]);
        },
        get classGetParent() {
          return r("il2cpp_class_get_parent", "pointer", ["pointer"]);
        },
        get classGetStaticFieldData() {
          return r("il2cpp_class_get_static_field_data", "pointer", ["pointer"]);
        },
        get classGetValueTypeSize() {
          return r("il2cpp_class_value_size", "int32", ["pointer", "pointer"]);
        },
        get classGetType() {
          return r("il2cpp_class_get_type", "pointer", ["pointer"]);
        },
        get classHasReferences() {
          return r("il2cpp_class_has_references", "bool", ["pointer"]);
        },
        get classInitialize() {
          return r("il2cpp_runtime_class_init", "void", ["pointer"]);
        },
        get classIsAbstract() {
          return r("il2cpp_class_is_abstract", "bool", ["pointer"]);
        },
        get classIsAssignableFrom() {
          return r("il2cpp_class_is_assignable_from", "bool", ["pointer", "pointer"]);
        },
        get classIsBlittable() {
          return r("il2cpp_class_is_blittable", "bool", ["pointer"]);
        },
        get classIsEnum() {
          return r("il2cpp_class_is_enum", "bool", ["pointer"]);
        },
        get classIsGeneric() {
          return r("il2cpp_class_is_generic", "bool", ["pointer"]);
        },
        get classIsInflated() {
          return r("il2cpp_class_is_inflated", "bool", ["pointer"]);
        },
        get classIsInterface() {
          return r("il2cpp_class_is_interface", "bool", ["pointer"]);
        },
        get classIsSubclassOf() {
          return r("il2cpp_class_is_subclass_of", "bool", ["pointer", "pointer", "bool"]);
        },
        get classIsValueType() {
          return r("il2cpp_class_is_valuetype", "bool", ["pointer"]);
        },
        get domainGetAssemblyFromName() {
          return r("il2cpp_domain_assembly_open", "pointer", ["pointer", "pointer"]);
        },
        get domainGet() {
          return r("il2cpp_domain_get", "pointer", []);
        },
        get domainGetAssemblies() {
          return r("il2cpp_domain_get_assemblies", "pointer", ["pointer", "pointer"]);
        },
        get fieldGetClass() {
          return r("il2cpp_field_get_parent", "pointer", ["pointer"]);
        },
        get fieldGetFlags() {
          return r("il2cpp_field_get_flags", "int", ["pointer"]);
        },
        get fieldGetName() {
          return r("il2cpp_field_get_name", "pointer", ["pointer"]);
        },
        get fieldGetOffset() {
          return r("il2cpp_field_get_offset", "int32", ["pointer"]);
        },
        get fieldGetStaticValue() {
          return r("il2cpp_field_static_get_value", "void", ["pointer", "pointer"]);
        },
        get fieldGetType() {
          return r("il2cpp_field_get_type", "pointer", ["pointer"]);
        },
        get fieldSetStaticValue() {
          return r("il2cpp_field_static_set_value", "void", ["pointer", "pointer"]);
        },
        get free() {
          return r("il2cpp_free", "void", ["pointer"]);
        },
        get gcCollect() {
          return r("il2cpp_gc_collect", "void", ["int"]);
        },
        get gcCollectALittle() {
          return r("il2cpp_gc_collect_a_little", "void", []);
        },
        get gcDisable() {
          return r("il2cpp_gc_disable", "void", []);
        },
        get gcEnable() {
          return r("il2cpp_gc_enable", "void", []);
        },
        get gcGetHeapSize() {
          return r("il2cpp_gc_get_heap_size", "int64", []);
        },
        get gcGetMaxTimeSlice() {
          return r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
        },
        get gcGetUsedSize() {
          return r("il2cpp_gc_get_used_size", "int64", []);
        },
        get gcHandleGetTarget() {
          return r("il2cpp_gchandle_get_target", "pointer", ["uint32"]);
        },
        get gcHandleFree() {
          return r("il2cpp_gchandle_free", "void", ["uint32"]);
        },
        get gcHandleNew() {
          return r("il2cpp_gchandle_new", "uint32", ["pointer", "bool"]);
        },
        get gcHandleNewWeakRef() {
          return r("il2cpp_gchandle_new_weakref", "uint32", ["pointer", "bool"]);
        },
        get gcIsDisabled() {
          return r("il2cpp_gc_is_disabled", "bool", []);
        },
        get gcIsIncremental() {
          return r("il2cpp_gc_is_incremental", "bool", []);
        },
        get gcSetMaxTimeSlice() {
          return r("il2cpp_gc_set_max_time_slice_ns", "void", ["int64"]);
        },
        get gcStartIncrementalCollection() {
          return r("il2cpp_gc_start_incremental_collection", "void", []);
        },
        get gcStartWorld() {
          return r("il2cpp_start_gc_world", "void", []);
        },
        get gcStopWorld() {
          return r("il2cpp_stop_gc_world", "void", []);
        },
        get getCorlib() {
          return r("il2cpp_get_corlib", "pointer", []);
        },
        get imageGetAssembly() {
          return r("il2cpp_image_get_assembly", "pointer", ["pointer"]);
        },
        get imageGetClass() {
          return r("il2cpp_image_get_class", "pointer", ["pointer", "uint"]);
        },
        get imageGetClassCount() {
          return r("il2cpp_image_get_class_count", "uint32", ["pointer"]);
        },
        get imageGetName() {
          return r("il2cpp_image_get_name", "pointer", ["pointer"]);
        },
        get initialize() {
          return r("il2cpp_init", "void", ["pointer"]);
        },
        get livenessAllocateStruct() {
          return r("il2cpp_unity_liveness_allocate_struct", "pointer", ["pointer", "int", "pointer", "pointer", "pointer"]);
        },
        get livenessCalculationBegin() {
          return r("il2cpp_unity_liveness_calculation_begin", "pointer", ["pointer", "int", "pointer", "pointer", "pointer", "pointer"]);
        },
        get livenessCalculationEnd() {
          return r("il2cpp_unity_liveness_calculation_end", "void", ["pointer"]);
        },
        get livenessCalculationFromStatics() {
          return r("il2cpp_unity_liveness_calculation_from_statics", "void", ["pointer"]);
        },
        get livenessFinalize() {
          return r("il2cpp_unity_liveness_finalize", "void", ["pointer"]);
        },
        get livenessFreeStruct() {
          return r("il2cpp_unity_liveness_free_struct", "void", ["pointer"]);
        },
        get memorySnapshotCapture() {
          return r("il2cpp_capture_memory_snapshot", "pointer", []);
        },
        get memorySnapshotFree() {
          return r("il2cpp_free_captured_memory_snapshot", "void", ["pointer"]);
        },
        get memorySnapshotGetClasses() {
          return r("il2cpp_memory_snapshot_get_classes", "pointer", ["pointer", "pointer"]);
        },
        get memorySnapshotGetObjects() {
          return r("il2cpp_memory_snapshot_get_objects", "pointer", ["pointer", "pointer"]);
        },
        get methodGetClass() {
          return r("il2cpp_method_get_class", "pointer", ["pointer"]);
        },
        get methodGetFlags() {
          return r("il2cpp_method_get_flags", "uint32", ["pointer", "pointer"]);
        },
        get methodGetName() {
          return r("il2cpp_method_get_name", "pointer", ["pointer"]);
        },
        get methodGetObject() {
          return r("il2cpp_method_get_object", "pointer", ["pointer", "pointer"]);
        },
        get methodGetParameterCount() {
          return r("il2cpp_method_get_param_count", "uint8", ["pointer"]);
        },
        get methodGetParameterName() {
          return r("il2cpp_method_get_param_name", "pointer", ["pointer", "uint32"]);
        },
        get methodGetParameters() {
          return r("il2cpp_method_get_parameters", "pointer", ["pointer", "pointer"]);
        },
        get methodGetParameterType() {
          return r("il2cpp_method_get_param", "pointer", ["pointer", "uint32"]);
        },
        get methodGetReturnType() {
          return r("il2cpp_method_get_return_type", "pointer", ["pointer"]);
        },
        get methodIsGeneric() {
          return r("il2cpp_method_is_generic", "bool", ["pointer"]);
        },
        get methodIsInflated() {
          return r("il2cpp_method_is_inflated", "bool", ["pointer"]);
        },
        get methodIsInstance() {
          return r("il2cpp_method_is_instance", "bool", ["pointer"]);
        },
        get monitorEnter() {
          return r("il2cpp_monitor_enter", "void", ["pointer"]);
        },
        get monitorExit() {
          return r("il2cpp_monitor_exit", "void", ["pointer"]);
        },
        get monitorPulse() {
          return r("il2cpp_monitor_pulse", "void", ["pointer"]);
        },
        get monitorPulseAll() {
          return r("il2cpp_monitor_pulse_all", "void", ["pointer"]);
        },
        get monitorTryEnter() {
          return r("il2cpp_monitor_try_enter", "bool", ["pointer", "uint32"]);
        },
        get monitorTryWait() {
          return r("il2cpp_monitor_try_wait", "bool", ["pointer", "uint32"]);
        },
        get monitorWait() {
          return r("il2cpp_monitor_wait", "void", ["pointer"]);
        },
        get objectGetClass() {
          return r("il2cpp_object_get_class", "pointer", ["pointer"]);
        },
        get objectGetVirtualMethod() {
          return r("il2cpp_object_get_virtual_method", "pointer", ["pointer", "pointer"]);
        },
        get objectInitialize() {
          return r("il2cpp_runtime_object_init_exception", "void", ["pointer", "pointer"]);
        },
        get objectNew() {
          return r("il2cpp_object_new", "pointer", ["pointer"]);
        },
        get objectGetSize() {
          return r("il2cpp_object_get_size", "uint32", ["pointer"]);
        },
        get objectUnbox() {
          return r("il2cpp_object_unbox", "pointer", ["pointer"]);
        },
        get resolveInternalCall() {
          return r("il2cpp_resolve_icall", "pointer", ["pointer"]);
        },
        get stringGetChars() {
          return r("il2cpp_string_chars", "pointer", ["pointer"]);
        },
        get stringGetLength() {
          return r("il2cpp_string_length", "int32", ["pointer"]);
        },
        get stringNew() {
          return r("il2cpp_string_new", "pointer", ["pointer"]);
        },
        get valueTypeBox() {
          return r("il2cpp_value_box", "pointer", ["pointer", "pointer"]);
        },
        get threadAttach() {
          return r("il2cpp_thread_attach", "pointer", ["pointer"]);
        },
        get threadDetach() {
          return r("il2cpp_thread_detach", "void", ["pointer"]);
        },
        get threadGetAttachedThreads() {
          return r("il2cpp_thread_get_all_attached_threads", "pointer", ["pointer"]);
        },
        get threadGetCurrent() {
          return r("il2cpp_thread_current", "pointer", []);
        },
        get threadIsVm() {
          return r("il2cpp_is_vm_thread", "bool", ["pointer"]);
        },
        get typeEquals() {
          return r("il2cpp_type_equals", "bool", ["pointer", "pointer"]);
        },
        get typeGetClass() {
          return r("il2cpp_class_from_type", "pointer", ["pointer"]);
        },
        get typeGetName() {
          return r("il2cpp_type_get_name", "pointer", ["pointer"]);
        },
        get typeGetObject() {
          return r("il2cpp_type_get_object", "pointer", ["pointer"]);
        },
        get typeGetTypeEnum() {
          return r("il2cpp_type_get_type", "int", ["pointer"]);
        }
      };
      decorate(Il2Cpp3.exports, lazy);
      getter(Il2Cpp3, "memorySnapshotExports", () => new CModule("#include <stdint.h>\n#include <string.h>\n\ntypedef struct Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct Il2CppMetadataType Il2CppMetadataType;\n\nstruct Il2CppManagedMemorySnapshot\n{\n  struct Il2CppManagedHeap\n  {\n    uint32_t section_count;\n    void * sections;\n  } heap;\n  struct Il2CppStacks\n  {\n    uint32_t stack_count;\n    void * stacks;\n  } stacks;\n  struct Il2CppMetadataSnapshot\n  {\n    uint32_t type_count;\n    Il2CppMetadataType * types;\n  } metadata_snapshot;\n  struct Il2CppGCHandles\n  {\n    uint32_t tracked_object_count;\n    void ** pointers_to_objects;\n  } gc_handles;\n  struct Il2CppRuntimeInformation\n  {\n    uint32_t pointer_size;\n    uint32_t object_header_size;\n    uint32_t array_header_size;\n    uint32_t array_bounds_offset_in_header;\n    uint32_t array_size_offset_in_header;\n    uint32_t allocation_granularity;\n  } runtime_information;\n  void * additional_user_information;\n};\n\nstruct Il2CppMetadataType\n{\n  uint32_t flags;\n  void * fields;\n  uint32_t field_count;\n  uint32_t statics_size;\n  uint8_t * statics;\n  uint32_t base_or_element_type_index;\n  char * name;\n  const char * assembly_name;\n  uint64_t type_info_address;\n  uint32_t size;\n};\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (\n    const Il2CppManagedMemorySnapshot * snapshot, Il2CppMetadataType ** iter)\n{\n  const int zero = 0;\n  const void * null = 0;\n\n  if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n  {\n    if (*iter == null)\n    {\n      *iter = snapshot->metadata_snapshot.types;\n      return (uintptr_t) (*iter)->type_info_address;\n    }\n    else\n    {\n      Il2CppMetadataType * metadata_type = *iter + 1;\n\n      if (metadata_type < snapshot->metadata_snapshot.types +\n                              snapshot->metadata_snapshot.type_count)\n      {\n        *iter = metadata_type;\n        return (uintptr_t) (*iter)->type_info_address;\n      }\n    }\n  }\n  return 0;\n}\n\nvoid **\nil2cpp_memory_snapshot_get_objects (\n    const Il2CppManagedMemorySnapshot * snapshot, uint32_t * size)\n{\n  *size = snapshot->gc_handles.tracked_object_count;\n  return snapshot->gc_handles.pointers_to_objects;\n}\n"), lazy);
      function r(exportName, retType, argTypes) {
        const handle = Il2Cpp3.$config.exports?.[exportName]?.() ?? Il2Cpp3.module.findExportByName(exportName) ?? Il2Cpp3.memorySnapshotExports[exportName];
        const target = new NativeFunction(handle ?? NULL, retType, argTypes);
        return target.isNull() ? new Proxy(target, {
          get(value, name) {
            const property = value[name];
            return typeof property === "function" ? property.bind(value) : property;
          },
          apply() {
            if (handle == null) {
              raise(`couldn't resolve export ${exportName}`);
            } else if (handle.isNull()) {
              raise(`export ${exportName} points to NULL IL2CPP library has likely been stripped, obfuscated, or customized`);
            }
          }
        }) : target;
      }
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function is(klass) {
        return element => {
          if (element instanceof Il2Cpp3.Class) {
            return klass.isAssignableFrom(element);
          } else {
            return klass.isAssignableFrom(element.class);
          }
        };
      }
      Il2Cpp3.is = is;
      function isExactly(klass) {
        return element => {
          if (element instanceof Il2Cpp3.Class) {
            return element.equals(klass);
          } else {
            return element.class.equals(klass);
          }
        };
      }
      Il2Cpp3.isExactly = isExactly;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      Il2Cpp3.gc = {
        /**
         * Gets the heap size in bytes.
         */
        get heapSize() {
          return Il2Cpp3.exports.gcGetHeapSize();
        },
        /**
         * Determines whether the garbage collector is enabled.
         */
        get isEnabled() {
          return !Il2Cpp3.exports.gcIsDisabled();
        },
        /**
         * Determines whether the garbage collector is incremental
         * ([source](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html)).
         */
        get isIncremental() {
          return !!Il2Cpp3.exports.gcIsIncremental();
        },
        /**
         * Gets the number of nanoseconds the garbage collector can spend in a
         * collection step.
         */
        get maxTimeSlice() {
          return Il2Cpp3.exports.gcGetMaxTimeSlice();
        },
        /**
         * Gets the used heap size in bytes.
         */
        get usedHeapSize() {
          return Il2Cpp3.exports.gcGetUsedSize();
        },
        /**
         * Enables or disables the garbage collector.
         */
        set isEnabled(value) {
          value ? Il2Cpp3.exports.gcEnable() : Il2Cpp3.exports.gcDisable();
        },
        /**
         *  Sets the number of nanoseconds the garbage collector can spend in
         * a collection step.
         */
        set maxTimeSlice(nanoseconds) {
          Il2Cpp3.exports.gcSetMaxTimeSlice(nanoseconds);
        },
        /**
         * Returns the heap allocated objects of the specified class. \
         * This variant reads GC descriptors.
         */
        choose(klass) {
          const matches = [];
          const callback = (objects, size) => {
            for (let i = 0; i < size; i++) {
              matches.push(new Il2Cpp3.Object(objects.add(i * Process.pointerSize).readPointer()));
            }
          };
          const chooseCallback = new NativeCallback(callback, "void", ["pointer", "int", "pointer"]);
          if (Il2Cpp3.unityVersionIsBelow202120) {
            const onWorld = new NativeCallback(() => {}, "void", []);
            const state = Il2Cpp3.exports.livenessCalculationBegin(klass, 0, chooseCallback, NULL, onWorld, onWorld);
            Il2Cpp3.exports.livenessCalculationFromStatics(state);
            Il2Cpp3.exports.livenessCalculationEnd(state);
          } else {
            const realloc = (handle, size) => {
              if (!handle.isNull() && size.compare(0) == 0) {
                Il2Cpp3.free(handle);
                return NULL;
              } else {
                return Il2Cpp3.alloc(size);
              }
            };
            const reallocCallback = new NativeCallback(realloc, "pointer", ["pointer", "size_t", "pointer"]);
            this.stopWorld();
            const state = Il2Cpp3.exports.livenessAllocateStruct(klass, 0, chooseCallback, NULL, reallocCallback);
            Il2Cpp3.exports.livenessCalculationFromStatics(state);
            Il2Cpp3.exports.livenessFinalize(state);
            this.startWorld();
            Il2Cpp3.exports.livenessFreeStruct(state);
          }
          return matches;
        },
        /**
         * Forces a garbage collection of the specified generation.
         */
        collect(generation) {
          Il2Cpp3.exports.gcCollect(generation < 0 ? 0 : generation > 2 ? 2 : generation);
        },
        /**
         * Forces a garbage collection.
         */
        collectALittle() {
          Il2Cpp3.exports.gcCollectALittle();
        },
        /**
         *  Resumes all the previously stopped threads.
         */
        startWorld() {
          return Il2Cpp3.exports.gcStartWorld();
        },
        /**
         * Performs an incremental garbage collection.
         */
        startIncrementalCollection() {
          return Il2Cpp3.exports.gcStartIncrementalCollection();
        },
        /**
         * Stops all threads which may access the garbage collected heap, other
         * than the caller.
         */
        stopWorld() {
          return Il2Cpp3.exports.gcStopWorld();
        }
      };
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Android2) {
      getter(Android2, "apiLevel", () => {
        const value = getProperty("ro.build.version.sdk");
        return value ? parseInt(value) : null;
      }, lazy);
      function getProperty(name) {
        const handle = Process.findModuleByName("libc.so")?.findExportByName("__system_property_get");
        if (handle) {
          const __system_property_get = new NativeFunction(handle, "void", ["pointer", "pointer"]);
          const value = Memory.alloc(92).writePointer(NULL);
          __system_property_get(Memory.allocUtf8String(name), value);
          return value.readCString() ?? void 0;
        }
      }
    })(Android || (Android = {}));
    NativeStruct = class {
      handle;
      constructor(handleOrWrapper) {
        if (handleOrWrapper instanceof NativePointer) {
          this.handle = handleOrWrapper;
        } else {
          this.handle = handleOrWrapper.handle;
        }
      }
      equals(other) {
        return this.handle.equals(other.handle);
      }
      isNull() {
        return this.handle.isNull();
      }
      asNullable() {
        return this.isNull() ? null : this;
      }
    };
    NativePointer.prototype.offsetOf = function (condition, depth) {
      depth ??= 512;
      for (let i = 0; depth > 0 ? i < depth : i < -depth; i++) {
        if (condition(depth > 0 ? this.add(i) : this.sub(i))) {
          return i;
        }
      }
      return null;
    };
    (function (UnityVersion2) {
      const pattern = /(6\d{3}|20\d{2}|\d)\.(\d)\.(\d{1,2})(?:[abcfp]|rc){0,2}\d?/;
      function find(string) {
        return string?.match(pattern)?.[0];
      }
      UnityVersion2.find = find;
      function gte(a, b) {
        return compare(a, b) >= 0;
      }
      UnityVersion2.gte = gte;
      function lt(a, b) {
        return compare(a, b) < 0;
      }
      UnityVersion2.lt = lt;
      function compare(a, b) {
        const aMatches = a.match(pattern);
        const bMatches = b.match(pattern);
        for (let i = 1; i <= 3; i++) {
          const a2 = Number(aMatches?.[i] ?? -1);
          const b2 = Number(bMatches?.[i] ?? -1);
          if (a2 > b2) return 1;else if (a2 < b2) return -1;
        }
        return 0;
      }
    })(UnityVersion || (UnityVersion = {}));
    (function (Il2Cpp3) {
      function alloc(size = Process.pointerSize) {
        return Il2Cpp3.exports.alloc(size);
      }
      Il2Cpp3.alloc = alloc;
      function free(pointer) {
        return Il2Cpp3.exports.free(pointer);
      }
      Il2Cpp3.free = free;
      function read(pointer, type) {
        switch (type.enumValue) {
          case Il2Cpp3.Type.Enum.BOOLEAN:
            return !!pointer.readS8();
          case Il2Cpp3.Type.Enum.BYTE:
            return pointer.readS8();
          case Il2Cpp3.Type.Enum.UBYTE:
            return pointer.readU8();
          case Il2Cpp3.Type.Enum.SHORT:
            return pointer.readS16();
          case Il2Cpp3.Type.Enum.USHORT:
            return pointer.readU16();
          case Il2Cpp3.Type.Enum.INT:
            return pointer.readS32();
          case Il2Cpp3.Type.Enum.UINT:
            return pointer.readU32();
          case Il2Cpp3.Type.Enum.CHAR:
            return pointer.readU16();
          case Il2Cpp3.Type.Enum.LONG:
            return pointer.readS64();
          case Il2Cpp3.Type.Enum.ULONG:
            return pointer.readU64();
          case Il2Cpp3.Type.Enum.FLOAT:
            return pointer.readFloat();
          case Il2Cpp3.Type.Enum.DOUBLE:
            return pointer.readDouble();
          case Il2Cpp3.Type.Enum.NINT:
          case Il2Cpp3.Type.Enum.NUINT:
            return pointer.readPointer();
          case Il2Cpp3.Type.Enum.POINTER:
            return new Il2Cpp3.Pointer(pointer.readPointer(), type.class.baseType);
          case Il2Cpp3.Type.Enum.VALUE_TYPE:
            return new Il2Cpp3.ValueType(pointer, type);
          case Il2Cpp3.Type.Enum.OBJECT:
          case Il2Cpp3.Type.Enum.CLASS:
            return new Il2Cpp3.Object(pointer.readPointer());
          case Il2Cpp3.Type.Enum.GENERIC_INSTANCE:
            return type.class.isValueType ? new Il2Cpp3.ValueType(pointer, type) : new Il2Cpp3.Object(pointer.readPointer());
          case Il2Cpp3.Type.Enum.STRING:
            return new Il2Cpp3.String(pointer.readPointer());
          case Il2Cpp3.Type.Enum.ARRAY:
          case Il2Cpp3.Type.Enum.NARRAY:
            return new Il2Cpp3.Array(pointer.readPointer());
        }
        raise(`couldn't read the value from ${pointer} using an unhandled or unknown type ${type.name} (${type.enumValue}), please file an issue`);
      }
      Il2Cpp3.read = read;
      function write(pointer, value, type) {
        switch (type.enumValue) {
          case Il2Cpp3.Type.Enum.BOOLEAN:
            return pointer.writeS8(+value);
          case Il2Cpp3.Type.Enum.BYTE:
            return pointer.writeS8(value);
          case Il2Cpp3.Type.Enum.UBYTE:
            return pointer.writeU8(value);
          case Il2Cpp3.Type.Enum.SHORT:
            return pointer.writeS16(value);
          case Il2Cpp3.Type.Enum.USHORT:
            return pointer.writeU16(value);
          case Il2Cpp3.Type.Enum.INT:
            return pointer.writeS32(value);
          case Il2Cpp3.Type.Enum.UINT:
            return pointer.writeU32(value);
          case Il2Cpp3.Type.Enum.CHAR:
            return pointer.writeU16(value);
          case Il2Cpp3.Type.Enum.LONG:
            return pointer.writeS64(value);
          case Il2Cpp3.Type.Enum.ULONG:
            return pointer.writeU64(value);
          case Il2Cpp3.Type.Enum.FLOAT:
            return pointer.writeFloat(value);
          case Il2Cpp3.Type.Enum.DOUBLE:
            return pointer.writeDouble(value);
          case Il2Cpp3.Type.Enum.NINT:
          case Il2Cpp3.Type.Enum.NUINT:
          case Il2Cpp3.Type.Enum.POINTER:
          case Il2Cpp3.Type.Enum.STRING:
          case Il2Cpp3.Type.Enum.ARRAY:
          case Il2Cpp3.Type.Enum.NARRAY:
            return pointer.writePointer(value);
          case Il2Cpp3.Type.Enum.VALUE_TYPE:
            return Memory.copy(pointer, value, type.class.valueTypeSize), pointer;
          case Il2Cpp3.Type.Enum.OBJECT:
          case Il2Cpp3.Type.Enum.CLASS:
          case Il2Cpp3.Type.Enum.GENERIC_INSTANCE:
            return value instanceof Il2Cpp3.ValueType ? (Memory.copy(pointer, value, type.class.valueTypeSize), pointer) : pointer.writePointer(value);
        }
        raise(`couldn't write value ${value} to ${pointer} using an unhandled or unknown type ${type.name} (${type.enumValue}), please file an issue`);
      }
      Il2Cpp3.write = write;
      function fromFridaValue(value, type) {
        if (globalThis.Array.isArray(value)) {
          const handle = Memory.alloc(type.class.valueTypeSize);
          const fields = type.class.fields.filter(_ => !_.isStatic);
          for (let i = 0; i < fields.length; i++) {
            const convertedValue = fromFridaValue(value[i], fields[i].type);
            write(handle.add(fields[i].offset).sub(Il2Cpp3.Object.headerSize), convertedValue, fields[i].type);
          }
          return new Il2Cpp3.ValueType(handle, type);
        } else if (value instanceof NativePointer) {
          if (type.isByReference) {
            return new Il2Cpp3.Reference(value, type);
          }
          switch (type.enumValue) {
            case Il2Cpp3.Type.Enum.POINTER:
              return new Il2Cpp3.Pointer(value, type.class.baseType);
            case Il2Cpp3.Type.Enum.STRING:
              return new Il2Cpp3.String(value);
            case Il2Cpp3.Type.Enum.CLASS:
            case Il2Cpp3.Type.Enum.GENERIC_INSTANCE:
            case Il2Cpp3.Type.Enum.OBJECT:
              return new Il2Cpp3.Object(value);
            case Il2Cpp3.Type.Enum.ARRAY:
            case Il2Cpp3.Type.Enum.NARRAY:
              return new Il2Cpp3.Array(value);
            default:
              return value;
          }
        } else if (type.enumValue == Il2Cpp3.Type.Enum.BOOLEAN) {
          return !!value;
        } else if (type.enumValue == Il2Cpp3.Type.Enum.VALUE_TYPE && type.class.isEnum) {
          return fromFridaValue([value], type);
        } else {
          return value;
        }
      }
      Il2Cpp3.fromFridaValue = fromFridaValue;
      function toFridaValue(value) {
        if (typeof value == "boolean") {
          return +value;
        } else if (value instanceof Il2Cpp3.ValueType) {
          if (value.type.class.isEnum) {
            return value.field("value__").value;
          } else {
            const _ = value.type.class.fields.filter(_2 => !_2.isStatic).map(_2 => toFridaValue(_2.bind(value).value));
            return _.length == 0 ? [0] : _;
          }
        } else {
          return value;
        }
      }
      Il2Cpp3.toFridaValue = toFridaValue;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      getter(Il2Cpp3, "module", () => {
        return tryModule() ?? raise("Could not find IL2CPP module");
      });
      async function initialize(blocking = false) {
        const module = tryModule() ?? (await new Promise(resolve => {
          const [moduleName, fallbackModuleName] = getExpectedModuleNames();
          const timeout = setTimeout(() => {
            warn(`after 10 seconds, IL2CPP module '${moduleName}' has not been loaded yet, is the app running?`);
          }, 1e4);
          const moduleObserver = Process.attachModuleObserver({
            onAdded(module2) {
              if (module2.name == moduleName || fallbackModuleName && module2.name == fallbackModuleName) {
                clearTimeout(timeout);
                setImmediate(() => {
                  resolve(module2);
                  moduleObserver.detach();
                });
              }
            }
          });
        }));
        Reflect.defineProperty(Il2Cpp3, "module", {
          value: module
        });
        if (Il2Cpp3.exports.getCorlib().isNull()) {
          return await new Promise(resolve => {
            const timeout = setTimeout(() => {
              if (!Il2Cpp3.exports.getCorlib().isNull()) {
                warn(`resuming execution despite IL2CPP initialization not being captured in time, please open an issue as this is suboptimal`);
                interceptor.detach();
                resolve(false);
              }
            }, 1e3);
            const interceptor = Interceptor.attach(Il2Cpp3.exports.initialize, {
              onEnter() {
                clearTimeout(timeout);
              },
              onLeave() {
                interceptor.detach();
                blocking ? resolve(true) : setImmediate(() => resolve(false));
              }
            });
          });
        }
        return false;
      }
      Il2Cpp3.initialize = initialize;
      function tryModule() {
        const [moduleName, fallback] = getExpectedModuleNames();
        return Process.findModuleByName(moduleName) ?? Process.findModuleByName(fallback ?? moduleName) ?? (Process.platform == "darwin" ? Process.findModuleByAddress(DebugSymbol.fromName("il2cpp_init").address) : void 0) ?? void 0;
      }
      function getExpectedModuleNames() {
        if (Il2Cpp3.$config.moduleName) {
          return [Il2Cpp3.$config.moduleName];
        }
        switch (Process.platform) {
          case "linux":
            return [Android.apiLevel ? "libil2cpp.so" : "GameAssembly.so"];
          case "windows":
            return ["GameAssembly.dll"];
          case "darwin":
            return ["UnityFramework", "GameAssembly.dylib"];
        }
        raise(`${Process.platform} is not supported yet`);
      }
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function nullable(valueOrNull, klass) {
        const actualClass = typeof valueOrNull == "boolean" ? Il2Cpp3.corlib.class("System.Boolean") : typeof valueOrNull == "number" ? klass ?? Il2Cpp3.corlib.class("System.Int32") : valueOrNull instanceof Int64 ? Il2Cpp3.corlib.class("System.Int64") : valueOrNull instanceof UInt64 ? Il2Cpp3.corlib.class("System.UInt64") : valueOrNull instanceof NativePointer ? klass ?? Il2Cpp3.corlib.class("System.IntPtr") : valueOrNull instanceof Il2Cpp3.ValueType ? valueOrNull.type.class : klass ?? raise(`A class must be specified when constructing a nullable for value '${valueOrNull}'`);
        if (actualClass.isValueType == false) {
          raise(`Cannot create nullable value type out of a reference type '${actualClass.type.name}'`);
        }
        const inflatedClass = Il2Cpp3.corlib.class("System.Nullable`1").inflate(actualClass);
        const struct = new Il2Cpp3.ValueType(Memory.alloc(inflatedClass.valueTypeSize), inflatedClass.type);
        (struct.tryField("hasValue") ?? struct.field("has_value")).value = valueOrNull != null;
        if (valueOrNull != null) {
          struct.field("value").value = valueOrNull;
        }
        return struct;
      }
      Il2Cpp3.nullable = nullable;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      async function perform(block, flag = "bind") {
        let attachedThread = null;
        try {
          const isInMainThread = await Il2Cpp3.initialize(flag == "main");
          if (flag == "main" && !isInMainThread) {
            return perform(() => Il2Cpp3.mainThread.schedule(block), "free");
          }
          if (Il2Cpp3.currentThread == null) {
            attachedThread = Il2Cpp3.domain.attach();
          }
          if (flag == "bind" && attachedThread != null) {
            Script.bindWeak(globalThis, () => attachedThread?.detach());
          }
          const result = block();
          return result instanceof Promise ? await result : result;
        } catch (error) {
          Script.nextTick(_ => {
            throw _;
          }, error);
          return Promise.reject(error);
        } finally {
          if (flag == "free" && attachedThread != null) {
            attachedThread.detach();
          }
        }
      }
      Il2Cpp3.perform = perform;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Tracer {
        /** @internal */
        #state = {
          depth: 0,
          buffer: [],
          history: /* @__PURE__ */new Set(),
          flush: () => {
            if (this.#state.depth == 0) {
              const message = `
${this.#state.buffer.join("\n")}
`;
              if (this.#verbose) {
                inform(message);
              } else {
                const hash = cyrb53(message);
                if (!this.#state.history.has(hash)) {
                  this.#state.history.add(hash);
                  inform(message);
                }
              }
              this.#state.buffer.length = 0;
            }
          }
        };
        /** @internal */
        #threadId = Il2Cpp3.mainThread.id;
        /** @internal */
        #verbose = false;
        /** @internal */
        #applier;
        /** @internal */
        #targets = [];
        /** @internal */
        #domain;
        /** @internal */
        #assemblies;
        /** @internal */
        #classes;
        /** @internal */
        #methods;
        /** @internal */
        #assemblyFilter;
        /** @internal */
        #classFilter;
        /** @internal */
        #methodFilter;
        /** @internal */
        #parameterFilter;
        constructor(applier) {
          this.#applier = applier;
        }
        /** */
        thread(thread) {
          this.#threadId = thread.id;
          return this;
        }
        /** Determines whether print duplicate logs. */
        verbose(value) {
          this.#verbose = value;
          return this;
        }
        /** Sets the application domain as the place where to find the target methods. */
        domain() {
          this.#domain = Il2Cpp3.domain;
          return this;
        }
        /** Sets the passed `assemblies` as the place where to find the target methods. */
        assemblies(...assemblies) {
          this.#assemblies = assemblies;
          return this;
        }
        /** Sets the passed `classes` as the place where to find the target methods. */
        classes(...classes) {
          this.#classes = classes;
          return this;
        }
        /** Sets the passed `methods` as the target methods. */
        methods(...methods) {
          this.#methods = methods;
          return this;
        }
        /** Filters the assemblies where to find the target methods. */
        filterAssemblies(filter) {
          this.#assemblyFilter = filter;
          return this;
        }
        /** Filters the classes where to find the target methods. */
        filterClasses(filter) {
          this.#classFilter = filter;
          return this;
        }
        /** Filters the target methods. */
        filterMethods(filter) {
          this.#methodFilter = filter;
          return this;
        }
        /** Filters the target methods. */
        filterParameters(filter) {
          this.#parameterFilter = filter;
          return this;
        }
        /** Commits the current changes by finding the target methods. */
        and() {
          const filterMethod = method => {
            if (this.#parameterFilter == void 0) {
              this.#targets.push(method);
              return;
            }
            for (const parameter of method.parameters) {
              if (this.#parameterFilter(parameter)) {
                this.#targets.push(method);
                break;
              }
            }
          };
          const filterMethods = values => {
            for (const method of values) {
              filterMethod(method);
            }
          };
          const filterClass = klass => {
            if (this.#methodFilter == void 0) {
              filterMethods(klass.methods);
              return;
            }
            for (const method of klass.methods) {
              if (this.#methodFilter(method)) {
                filterMethod(method);
              }
            }
          };
          const filterClasses = values => {
            for (const klass of values) {
              filterClass(klass);
            }
          };
          const filterAssembly = assembly => {
            if (this.#classFilter == void 0) {
              filterClasses(assembly.image.classes);
              return;
            }
            for (const klass of assembly.image.classes) {
              if (this.#classFilter(klass)) {
                filterClass(klass);
              }
            }
          };
          const filterAssemblies = assemblies => {
            for (const assembly of assemblies) {
              filterAssembly(assembly);
            }
          };
          const filterDomain = domain => {
            if (this.#assemblyFilter == void 0) {
              filterAssemblies(domain.assemblies);
              return;
            }
            for (const assembly of domain.assemblies) {
              if (this.#assemblyFilter(assembly)) {
                filterAssembly(assembly);
              }
            }
          };
          this.#methods ? filterMethods(this.#methods) : this.#classes ? filterClasses(this.#classes) : this.#assemblies ? filterAssemblies(this.#assemblies) : this.#domain ? filterDomain(this.#domain) : void 0;
          this.#assemblies = void 0;
          this.#classes = void 0;
          this.#methods = void 0;
          this.#assemblyFilter = void 0;
          this.#classFilter = void 0;
          this.#methodFilter = void 0;
          this.#parameterFilter = void 0;
          return this;
        }
        /** Starts tracing. */
        attach() {
          for (const target of this.#targets) {
            if (!target.virtualAddress.isNull()) {
              try {
                this.#applier(target, this.#state, this.#threadId);
              } catch (e) {
                switch (e.message) {
                  case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
                  case "already replaced this function":
                    break;
                  default:
                    throw e;
                }
              }
            }
          }
        }
      }
      Il2Cpp3.Tracer = Tracer;
      function trace(parameters = false) {
        const applier = () => (method, state, threadId) => {
          const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
          Interceptor.attach(method.virtualAddress, {
            onEnter() {
              if (this.threadId == threadId) {
                state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
              }
            },
            onLeave() {
              if (this.threadId == threadId) {
                state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
                state.flush();
              }
            }
          });
        };
        const applierWithParameters = () => (method, state, threadId) => {
          const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
          const startIndex = +!method.isStatic | +Il2Cpp3.unityVersionIsBelow201830;
          const callback = function (...args) {
            if (this.threadId == threadId) {
              const thisParameter = method.isStatic ? void 0 : new Il2Cpp3.Parameter("this", -1, method.class.type);
              const parameters2 = thisParameter ? [thisParameter].concat(method.parameters) : method.parameters;
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m(${parameters2.map(e => `\x1B[32m${e.name}\x1B[0m = \x1B[31m${Il2Cpp3.fromFridaValue(args[e.position + startIndex], e.type)}\x1B[0m`).join(", ")})`);
            }
            const returnValue = method.nativeFunction(...args);
            if (this.threadId == threadId) {
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m${returnValue == void 0 ? "" : ` = \x1B[36m${Il2Cpp3.fromFridaValue(returnValue, method.returnType)}`}\x1B[0m`);
              state.flush();
            }
            return returnValue;
          };
          method.revert();
          const nativeCallback = new NativeCallback(callback, method.returnType.fridaAlias, method.fridaSignature);
          Interceptor.replace(method.virtualAddress, nativeCallback);
        };
        return new Il2Cpp3.Tracer(parameters ? applierWithParameters() : applier());
      }
      Il2Cpp3.trace = trace;
      function backtrace(mode) {
        const methods = Il2Cpp3.domain.assemblies.flatMap(_ => _.image.classes.flatMap(_2 => _2.methods.filter(_3 => !_3.virtualAddress.isNull()))).sort((_, __) => _.virtualAddress.compare(__.virtualAddress));
        const searchInsert = target => {
          let left = 0;
          let right = methods.length - 1;
          while (left <= right) {
            const pivot = Math.floor((left + right) / 2);
            const comparison = methods[pivot].virtualAddress.compare(target);
            if (comparison == 0) {
              return methods[pivot];
            } else if (comparison > 0) {
              right = pivot - 1;
            } else {
              left = pivot + 1;
            }
          }
          return methods[right];
        };
        const applier = () => (method, state, threadId) => {
          Interceptor.attach(method.virtualAddress, function () {
            if (this.threadId == threadId) {
              const handles = globalThis.Thread.backtrace(this.context, mode);
              handles.unshift(method.virtualAddress);
              for (const handle of handles) {
                if (handle.compare(Il2Cpp3.module.base) > 0 && handle.compare(Il2Cpp3.module.base.add(Il2Cpp3.module.size)) < 0) {
                  const method2 = searchInsert(handle);
                  if (method2) {
                    const offset = handle.sub(method2.virtualAddress);
                    if (offset.compare(4095) < 0) {
                      state.buffer.push(`\x1B[2m0x${method2.relativeVirtualAddress.toString(16).padStart(8, "0")}\x1B[0m\x1B[2m+0x${offset.toString(16).padStart(3, `0`)}\x1B[0m ${method2.class.type.name}::\x1B[1m${method2.name}\x1B[0m`);
                    }
                  }
                }
              }
              state.flush();
            }
          });
        };
        return new Il2Cpp3.Tracer(applier());
      }
      Il2Cpp3.backtrace = backtrace;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Array2 extends NativeStruct {
        /** Gets the Il2CppArray struct size, possibly equal to `Process.pointerSize * 4`. */
        static get headerSize() {
          return Il2Cpp3.corlib.class("System.Array").instanceSize;
        }
        /** @internal Gets a pointer to the first element of the current array. */
        get elements() {
          const array2 = Il2Cpp3.string("vfsfitvnm").object.method("ToCharArray", 0).invoke();
          const offset = Memory.scanSync(array2.handle, 255, "76 00 66 00 73 00 66 00 69 00 74 00 76 00 6e 00 6d 00")[0]?.address?.sub(array2.handle) ?? raise("couldn't find the elements offset in the native array struct");
          getter(Il2Cpp3.Array.prototype, "elements", function () {
            return new Il2Cpp3.Pointer(this.handle.add(offset), this.elementType);
          }, lazy);
          return this.elements;
        }
        /** Gets the size of the object encompassed by the current array. */
        get elementSize() {
          return this.elementType.class.arrayElementSize;
        }
        /** Gets the type of the object encompassed by the current array. */
        get elementType() {
          return this.object.class.type.class.baseType;
        }
        /** Gets the total number of elements in all the dimensions of the current array. */
        get length() {
          return Il2Cpp3.exports.arrayGetLength(this);
        }
        /** Gets the encompassing object of the current array. */
        get object() {
          return new Il2Cpp3.Object(this);
        }
        /** Gets the element at the specified index of the current array. */
        get(index) {
          if (index < 0 || index >= this.length) {
            raise(`cannot get element at index ${index} as the array length is ${this.length}`);
          }
          return this.elements.get(index);
        }
        /** Sets the element at the specified index of the current array. */
        set(index, value) {
          if (index < 0 || index >= this.length) {
            raise(`cannot set element at index ${index} as the array length is ${this.length}`);
          }
          this.elements.set(index, value);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
        }
        /** Iterable. */
        *[Symbol.iterator]() {
          for (let i = 0; i < this.length; i++) {
            yield this.elements.get(i);
          }
        }
      }
      __decorate([lazy], Array2.prototype, "elementSize", null);
      __decorate([lazy], Array2.prototype, "elementType", null);
      __decorate([lazy], Array2.prototype, "length", null);
      __decorate([lazy], Array2.prototype, "object", null);
      __decorate([lazy], Array2, "headerSize", null);
      Il2Cpp3.Array = Array2;
      function array(klass, lengthOrElements) {
        const length = typeof lengthOrElements == "number" ? lengthOrElements : lengthOrElements.length;
        const array2 = new Il2Cpp3.Array(Il2Cpp3.exports.arrayNew(klass, length));
        if (globalThis.Array.isArray(lengthOrElements)) {
          array2.elements.write(lengthOrElements);
        }
        return array2;
      }
      Il2Cpp3.array = array;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      let Assembly = class Assembly extends NativeStruct {
        /** Gets the image of this assembly. */
        get image() {
          if (Il2Cpp3.exports.assemblyGetImage.isNull()) {
            const runtimeModule = this.object.tryMethod("GetType", 1)?.invoke(Il2Cpp3.string("<Module>"))?.asNullable()?.tryMethod("get_Module")?.invoke() ?? this.object.tryMethod("GetModules", 1)?.invoke(false)?.get(0) ?? raise(`couldn't find the runtime module object of assembly ${this.name}`);
            return new Il2Cpp3.Image(runtimeModule.field("_impl").value);
          }
          return new Il2Cpp3.Image(Il2Cpp3.exports.assemblyGetImage(this));
        }
        /** Gets the name of this assembly. */
        get name() {
          return this.image.name.replace(".dll", "");
        }
        /** Gets the encompassing object of the current assembly. */
        get object() {
          for (const _ of Il2Cpp3.domain.object.method("GetAssemblies", 1).invoke(false)) {
            if (_.field("_mono_assembly").value.equals(this)) {
              return _;
            }
          }
          raise("couldn't find the object of the native assembly struct");
        }
      };
      __decorate([lazy], Assembly.prototype, "name", null);
      __decorate([lazy], Assembly.prototype, "object", null);
      Assembly = __decorate([recycle], Assembly);
      Il2Cpp3.Assembly = Assembly;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      let Class = class Class extends NativeStruct {
        /** Gets the actual size of the instance of the current class. */
        get actualInstanceSize() {
          const SystemString = Il2Cpp3.corlib.class("System.String");
          const offset = SystemString.handle.offsetOf(_ => _.readInt() == SystemString.instanceSize - 2) ?? raise("couldn't find the actual instance size offset in the native class struct");
          getter(Il2Cpp3.Class.prototype, "actualInstanceSize", function () {
            return this.handle.add(offset).readS32();
          }, lazy);
          return this.actualInstanceSize;
        }
        /** Gets the array class which encompass the current class. */
        get arrayClass() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.classGetArrayClass(this, 1));
        }
        /** Gets the size of the object encompassed by the current array class. */
        get arrayElementSize() {
          return Il2Cpp3.exports.classGetArrayElementSize(this);
        }
        /** Gets the name of the assembly in which the current class is defined. */
        get assemblyName() {
          return Il2Cpp3.exports.classGetAssemblyName(this).readUtf8String().replace(".dll", "");
        }
        /** Gets the class that declares the current nested class. */
        get declaringClass() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.classGetDeclaringType(this)).asNullable();
        }
        /** Gets the encompassed type of this array, reference, pointer or enum type. */
        get baseType() {
          return new Il2Cpp3.Type(Il2Cpp3.exports.classGetBaseType(this)).asNullable();
        }
        /** Gets the class of the object encompassed or referred to by the current array, pointer or reference class. */
        get elementClass() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.classGetElementClass(this)).asNullable();
        }
        /** Gets the fields of the current class. */
        get fields() {
          return readNativeIterator(_ => Il2Cpp3.exports.classGetFields(this, _)).map(_ => new Il2Cpp3.Field(_));
        }
        /** Gets the flags of the current class. */
        get flags() {
          return Il2Cpp3.exports.classGetFlags(this);
        }
        /** Gets the full name (namespace + name) of the current class. */
        get fullName() {
          return this.namespace ? `${this.namespace}.${this.name}` : this.name;
        }
        /** Gets the generic class of the current class if the current class is inflated. */
        get genericClass() {
          const klass = this.image.tryClass(this.fullName)?.asNullable();
          return klass?.equals(this) ? null : klass ?? null;
        }
        /** Gets the generics parameters of this generic class. */
        get generics() {
          if (!this.isGeneric && !this.isInflated) {
            return [];
          }
          const types = this.type.object.method("GetGenericArguments").invoke();
          return globalThis.Array.from(types).map(_ => new Il2Cpp3.Class(Il2Cpp3.exports.classFromObject(_)));
        }
        /** Determines whether the GC has tracking references to the current class instances. */
        get hasReferences() {
          return !!Il2Cpp3.exports.classHasReferences(this);
        }
        /** Determines whether ther current class has a valid static constructor. */
        get hasStaticConstructor() {
          const staticConstructor = this.tryMethod(".cctor");
          return staticConstructor != null && !staticConstructor.virtualAddress.isNull();
        }
        /** Gets the image in which the current class is defined. */
        get image() {
          return new Il2Cpp3.Image(Il2Cpp3.exports.classGetImage(this));
        }
        /** Gets the size of the instance of the current class. */
        get instanceSize() {
          return Il2Cpp3.exports.classGetInstanceSize(this);
        }
        /** Determines whether the current class is abstract. */
        get isAbstract() {
          return !!Il2Cpp3.exports.classIsAbstract(this);
        }
        /** Determines whether the current class is blittable. */
        get isBlittable() {
          return !!Il2Cpp3.exports.classIsBlittable(this);
        }
        /** Determines whether the current class is an enumeration. */
        get isEnum() {
          return !!Il2Cpp3.exports.classIsEnum(this);
        }
        /** Determines whether the current class is a generic one. */
        get isGeneric() {
          return !!Il2Cpp3.exports.classIsGeneric(this);
        }
        /** Determines whether the current class is inflated. */
        get isInflated() {
          return !!Il2Cpp3.exports.classIsInflated(this);
        }
        /** Determines whether the current class is an interface. */
        get isInterface() {
          return !!Il2Cpp3.exports.classIsInterface(this);
        }
        /** Determines whether the current class is a struct. */
        get isStruct() {
          return this.isValueType && !this.isEnum;
        }
        /** Determines whether the current class is a value type. */
        get isValueType() {
          return !!Il2Cpp3.exports.classIsValueType(this);
        }
        /** Gets the interfaces implemented or inherited by the current class. */
        get interfaces() {
          return readNativeIterator(_ => Il2Cpp3.exports.classGetInterfaces(this, _)).map(_ => new Il2Cpp3.Class(_));
        }
        /** Gets the methods implemented by the current class. */
        get methods() {
          return readNativeIterator(_ => Il2Cpp3.exports.classGetMethods(this, _)).map(_ => new Il2Cpp3.Method(_));
        }
        /** Gets the name of the current class. */
        get name() {
          return Il2Cpp3.exports.classGetName(this).readUtf8String();
        }
        /** Gets the namespace of the current class. */
        get namespace() {
          return Il2Cpp3.exports.classGetNamespace(this).readUtf8String() || void 0;
        }
        /** Gets the classes nested inside the current class. */
        get nestedClasses() {
          return readNativeIterator(_ => Il2Cpp3.exports.classGetNestedClasses(this, _)).map(_ => new Il2Cpp3.Class(_));
        }
        /** Gets the class from which the current class directly inherits. */
        get parent() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.classGetParent(this)).asNullable();
        }
        /** Gets the pointer class of the current class. */
        get pointerClass() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.classFromObject(this.type.object.method("MakePointerType").invoke()));
        }
        /** Gets the rank (number of dimensions) of the current array class. */
        get rank() {
          let rank = 0;
          const name = this.name;
          for (let i = this.name.length - 1; i > 0; i--) {
            const c = name[i];
            if (c == "]") rank++;else if (c == "[" || rank == 0) break;else if (c == ",") rank++;else break;
          }
          return rank;
        }
        /** Gets a pointer to the static fields of the current class. */
        get staticFieldsData() {
          return Il2Cpp3.exports.classGetStaticFieldData(this);
        }
        /** Gets the size of the instance - as a value type - of the current class. */
        get valueTypeSize() {
          return Il2Cpp3.exports.classGetValueTypeSize(this, NULL);
        }
        /** Gets the type of the current class. */
        get type() {
          return new Il2Cpp3.Type(Il2Cpp3.exports.classGetType(this));
        }
        /** Allocates a new object of the current class. */
        alloc() {
          return new Il2Cpp3.Object(Il2Cpp3.exports.objectNew(this));
        }
        /** Gets the field identified by the given name. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find field ${name} in class ${this.type.name}`);
        }
        /** Gets the hierarchy of the current class. */
        *hierarchy(options) {
          let klass = options?.includeCurrent ?? true ? this : this.parent;
          while (klass) {
            yield klass;
            klass = klass.parent;
          }
        }
        /** Builds a generic instance of the current generic class. */
        inflate(...classes) {
          if (!this.isGeneric) {
            raise(`cannot inflate class ${this.type.name} as it has no generic parameters`);
          }
          if (this.generics.length != classes.length) {
            raise(`cannot inflate class ${this.type.name} as it needs ${this.generics.length} generic parameter(s), not ${classes.length}`);
          }
          const types = classes.map(_ => _.type.object);
          const typeArray = Il2Cpp3.array(Il2Cpp3.corlib.class("System.Type"), types);
          const inflatedType = this.type.object.method("MakeGenericType", 1).invoke(typeArray);
          return new Il2Cpp3.Class(Il2Cpp3.exports.classFromObject(inflatedType));
        }
        /** Calls the static constructor of the current class. */
        initialize() {
          Il2Cpp3.exports.classInitialize(this);
          return this;
        }
        /** Determines whether an instance of `other` class can be assigned to a variable of the current type. */
        isAssignableFrom(other) {
          return !!Il2Cpp3.exports.classIsAssignableFrom(this, other);
        }
        /** Determines whether the current class derives from `other` class. */
        isSubclassOf(other, checkInterfaces) {
          return !!Il2Cpp3.exports.classIsSubclassOf(this, other, +checkInterfaces);
        }
        /** Gets the method identified by the given name and parameter count. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find method ${name} in class ${this.type.name}`);
        }
        /** Gets the nested class with the given name. */
        nested(name) {
          return this.tryNested(name) ?? raise(`couldn't find nested class ${name} in class ${this.type.name}`);
        }
        /** Allocates a new object of the current class and calls its default constructor. */
        new() {
          const object = this.alloc();
          const exceptionArray = Memory.alloc(Process.pointerSize);
          Il2Cpp3.exports.objectInitialize(object, exceptionArray);
          const exception = exceptionArray.readPointer();
          if (!exception.isNull()) {
            raise(new Il2Cpp3.Object(exception).toString());
          }
          return object;
        }
        /** Gets the field with the given name. */
        tryField(name) {
          return new Il2Cpp3.Field(Il2Cpp3.exports.classGetFieldFromName(this, Memory.allocUtf8String(name))).asNullable();
        }
        /** Gets the method with the given name and parameter count. */
        tryMethod(name, parameterCount = -1) {
          return new Il2Cpp3.Method(Il2Cpp3.exports.classGetMethodFromName(this, Memory.allocUtf8String(name), parameterCount)).asNullable();
        }
        /** Gets the nested class with the given name. */
        tryNested(name) {
          return this.nestedClasses.find(_ => _.name == name);
        }
        /** */
        toString() {
          const inherited = [this.parent].concat(this.interfaces);
          return `// ${this.assemblyName}
${this.isEnum ? `enum` : this.isStruct ? `struct` : this.isInterface ? `interface` : `class`} ${this.type.name}${inherited ? ` : ${inherited.map(_ => _?.type.name).join(`, `)}` : ``}
{
    ${this.fields.join(`
    `)}
    ${this.methods.join(`
    `)}
}`;
        }
        /** Executes a callback for every defined class. */
        static enumerate(block) {
          const callback = new NativeCallback(_ => block(new Il2Cpp3.Class(_)), "void", ["pointer", "pointer"]);
          return Il2Cpp3.exports.classForEach(callback, NULL);
        }
      };
      __decorate([lazy], Class.prototype, "arrayClass", null);
      __decorate([lazy], Class.prototype, "arrayElementSize", null);
      __decorate([lazy], Class.prototype, "assemblyName", null);
      __decorate([lazy], Class.prototype, "declaringClass", null);
      __decorate([lazy], Class.prototype, "baseType", null);
      __decorate([lazy], Class.prototype, "elementClass", null);
      __decorate([lazy], Class.prototype, "fields", null);
      __decorate([lazy], Class.prototype, "flags", null);
      __decorate([lazy], Class.prototype, "fullName", null);
      __decorate([lazy], Class.prototype, "generics", null);
      __decorate([lazy], Class.prototype, "hasReferences", null);
      __decorate([lazy], Class.prototype, "hasStaticConstructor", null);
      __decorate([lazy], Class.prototype, "image", null);
      __decorate([lazy], Class.prototype, "instanceSize", null);
      __decorate([lazy], Class.prototype, "isAbstract", null);
      __decorate([lazy], Class.prototype, "isBlittable", null);
      __decorate([lazy], Class.prototype, "isEnum", null);
      __decorate([lazy], Class.prototype, "isGeneric", null);
      __decorate([lazy], Class.prototype, "isInflated", null);
      __decorate([lazy], Class.prototype, "isInterface", null);
      __decorate([lazy], Class.prototype, "isValueType", null);
      __decorate([lazy], Class.prototype, "interfaces", null);
      __decorate([lazy], Class.prototype, "methods", null);
      __decorate([lazy], Class.prototype, "name", null);
      __decorate([lazy], Class.prototype, "namespace", null);
      __decorate([lazy], Class.prototype, "nestedClasses", null);
      __decorate([lazy], Class.prototype, "parent", null);
      __decorate([lazy], Class.prototype, "pointerClass", null);
      __decorate([lazy], Class.prototype, "rank", null);
      __decorate([lazy], Class.prototype, "staticFieldsData", null);
      __decorate([lazy], Class.prototype, "valueTypeSize", null);
      __decorate([lazy], Class.prototype, "type", null);
      Class = __decorate([recycle], Class);
      Il2Cpp3.Class = Class;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      function delegate(klass, block) {
        const SystemDelegate = Il2Cpp3.corlib.class("System.Delegate");
        const SystemMulticastDelegate = Il2Cpp3.corlib.class("System.MulticastDelegate");
        if (!SystemDelegate.isAssignableFrom(klass)) {
          raise(`cannot create a delegate for ${klass.type.name} as it's a non-delegate class`);
        }
        if (klass.equals(SystemDelegate) || klass.equals(SystemMulticastDelegate)) {
          raise(`cannot create a delegate for neither ${SystemDelegate.type.name} nor ${SystemMulticastDelegate.type.name}, use a subclass instead`);
        }
        const delegate2 = klass.alloc();
        const key = delegate2.handle.toString();
        const Invoke = delegate2.tryMethod("Invoke") ?? raise(`cannot create a delegate for ${klass.type.name}, there is no Invoke method`);
        delegate2.method(".ctor").invoke(delegate2, Invoke.handle);
        const callback = Invoke.wrap(block);
        delegate2.field("method_ptr").value = callback;
        delegate2.field("invoke_impl").value = callback;
        Il2Cpp3._callbacksToKeepAlive[key] = callback;
        return delegate2;
      }
      Il2Cpp3.delegate = delegate;
      Il2Cpp3._callbacksToKeepAlive = {};
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      let Domain = class Domain extends NativeStruct {
        /** Gets the assemblies that have been loaded into the execution context of the application domain. */
        get assemblies() {
          let handles = readNativeList(_ => Il2Cpp3.exports.domainGetAssemblies(this, _));
          if (handles.length == 0) {
            const assemblyObjects = this.object.method("GetAssemblies").overload().invoke();
            handles = globalThis.Array.from(assemblyObjects).map(_ => _.field("_mono_assembly").value);
          }
          return handles.map(_ => new Il2Cpp3.Assembly(_));
        }
        /** Gets the encompassing object of the application domain. */
        get object() {
          return Il2Cpp3.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
        }
        /** Opens and loads the assembly with the given name. */
        assembly(name) {
          return this.tryAssembly(name) ?? raise(`couldn't find assembly ${name}`);
        }
        /** Attached a new thread to the application domain. */
        attach() {
          return new Il2Cpp3.Thread(Il2Cpp3.exports.threadAttach(this));
        }
        /** Opens and loads the assembly with the given name. */
        tryAssembly(name) {
          return new Il2Cpp3.Assembly(Il2Cpp3.exports.domainGetAssemblyFromName(this, Memory.allocUtf8String(name))).asNullable();
        }
      };
      __decorate([lazy], Domain.prototype, "assemblies", null);
      __decorate([lazy], Domain.prototype, "object", null);
      Domain = __decorate([recycle], Domain);
      Il2Cpp3.Domain = Domain;
      getter(Il2Cpp3, "domain", () => {
        return new Il2Cpp3.Domain(Il2Cpp3.exports.domainGet());
      }, lazy);
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Field extends NativeStruct {
        /** Gets the class in which this field is defined. */
        get class() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.fieldGetClass(this));
        }
        /** Gets the flags of the current field. */
        get flags() {
          return Il2Cpp3.exports.fieldGetFlags(this);
        }
        /** Determines whether this field value is known at compile time. */
        get isLiteral() {
          return (this.flags & 64) != 0;
        }
        /** Determines whether this field is static. */
        get isStatic() {
          return (this.flags & 16) != 0;
        }
        /** Determines whether this field is thread static. */
        get isThreadStatic() {
          const offset = Il2Cpp3.corlib.class("System.AppDomain").field("type_resolve_in_progress").offset;
          getter(Il2Cpp3.Field.prototype, "isThreadStatic", function () {
            return this.offset == offset;
          }, lazy);
          return this.isThreadStatic;
        }
        /** Gets the access modifier of this field. */
        get modifier() {
          switch (this.flags & 7) {
            case 1:
              return "private";
            case 2:
              return "private protected";
            case 3:
              return "internal";
            case 4:
              return "protected";
            case 5:
              return "protected internal";
            case 6:
              return "public";
          }
        }
        /** Gets the name of this field. */
        get name() {
          return Il2Cpp3.exports.fieldGetName(this).readUtf8String();
        }
        /** Gets the offset of this field, calculated as the difference with its owner virtual address. */
        get offset() {
          return Il2Cpp3.exports.fieldGetOffset(this);
        }
        /** Gets the type of this field. */
        get type() {
          return new Il2Cpp3.Type(Il2Cpp3.exports.fieldGetType(this));
        }
        /** Gets the value of this field. */
        get value() {
          if (!this.isStatic) {
            raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
          }
          const handle = Memory.alloc(Process.pointerSize);
          Il2Cpp3.exports.fieldGetStaticValue(this.handle, handle);
          return Il2Cpp3.read(handle, this.type);
        }
        /** Sets the value of this field. Thread static or literal values cannot be altered yet. */
        set value(value) {
          if (!this.isStatic) {
            raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
          }
          if (this.isThreadStatic || this.isLiteral) {
            raise(`cannot write the value of field ${this.name} as it's thread static or literal`);
          }
          const handle =
          // pointer-like values should be passed as-is, but boxed
          // value types (primitives included) must be unboxed first
          value instanceof Il2Cpp3.Object && this.type.class.isValueType ? value.unbox() : value instanceof NativeStruct ? value.handle : value instanceof NativePointer ? value : Il2Cpp3.write(Memory.alloc(this.type.class.valueTypeSize), value, this.type);
          Il2Cpp3.exports.fieldSetStaticValue(this.handle, handle);
        }
        /** */
        toString() {
          return `${this.isThreadStatic ? `[ThreadStatic] ` : ``}${this.isStatic ? `static ` : ``}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? Il2Cpp3.read(this.value.handle, this.type.class.baseType) : this.value}` : ``};${this.isThreadStatic || this.isLiteral ? `` : ` // 0x${this.offset.toString(16)}`}`;
        }
        /**
         * @internal
         * Binds the current field to a {@link Il2Cpp.Object} or a
         * {@link Il2Cpp.ValueType} (also known as *instances*), so that it is
         * possible to retrieve its value - see {@link Il2Cpp.Field.value} for
         * details. \
         * Binding a static field is forbidden.
         */
        bind(instance) {
          if (this.isStatic) {
            raise(`cannot bind static field ${this.class.type.name}::${this.name} to an instance`);
          }
          const offset = this.offset - (instance instanceof Il2Cpp3.ValueType ? Il2Cpp3.Object.headerSize : 0);
          return new Proxy(this, {
            get(target, property) {
              if (property == "value") {
                return Il2Cpp3.read(instance.handle.add(offset), target.type);
              }
              return Reflect.get(target, property);
            },
            set(target, property, value) {
              if (property == "value") {
                Il2Cpp3.write(instance.handle.add(offset), value, target.type);
                return true;
              }
              return Reflect.set(target, property, value);
            }
          });
        }
      }
      __decorate([lazy], Field.prototype, "class", null);
      __decorate([lazy], Field.prototype, "flags", null);
      __decorate([lazy], Field.prototype, "isLiteral", null);
      __decorate([lazy], Field.prototype, "isStatic", null);
      __decorate([lazy], Field.prototype, "isThreadStatic", null);
      __decorate([lazy], Field.prototype, "modifier", null);
      __decorate([lazy], Field.prototype, "name", null);
      __decorate([lazy], Field.prototype, "offset", null);
      __decorate([lazy], Field.prototype, "type", null);
      Il2Cpp3.Field = Field;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class GCHandle {
        handle;
        /** @internal */
        constructor(handle) {
          this.handle = handle;
        }
        /** Gets the object associated to this handle. */
        get target() {
          return new Il2Cpp3.Object(Il2Cpp3.exports.gcHandleGetTarget(this.handle)).asNullable();
        }
        /** Frees this handle. */
        free() {
          return Il2Cpp3.exports.gcHandleFree(this.handle);
        }
      }
      Il2Cpp3.GCHandle = GCHandle;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      let Image = class Image extends NativeStruct {
        /** Gets the assembly in which the current image is defined. */
        get assembly() {
          return new Il2Cpp3.Assembly(Il2Cpp3.exports.imageGetAssembly(this));
        }
        /** Gets the amount of classes defined in this image. */
        get classCount() {
          if (Il2Cpp3.unityVersionIsBelow201830) {
            return this.classes.length;
          } else {
            return Il2Cpp3.exports.imageGetClassCount(this);
          }
        }
        /** Gets the classes defined in this image. */
        get classes() {
          if (Il2Cpp3.unityVersionIsBelow201830) {
            const types = this.assembly.object.method("GetTypes").invoke(false);
            const classes = globalThis.Array.from(types, _ => new Il2Cpp3.Class(Il2Cpp3.exports.classFromObject(_)));
            const Module = this.tryClass("<Module>");
            if (Module) {
              classes.unshift(Module);
            }
            return classes;
          } else {
            return globalThis.Array.from(globalThis.Array(this.classCount), (_, i) => new Il2Cpp3.Class(Il2Cpp3.exports.imageGetClass(this, i)));
          }
        }
        /** Gets the name of this image. */
        get name() {
          return Il2Cpp3.exports.imageGetName(this).readUtf8String();
        }
        /** Gets the class with the specified name defined in this image. */
        class(name) {
          return this.tryClass(name) ?? raise(`couldn't find class ${name} in assembly ${this.name}`);
        }
        /** Gets the class with the specified name defined in this image. */
        tryClass(name) {
          const dotIndex = name.lastIndexOf(".");
          const classNamespace = Memory.allocUtf8String(dotIndex == -1 ? "" : name.slice(0, dotIndex));
          const className = Memory.allocUtf8String(name.slice(dotIndex + 1));
          return new Il2Cpp3.Class(Il2Cpp3.exports.classFromName(this, classNamespace, className)).asNullable();
        }
      };
      __decorate([lazy], Image.prototype, "assembly", null);
      __decorate([lazy], Image.prototype, "classCount", null);
      __decorate([lazy], Image.prototype, "classes", null);
      __decorate([lazy], Image.prototype, "name", null);
      Image = __decorate([recycle], Image);
      Il2Cpp3.Image = Image;
      getter(Il2Cpp3, "corlib", () => {
        return new Il2Cpp3.Image(Il2Cpp3.exports.getCorlib());
      }, lazy);
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class MemorySnapshot extends NativeStruct {
        /** Captures a memory snapshot. */
        static capture() {
          return new Il2Cpp3.MemorySnapshot();
        }
        /** Creates a memory snapshot with the given handle. */
        constructor(handle = Il2Cpp3.exports.memorySnapshotCapture()) {
          super(handle);
        }
        /** Gets any initialized class. */
        get classes() {
          return readNativeIterator(_ => Il2Cpp3.exports.memorySnapshotGetClasses(this, _)).map(_ => new Il2Cpp3.Class(_));
        }
        /** Gets the objects tracked by this memory snapshot. */
        get objects() {
          return readNativeList(_ => Il2Cpp3.exports.memorySnapshotGetObjects(this, _)).filter(_ => !_.isNull()).map(_ => new Il2Cpp3.Object(_));
        }
        /** Frees this memory snapshot. */
        free() {
          Il2Cpp3.exports.memorySnapshotFree(this);
        }
      }
      __decorate([lazy], MemorySnapshot.prototype, "classes", null);
      __decorate([lazy], MemorySnapshot.prototype, "objects", null);
      Il2Cpp3.MemorySnapshot = MemorySnapshot;
      function memorySnapshot(block) {
        const memorySnapshot2 = Il2Cpp3.MemorySnapshot.capture();
        const result = block(memorySnapshot2);
        memorySnapshot2.free();
        return result;
      }
      Il2Cpp3.memorySnapshot = memorySnapshot;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Method extends NativeStruct {
        /** Gets the class in which this method is defined. */
        get class() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.methodGetClass(this));
        }
        /** Gets the flags of the current method. */
        get flags() {
          return Il2Cpp3.exports.methodGetFlags(this, NULL);
        }
        /** Gets the implementation flags of the current method. */
        get implementationFlags() {
          const implementationFlagsPointer = Memory.alloc(Process.pointerSize);
          Il2Cpp3.exports.methodGetFlags(this, implementationFlagsPointer);
          return implementationFlagsPointer.readU32();
        }
        /** */
        get fridaSignature() {
          const types = [];
          for (const parameter of this.parameters) {
            types.push(parameter.type.fridaAlias);
          }
          if (!this.isStatic || Il2Cpp3.unityVersionIsBelow201830) {
            types.unshift("pointer");
          }
          if (this.isInflated) {
            types.push("pointer");
          }
          return types;
        }
        /** Gets the generic parameters of this generic method. */
        get generics() {
          if (!this.isGeneric) {
            return [];
          }
          const types = this.object.method("GetGenericArguments").invoke();
          return globalThis.Array.from(types).map(_ => new Il2Cpp3.Class(Il2Cpp3.exports.classFromObject(_)));
        }
        /** Determines whether this method is external. */
        get isExternal() {
          return (this.implementationFlags & 4096) != 0;
        }
        /** Determines whether this method is generic. */
        get isGeneric() {
          return !!Il2Cpp3.exports.methodIsGeneric(this);
        }
        /** Determines whether this method is inflated (generic with a concrete type parameter). */
        get isInflated() {
          return !!Il2Cpp3.exports.methodIsInflated(this);
        }
        /** Determines whether this method is static. */
        get isStatic() {
          return !Il2Cpp3.exports.methodIsInstance(this);
        }
        /** Determines whether this method is synchronized. */
        get isSynchronized() {
          return (this.implementationFlags & 32) != 0;
        }
        /** Gets the access modifier of this method. */
        get modifier() {
          switch (this.flags & 7) {
            case 1:
              return "private";
            case 2:
              return "private protected";
            case 3:
              return "internal";
            case 4:
              return "protected";
            case 5:
              return "protected internal";
            case 6:
              return "public";
          }
        }
        /** Gets the name of this method. */
        get name() {
          return Il2Cpp3.exports.methodGetName(this).readUtf8String();
        }
        /** @internal */
        get nativeFunction() {
          return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
        }
        /** Gets the encompassing object of the current method. */
        get object() {
          return new Il2Cpp3.Object(Il2Cpp3.exports.methodGetObject(this, NULL));
        }
        /** Gets the amount of parameters of this method. */
        get parameterCount() {
          return Il2Cpp3.exports.methodGetParameterCount(this);
        }
        /** Gets the parameters of this method. */
        get parameters() {
          return globalThis.Array.from(globalThis.Array(this.parameterCount), (_, i) => {
            const parameterName = Il2Cpp3.exports.methodGetParameterName(this, i).readUtf8String();
            const parameterType = Il2Cpp3.exports.methodGetParameterType(this, i);
            return new Il2Cpp3.Parameter(parameterName, i, new Il2Cpp3.Type(parameterType));
          });
        }
        /** Gets the relative virtual address (RVA) of this method. */
        get relativeVirtualAddress() {
          return this.virtualAddress.sub(Il2Cpp3.module.base);
        }
        /** Gets the return type of this method. */
        get returnType() {
          return new Il2Cpp3.Type(Il2Cpp3.exports.methodGetReturnType(this));
        }
        /** Gets the virtual address (VA) of this method. */
        get virtualAddress() {
          const FilterTypeName = Il2Cpp3.corlib.class("System.Reflection.Module").initialize().field("FilterTypeName").value;
          const FilterTypeNameMethodPointer = FilterTypeName.field("method_ptr").value;
          const FilterTypeNameMethod = FilterTypeName.field("method").value;
          const offset = FilterTypeNameMethod.offsetOf(_ => _.readPointer().equals(FilterTypeNameMethodPointer)) ?? raise("couldn't find the virtual address offset in the native method struct");
          getter(Il2Cpp3.Method.prototype, "virtualAddress", function () {
            return this.handle.add(offset).readPointer();
          }, lazy);
          Il2Cpp3.corlib.class("System.Reflection.Module").method(".cctor").invoke();
          return this.virtualAddress;
        }
        /** Replaces the body of this method. */
        set implementation(block) {
          try {
            Interceptor.replace(this.virtualAddress, this.wrap(block));
          } catch (e) {
            switch (e.message) {
              case "access violation accessing 0x0":
                raise(`couldn't set implementation for method ${this.name} as it has a NULL virtual address`);
              case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
                warn(`couldn't set implementation for method ${this.name} as it may be a thunk`);
                break;
              case "already replaced this function":
                warn(`couldn't set implementation for method ${this.name} as it has already been replaced by a thunk`);
                break;
              default:
                throw e;
            }
          }
        }
        /** Creates a generic instance of the current generic method. */
        inflate(...classes) {
          if (!this.isGeneric || this.generics.length != classes.length) {
            for (const method of this.overloads()) {
              if (method.isGeneric && method.generics.length == classes.length) {
                return method.inflate(...classes);
              }
            }
            raise(`could not find inflatable signature of method ${this.name} with ${classes.length} generic parameter(s)`);
          }
          const types = classes.map(_ => _.type.object);
          const typeArray = Il2Cpp3.array(Il2Cpp3.corlib.class("System.Type"), types);
          const inflatedMethodObject = this.object.method("MakeGenericMethod", 1).invoke(typeArray);
          return new Il2Cpp3.Method(inflatedMethodObject.field("mhandle").value);
        }
        /** Invokes this method. */
        invoke(...parameters) {
          if (!this.isStatic) {
            raise(`cannot invoke non-static method ${this.name} as it must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`);
          }
          return this.invokeRaw(NULL, ...parameters);
        }
        /** @internal */
        invokeRaw(instance, ...parameters) {
          const allocatedParameters = parameters.map(Il2Cpp3.toFridaValue);
          if (!this.isStatic || Il2Cpp3.unityVersionIsBelow201830) {
            allocatedParameters.unshift(instance);
          }
          if (this.isInflated) {
            allocatedParameters.push(this.handle);
          }
          try {
            const returnValue = this.nativeFunction(...allocatedParameters);
            return Il2Cpp3.fromFridaValue(returnValue, this.returnType);
          } catch (e) {
            if (e == null) {
              raise("an unexpected native invocation exception occurred, this is due to parameter types mismatch");
            }
            switch (e.message) {
              case "bad argument count":
                raise(`couldn't invoke method ${this.name} as it needs ${this.parameterCount} parameter(s), not ${parameters.length}`);
              case "expected a pointer":
              case "expected number":
              case "expected array with fields":
                raise(`couldn't invoke method ${this.name} using incorrect parameter types`);
            }
            throw e;
          }
        }
        /** Gets the overloaded method with the given parameter types. */
        overload(...typeNamesOrClasses) {
          const method = this.tryOverload(...typeNamesOrClasses);
          return method ?? raise(`couldn't find overloaded method ${this.name}(${typeNamesOrClasses.map(_ => _ instanceof Il2Cpp3.Class ? _.type.name : _)})`);
        }
        /** @internal */
        *overloads() {
          for (const klass of this.class.hierarchy()) {
            for (const method of klass.methods) {
              if (this.name == method.name) {
                yield method;
              }
            }
          }
        }
        /** Gets the parameter with the given name. */
        parameter(name) {
          return this.tryParameter(name) ?? raise(`couldn't find parameter ${name} in method ${this.name}`);
        }
        /** Restore the original method implementation. */
        revert() {
          Interceptor.revert(this.virtualAddress);
          Interceptor.flush();
        }
        /** Gets the overloaded method with the given parameter types. */
        tryOverload(...typeNamesOrClasses) {
          const minScore = typeNamesOrClasses.length * 1;
          const maxScore = typeNamesOrClasses.length * 2;
          let candidate = void 0;
          loop: for (const method of this.overloads()) {
            if (method.parameterCount != typeNamesOrClasses.length) continue;
            let score = 0;
            let i = 0;
            for (const parameter of method.parameters) {
              const desiredTypeNameOrClass = typeNamesOrClasses[i];
              if (desiredTypeNameOrClass instanceof Il2Cpp3.Class) {
                if (parameter.type.is(desiredTypeNameOrClass.type)) {
                  score += 2;
                } else if (parameter.type.class.isAssignableFrom(desiredTypeNameOrClass)) {
                  score += 1;
                } else {
                  continue loop;
                }
              } else if (parameter.type.name == desiredTypeNameOrClass) {
                score += 2;
              } else {
                continue loop;
              }
              i++;
            }
            if (score < minScore) {
              continue;
            } else if (score == maxScore) {
              return method;
            } else if (candidate == void 0 || score > candidate[0]) {
              candidate = [score, method];
            } else if (score == candidate[0]) {
              let i2 = 0;
              for (const parameter of candidate[1].parameters) {
                if (parameter.type.class.isAssignableFrom(method.parameters[i2].type.class)) {
                  candidate = [score, method];
                  continue loop;
                }
                i2++;
              }
            }
          }
          return candidate?.[1];
        }
        /** Gets the parameter with the given name. */
        tryParameter(name) {
          return this.parameters.find(_ => _.name == name);
        }
        /** */
        toString() {
          return `${this.isStatic ? `static ` : ``}${this.returnType.name} ${this.name}${this.generics.length > 0 ? `<${this.generics.map(_ => _.type.name).join(",")}>` : ""}(${this.parameters.join(`, `)});${this.virtualAddress.isNull() ? `` : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, `0`)}`}`;
        }
        /**
         * @internal
         * Binds the current method to a {@link Il2Cpp.Object} or a
         * {@link Il2Cpp.ValueType} (also known as *instances*), so that it is
         * possible to invoke it - see {@link Il2Cpp.Method.invoke} for
         * details. \
         * Binding a static method is forbidden.
         */
        bind(instance) {
          if (this.isStatic) {
            raise(`cannot bind static method ${this.class.type.name}::${this.name} to an instance`);
          }
          return new Proxy(this, {
            get(target, property, receiver) {
              switch (property) {
                case "invoke":
                  const handle = instance instanceof Il2Cpp3.ValueType ? target.class.isValueType ? instance.handle.sub(structMethodsRequireObjectInstances() ? Il2Cpp3.Object.headerSize : 0) : raise(`cannot invoke method ${target.class.type.name}::${target.name} against a value type, you must box it first`) : target.class.isValueType ? instance.handle.add(structMethodsRequireObjectInstances() ? 0 : Il2Cpp3.Object.headerSize) : instance.handle;
                  return target.invokeRaw.bind(target, handle);
                case "overloads":
                  return function* () {
                    for (const method of target[property]()) {
                      if (!method.isStatic) {
                        yield method;
                      }
                    }
                  };
                case "inflate":
                case "overload":
                case "tryOverload":
                  const member = Reflect.get(target, property).bind(receiver);
                  return function (...args) {
                    return member(...args)?.bind(instance);
                  };
              }
              return Reflect.get(target, property);
            }
          });
        }
        /** @internal */
        wrap(block) {
          const startIndex = +!this.isStatic | +Il2Cpp3.unityVersionIsBelow201830;
          return new NativeCallback((...args) => {
            const thisObject = this.isStatic ? this.class : this.class.isValueType ? new Il2Cpp3.ValueType(args[0].add(structMethodsRequireObjectInstances() ? Il2Cpp3.Object.headerSize : 0), this.class.type) : new Il2Cpp3.Object(args[0]);
            const parameters = this.parameters.map((_, i) => Il2Cpp3.fromFridaValue(args[i + startIndex], _.type));
            const result = block.call(thisObject, ...parameters);
            return Il2Cpp3.toFridaValue(result);
          }, this.returnType.fridaAlias, this.fridaSignature);
        }
      }
      __decorate([lazy], Method.prototype, "class", null);
      __decorate([lazy], Method.prototype, "flags", null);
      __decorate([lazy], Method.prototype, "implementationFlags", null);
      __decorate([lazy], Method.prototype, "fridaSignature", null);
      __decorate([lazy], Method.prototype, "generics", null);
      __decorate([lazy], Method.prototype, "isExternal", null);
      __decorate([lazy], Method.prototype, "isGeneric", null);
      __decorate([lazy], Method.prototype, "isInflated", null);
      __decorate([lazy], Method.prototype, "isStatic", null);
      __decorate([lazy], Method.prototype, "isSynchronized", null);
      __decorate([lazy], Method.prototype, "modifier", null);
      __decorate([lazy], Method.prototype, "name", null);
      __decorate([lazy], Method.prototype, "nativeFunction", null);
      __decorate([lazy], Method.prototype, "object", null);
      __decorate([lazy], Method.prototype, "parameterCount", null);
      __decorate([lazy], Method.prototype, "parameters", null);
      __decorate([lazy], Method.prototype, "relativeVirtualAddress", null);
      __decorate([lazy], Method.prototype, "returnType", null);
      Il2Cpp3.Method = Method;
      let structMethodsRequireObjectInstances = () => {
        const object = Il2Cpp3.corlib.class("System.Int64").alloc();
        object.field("m_value").value = 3735928559;
        const result = object.method("Equals", 1).overload(object.class).invokeRaw(object, 3735928559);
        return (structMethodsRequireObjectInstances = () => result)();
      };
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Object2 extends NativeStruct {
        /** Gets the Il2CppObject struct size, possibly equal to `Process.pointerSize * 2`. */
        static get headerSize() {
          return Il2Cpp3.corlib.class("System.Object").instanceSize;
        }
        /**
         * Returns the same object, but having its parent class as class.
         * It basically is the C# `base` keyword, so that parent members can be
         * accessed.
         *
         * **Example** \
         * Consider the following classes:
         * ```csharp
         * class Foo
         * {
         *     int foo()
         *     {
         *          return 1;
         *     }
         * }
         * class Bar : Foo
         * {
         *     new int foo()
         *     {
         *          return 2;
         *     }
         * }
         * ```
         * then:
         * ```ts
         * const Bar: Il2Cpp.Class = ...;
         * const bar = Bar.new();
         *
         * console.log(bar.foo()); // 2
         * console.log(bar.base.foo()); // 1
         * ```
         */
        get base() {
          if (this.class.parent == null) {
            raise(`class ${this.class.type.name} has no parent`);
          }
          return new Proxy(this, {
            get(target, property, receiver) {
              if (property == "class") {
                return Reflect.get(target, property).parent;
              } else if (property == "base") {
                return Reflect.getOwnPropertyDescriptor(Il2Cpp3.Object.prototype, property).get.bind(receiver)();
              }
              return Reflect.get(target, property);
            }
          });
        }
        /** Gets the class of this object. */
        get class() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.objectGetClass(this));
        }
        /** Returns a monitor for this object. */
        get monitor() {
          return new Il2Cpp3.Object.Monitor(this);
        }
        /** Gets the size of the current object. */
        get size() {
          return Il2Cpp3.exports.objectGetSize(this);
        }
        /** Gets the non-static field with the given name of the current class hierarchy. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find non-static field ${name} in hierarchy of class ${this.class.type.name}`);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find non-static method ${name} in hierarchy of class ${this.class.type.name}`);
        }
        /** Creates a reference to this object. */
        ref(pin) {
          return new Il2Cpp3.GCHandle(Il2Cpp3.exports.gcHandleNew(this, +pin));
        }
        /** Gets the correct virtual method from the given virtual method. */
        virtualMethod(method) {
          return new Il2Cpp3.Method(Il2Cpp3.exports.objectGetVirtualMethod(this, method)).bind(this);
        }
        /** Gets the non-static field with the given name of the current class hierarchy, if it exists. */
        tryField(name) {
          const field = this.class.tryField(name);
          if (field?.isStatic) {
            for (const klass of this.class.hierarchy({
              includeCurrent: false
            })) {
              for (const field2 of klass.fields) {
                if (field2.name == name && !field2.isStatic) {
                  return field2.bind(this);
                }
              }
            }
            return void 0;
          }
          return field?.bind(this);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy, if it exists. */
        tryMethod(name, parameterCount = -1) {
          const method = this.class.tryMethod(name, parameterCount);
          if (method?.isStatic) {
            for (const klass of this.class.hierarchy()) {
              for (const method2 of klass.methods) {
                if (method2.name == name && !method2.isStatic && (parameterCount < 0 || method2.parameterCount == parameterCount)) {
                  return method2.bind(this);
                }
              }
            }
            return void 0;
          }
          return method?.bind(this);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : this.method("ToString", 0).invoke().content ?? "null";
        }
        /** Unboxes the value type (either a primitive, a struct or an enum) out of this object. */
        unbox() {
          return this.class.isValueType ? new Il2Cpp3.ValueType(Il2Cpp3.exports.objectUnbox(this), this.class.type) : raise(`couldn't unbox instances of ${this.class.type.name} as they are not value types`);
        }
        /** Creates a weak reference to this object. */
        weakRef(trackResurrection) {
          return new Il2Cpp3.GCHandle(Il2Cpp3.exports.gcHandleNewWeakRef(this, +trackResurrection));
        }
      }
      __decorate([lazy], Object2.prototype, "class", null);
      __decorate([lazy], Object2.prototype, "size", null);
      __decorate([lazy], Object2, "headerSize", null);
      Il2Cpp3.Object = Object2;
      (function (Object3) {
        class Monitor {
          handle;
          /** @internal */
          constructor(handle) {
            this.handle = handle;
          }
          /** Acquires an exclusive lock on the current object. */
          enter() {
            return Il2Cpp3.exports.monitorEnter(this.handle);
          }
          /** Release an exclusive lock on the current object. */
          exit() {
            return Il2Cpp3.exports.monitorExit(this.handle);
          }
          /** Notifies a thread in the waiting queue of a change in the locked object's state. */
          pulse() {
            return Il2Cpp3.exports.monitorPulse(this.handle);
          }
          /** Notifies all waiting threads of a change in the object's state. */
          pulseAll() {
            return Il2Cpp3.exports.monitorPulseAll(this.handle);
          }
          /** Attempts to acquire an exclusive lock on the current object. */
          tryEnter(timeout) {
            return !!Il2Cpp3.exports.monitorTryEnter(this.handle, timeout);
          }
          /** Releases the lock on an object and attempts to block the current thread until it reacquires the lock. */
          tryWait(timeout) {
            return !!Il2Cpp3.exports.monitorTryWait(this.handle, timeout);
          }
          /** Releases the lock on an object and blocks the current thread until it reacquires the lock. */
          wait() {
            return Il2Cpp3.exports.monitorWait(this.handle);
          }
        }
        Object3.Monitor = Monitor;
      })(Object2 = Il2Cpp3.Object || (Il2Cpp3.Object = {}));
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Parameter {
        /** Name of this parameter. */
        name;
        /** Position of this parameter. */
        position;
        /** Type of this parameter. */
        type;
        constructor(name, position, type) {
          this.name = name;
          this.position = position;
          this.type = type;
        }
        /** */
        toString() {
          return `${this.type.name} ${this.name}`;
        }
      }
      Il2Cpp3.Parameter = Parameter;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Pointer extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Gets the element at the given index. */
        get(index) {
          return Il2Cpp3.read(this.handle.add(index * this.type.class.arrayElementSize), this.type);
        }
        /** Reads the given amount of elements starting at the given offset. */
        read(length, offset = 0) {
          const values = new globalThis.Array(length);
          for (let i = 0; i < length; i++) {
            values[i] = this.get(i + offset);
          }
          return values;
        }
        /** Sets the given element at the given index */
        set(index, value) {
          Il2Cpp3.write(this.handle.add(index * this.type.class.arrayElementSize), value, this.type);
        }
        /** */
        toString() {
          return this.handle.toString();
        }
        /** Writes the given elements starting at the given index. */
        write(values, offset = 0) {
          for (let i = 0; i < values.length; i++) {
            this.set(i + offset, values[i]);
          }
        }
      }
      Il2Cpp3.Pointer = Pointer;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Reference extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Gets the element referenced by the current reference. */
        get value() {
          return Il2Cpp3.read(this.handle, this.type);
        }
        /** Sets the element referenced by the current reference. */
        set value(value) {
          Il2Cpp3.write(this.handle, value, this.type);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `->${this.value}`;
        }
      }
      Il2Cpp3.Reference = Reference;
      function reference(value, type) {
        const handle = Memory.alloc(Process.pointerSize);
        switch (typeof value) {
          case "boolean":
            return new Il2Cpp3.Reference(handle.writeS8(+value), Il2Cpp3.corlib.class("System.Boolean").type);
          case "number":
            switch (type?.enumValue) {
              case Il2Cpp3.Type.Enum.UBYTE:
                return new Il2Cpp3.Reference(handle.writeU8(value), type);
              case Il2Cpp3.Type.Enum.BYTE:
                return new Il2Cpp3.Reference(handle.writeS8(value), type);
              case Il2Cpp3.Type.Enum.CHAR:
              case Il2Cpp3.Type.Enum.USHORT:
                return new Il2Cpp3.Reference(handle.writeU16(value), type);
              case Il2Cpp3.Type.Enum.SHORT:
                return new Il2Cpp3.Reference(handle.writeS16(value), type);
              case Il2Cpp3.Type.Enum.UINT:
                return new Il2Cpp3.Reference(handle.writeU32(value), type);
              case Il2Cpp3.Type.Enum.INT:
                return new Il2Cpp3.Reference(handle.writeS32(value), type);
              case Il2Cpp3.Type.Enum.ULONG:
                return new Il2Cpp3.Reference(handle.writeU64(value), type);
              case Il2Cpp3.Type.Enum.LONG:
                return new Il2Cpp3.Reference(handle.writeS64(value), type);
              case Il2Cpp3.Type.Enum.FLOAT:
                return new Il2Cpp3.Reference(handle.writeFloat(value), type);
              case Il2Cpp3.Type.Enum.DOUBLE:
                return new Il2Cpp3.Reference(handle.writeDouble(value), type);
            }
          case "object":
            if (value instanceof Il2Cpp3.ValueType || value instanceof Il2Cpp3.Pointer) {
              return new Il2Cpp3.Reference(value.handle, value.type);
            } else if (value instanceof Il2Cpp3.Object) {
              return new Il2Cpp3.Reference(handle.writePointer(value), value.class.type);
            } else if (value instanceof Il2Cpp3.String || value instanceof Il2Cpp3.Array) {
              return new Il2Cpp3.Reference(handle.writePointer(value), value.object.class.type);
            } else if (value instanceof NativePointer) {
              switch (type?.enumValue) {
                case Il2Cpp3.Type.Enum.NUINT:
                case Il2Cpp3.Type.Enum.NINT:
                  return new Il2Cpp3.Reference(handle.writePointer(value), type);
              }
            } else if (value instanceof Int64) {
              return new Il2Cpp3.Reference(handle.writeS64(value), Il2Cpp3.corlib.class("System.Int64").type);
            } else if (value instanceof UInt64) {
              return new Il2Cpp3.Reference(handle.writeU64(value), Il2Cpp3.corlib.class("System.UInt64").type);
            }
          default:
            raise(`couldn't create a reference to ${value} using an unhandled type ${type?.name}`);
        }
      }
      Il2Cpp3.reference = reference;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class String extends NativeStruct {
        /** Gets the content of this string. */
        get content() {
          return Il2Cpp3.exports.stringGetChars(this).readUtf16String(this.length);
        }
        /** @unsafe Sets the content of this string - it may write out of bounds! */
        set content(value) {
          const offset = Il2Cpp3.string("vfsfitvnm").handle.offsetOf(_ => _.readInt() == 9) ?? raise("couldn't find the length offset in the native string struct");
          globalThis.Object.defineProperty(Il2Cpp3.String.prototype, "content", {
            set(value2) {
              Il2Cpp3.exports.stringGetChars(this).writeUtf16String(value2 ?? "");
              this.handle.add(offset).writeS32(value2?.length ?? 0);
            }
          });
          this.content = value;
        }
        /** Gets the length of this string. */
        get length() {
          return Il2Cpp3.exports.stringGetLength(this);
        }
        /** Gets the encompassing object of the current string. */
        get object() {
          return new Il2Cpp3.Object(this);
        }
        /** */
        toString() {
          return this.isNull() ? "null" : `"${this.content}"`;
        }
      }
      Il2Cpp3.String = String;
      function string(content) {
        return new Il2Cpp3.String(Il2Cpp3.exports.stringNew(Memory.allocUtf8String(content ?? "")));
      }
      Il2Cpp3.string = string;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class Thread extends NativeStruct {
        /** Gets the native id of the current thread. */
        get id() {
          let get = function () {
            return this.internal.field("thread_id").value.toNumber();
          };
          if (Process.platform != "windows") {
            const currentThreadId = Process.getCurrentThreadId();
            const currentPosixThread = ptr(get.apply(Il2Cpp3.currentThread));
            const offset = currentPosixThread.offsetOf(_ => _.readS32() == currentThreadId, 1024) ?? raise(`couldn't find the offset for determining the kernel id of a posix thread`);
            const _get = get;
            get = function () {
              return ptr(_get.apply(this)).add(offset).readS32();
            };
          }
          getter(Il2Cpp3.Thread.prototype, "id", get, lazy);
          return this.id;
        }
        /** Gets the encompassing internal object (System.Threding.InternalThreead) of the current thread. */
        get internal() {
          return this.object.tryField("internal_thread")?.value ?? this.object;
        }
        /** Determines whether the current thread is the garbage collector finalizer one. */
        get isFinalizer() {
          return !Il2Cpp3.exports.threadIsVm(this);
        }
        /** Gets the managed id of the current thread. */
        get managedId() {
          return this.object.method("get_ManagedThreadId").invoke();
        }
        /** Gets the encompassing object of the current thread. */
        get object() {
          return new Il2Cpp3.Object(this);
        }
        /** @internal */
        get staticData() {
          return this.internal.field("static_data").value;
        }
        /** @internal */
        get synchronizationContext() {
          const get_ExecutionContext = this.object.tryMethod("GetMutableExecutionContext") ?? this.object.method("get_ExecutionContext");
          const executionContext = get_ExecutionContext.invoke();
          const synchronizationContext = executionContext.tryField("_syncContext")?.value ?? executionContext.tryMethod("get_SynchronizationContext")?.invoke() ?? this.tryLocalValue(Il2Cpp3.corlib.class("System.Threading.SynchronizationContext"));
          return synchronizationContext?.asNullable() ?? null;
        }
        /** Detaches the thread from the application domain. */
        detach() {
          return Il2Cpp3.exports.threadDetach(this);
        }
        /** Schedules a callback on the current thread. */
        schedule(block) {
          const Post = this.synchronizationContext?.tryMethod("Post");
          if (Post == null) {
            return Process.runOnThread(this.id, block);
          }
          return new Promise(resolve => {
            const delegate = Il2Cpp3.delegate(Il2Cpp3.corlib.class("System.Threading.SendOrPostCallback"), () => {
              const result = block();
              setImmediate(() => resolve(result));
            });
            Script.bindWeak(globalThis, () => {
              delegate.field("method_ptr").value = delegate.field("invoke_impl").value = Il2Cpp3.exports.domainGet;
            });
            Post.invoke(delegate, NULL);
          });
        }
        /** @internal */
        tryLocalValue(klass) {
          for (let i = 0; i < 16; i++) {
            const base = this.staticData.add(i * Process.pointerSize).readPointer();
            if (!base.isNull()) {
              const object = new Il2Cpp3.Object(base.readPointer()).asNullable();
              if (object?.class?.isSubclassOf(klass, false)) {
                return object;
              }
            }
          }
        }
      }
      __decorate([lazy], Thread.prototype, "internal", null);
      __decorate([lazy], Thread.prototype, "isFinalizer", null);
      __decorate([lazy], Thread.prototype, "managedId", null);
      __decorate([lazy], Thread.prototype, "object", null);
      __decorate([lazy], Thread.prototype, "staticData", null);
      __decorate([lazy], Thread.prototype, "synchronizationContext", null);
      Il2Cpp3.Thread = Thread;
      getter(Il2Cpp3, "attachedThreads", () => {
        if (Il2Cpp3.exports.threadGetAttachedThreads.isNull()) {
          const currentThreadHandle = Il2Cpp3.currentThread?.handle ?? raise("Current thread is not attached to IL2CPP");
          const pattern = currentThreadHandle.toMatchPattern();
          const threads = [];
          for (const range of Process.enumerateRanges("rw-")) {
            if (range.file == void 0) {
              const matches = Memory.scanSync(range.base, range.size, pattern);
              if (matches.length == 1) {
                while (true) {
                  const handle = matches[0].address.sub(matches[0].size * threads.length).readPointer();
                  if (handle.isNull() || !handle.readPointer().equals(currentThreadHandle.readPointer())) {
                    break;
                  }
                  threads.unshift(new Il2Cpp3.Thread(handle));
                }
                break;
              }
            }
          }
          return threads;
        }
        return readNativeList(Il2Cpp3.exports.threadGetAttachedThreads).map(_ => new Il2Cpp3.Thread(_));
      });
      getter(Il2Cpp3, "currentThread", () => {
        return new Il2Cpp3.Thread(Il2Cpp3.exports.threadGetCurrent()).asNullable();
      });
      getter(Il2Cpp3, "mainThread", () => {
        return Il2Cpp3.attachedThreads[0];
      });
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      let Type = class Type extends NativeStruct {
        /** */
        static get Enum() {
          const _ = (_2, block = _3 => _3) => block(Il2Cpp3.corlib.class(_2)).type.enumValue;
          const initial = {
            VOID: _("System.Void"),
            BOOLEAN: _("System.Boolean"),
            CHAR: _("System.Char"),
            BYTE: _("System.SByte"),
            UBYTE: _("System.Byte"),
            SHORT: _("System.Int16"),
            USHORT: _("System.UInt16"),
            INT: _("System.Int32"),
            UINT: _("System.UInt32"),
            LONG: _("System.Int64"),
            ULONG: _("System.UInt64"),
            NINT: _("System.IntPtr"),
            NUINT: _("System.UIntPtr"),
            FLOAT: _("System.Single"),
            DOUBLE: _("System.Double"),
            POINTER: _("System.IntPtr", _2 => _2.field("m_value")),
            VALUE_TYPE: _("System.Decimal"),
            OBJECT: _("System.Object"),
            STRING: _("System.String"),
            CLASS: _("System.Array"),
            ARRAY: _("System.Void", _2 => _2.arrayClass),
            NARRAY: _("System.Void", _2 => new Il2Cpp3.Class(Il2Cpp3.exports.classGetArrayClass(_2, 2))),
            GENERIC_INSTANCE: _("System.Int32", _2 => _2.interfaces.find(_3 => _3.name.endsWith("`1")))
          };
          Reflect.defineProperty(this, "Enum", {
            value: initial
          });
          return addFlippedEntries({
            ...initial,
            VAR: _("System.Action`1", _2 => _2.generics[0]),
            MVAR: _("System.Array", _2 => _2.method("AsReadOnly", 1).generics[0])
          });
        }
        /** Gets the class of this type. */
        get class() {
          return new Il2Cpp3.Class(Il2Cpp3.exports.typeGetClass(this));
        }
        /** */
        get fridaAlias() {
          function getValueTypeFields(type) {
            const instanceFields = type.class.fields.filter(_ => !_.isStatic);
            return instanceFields.length == 0 ? ["char"] : instanceFields.map(_ => _.type.fridaAlias);
          }
          if (this.isByReference) {
            return "pointer";
          }
          switch (this.enumValue) {
            case Il2Cpp3.Type.Enum.VOID:
              return "void";
            case Il2Cpp3.Type.Enum.BOOLEAN:
              return "bool";
            case Il2Cpp3.Type.Enum.CHAR:
              return "uchar";
            case Il2Cpp3.Type.Enum.BYTE:
              return "int8";
            case Il2Cpp3.Type.Enum.UBYTE:
              return "uint8";
            case Il2Cpp3.Type.Enum.SHORT:
              return "int16";
            case Il2Cpp3.Type.Enum.USHORT:
              return "uint16";
            case Il2Cpp3.Type.Enum.INT:
              return "int32";
            case Il2Cpp3.Type.Enum.UINT:
              return "uint32";
            case Il2Cpp3.Type.Enum.LONG:
              return "int64";
            case Il2Cpp3.Type.Enum.ULONG:
              return "uint64";
            case Il2Cpp3.Type.Enum.FLOAT:
              return "float";
            case Il2Cpp3.Type.Enum.DOUBLE:
              return "double";
            case Il2Cpp3.Type.Enum.NINT:
            case Il2Cpp3.Type.Enum.NUINT:
            case Il2Cpp3.Type.Enum.POINTER:
            case Il2Cpp3.Type.Enum.STRING:
            case Il2Cpp3.Type.Enum.ARRAY:
            case Il2Cpp3.Type.Enum.NARRAY:
              return "pointer";
            case Il2Cpp3.Type.Enum.VALUE_TYPE:
              return this.class.isEnum ? this.class.baseType.fridaAlias : getValueTypeFields(this);
            case Il2Cpp3.Type.Enum.CLASS:
            case Il2Cpp3.Type.Enum.OBJECT:
            case Il2Cpp3.Type.Enum.GENERIC_INSTANCE:
              return this.class.isStruct ? getValueTypeFields(this) : this.class.isEnum ? this.class.baseType.fridaAlias : "pointer";
            default:
              return "pointer";
          }
        }
        /** Determines whether this type is passed by reference. */
        get isByReference() {
          return this.name.endsWith("&");
        }
        /** Determines whether this type is primitive. */
        get isPrimitive() {
          switch (this.enumValue) {
            case Il2Cpp3.Type.Enum.BOOLEAN:
            case Il2Cpp3.Type.Enum.CHAR:
            case Il2Cpp3.Type.Enum.BYTE:
            case Il2Cpp3.Type.Enum.UBYTE:
            case Il2Cpp3.Type.Enum.SHORT:
            case Il2Cpp3.Type.Enum.USHORT:
            case Il2Cpp3.Type.Enum.INT:
            case Il2Cpp3.Type.Enum.UINT:
            case Il2Cpp3.Type.Enum.LONG:
            case Il2Cpp3.Type.Enum.ULONG:
            case Il2Cpp3.Type.Enum.FLOAT:
            case Il2Cpp3.Type.Enum.DOUBLE:
            case Il2Cpp3.Type.Enum.NINT:
            case Il2Cpp3.Type.Enum.NUINT:
              return true;
            default:
              return false;
          }
        }
        /** Gets the name of this type. */
        get name() {
          const handle = Il2Cpp3.exports.typeGetName(this);
          try {
            return handle.readUtf8String();
          } finally {
            Il2Cpp3.free(handle);
          }
        }
        /** Gets the encompassing object of the current type. */
        get object() {
          return new Il2Cpp3.Object(Il2Cpp3.exports.typeGetObject(this));
        }
        /** Gets the {@link Il2Cpp.Type.Enum} value of the current type. */
        get enumValue() {
          return Il2Cpp3.exports.typeGetTypeEnum(this);
        }
        is(other) {
          if (Il2Cpp3.exports.typeEquals.isNull()) {
            return this.object.method("Equals").invoke(other.object);
          }
          return !!Il2Cpp3.exports.typeEquals(this, other);
        }
        /** */
        toString() {
          return this.name;
        }
      };
      __decorate([lazy], Type.prototype, "class", null);
      __decorate([lazy], Type.prototype, "fridaAlias", null);
      __decorate([lazy], Type.prototype, "isByReference", null);
      __decorate([lazy], Type.prototype, "isPrimitive", null);
      __decorate([lazy], Type.prototype, "name", null);
      __decorate([lazy], Type.prototype, "object", null);
      __decorate([lazy], Type.prototype, "enumValue", null);
      __decorate([lazy], Type, "Enum", null);
      Type = __decorate([recycle], Type);
      Il2Cpp3.Type = Type;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    (function (Il2Cpp3) {
      class ValueType extends NativeStruct {
        type;
        constructor(handle, type) {
          super(handle);
          this.type = type;
        }
        /** Boxes the current value type in a object. */
        box() {
          return new Il2Cpp3.Object(Il2Cpp3.exports.valueTypeBox(this.type.class, this));
        }
        /** Gets the non-static field with the given name of the current class hierarchy. */
        field(name) {
          return this.tryField(name) ?? raise(`couldn't find non-static field ${name} in hierarchy of class ${this.type.name}`);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy. */
        method(name, parameterCount = -1) {
          return this.tryMethod(name, parameterCount) ?? raise(`couldn't find non-static method ${name} in hierarchy of class ${this.type.name}`);
        }
        /** Gets the non-static field with the given name of the current class hierarchy, if it exists. */
        tryField(name) {
          const field = this.type.class.tryField(name);
          if (field?.isStatic) {
            for (const klass of this.type.class.hierarchy()) {
              for (const field2 of klass.fields) {
                if (field2.name == name && !field2.isStatic) {
                  return field2.bind(this);
                }
              }
            }
            return void 0;
          }
          return field?.bind(this);
        }
        /** Gets the non-static method with the given name (and optionally parameter count) of the current class hierarchy, if it exists. */
        tryMethod(name, parameterCount = -1) {
          const method = this.type.class.tryMethod(name, parameterCount);
          if (method?.isStatic) {
            for (const klass of this.type.class.hierarchy()) {
              for (const method2 of klass.methods) {
                if (method2.name == name && !method2.isStatic && (parameterCount < 0 || method2.parameterCount == parameterCount)) {
                  return method2.bind(this);
                }
              }
            }
            return void 0;
          }
          return method?.bind(this);
        }
        /** */
        toString() {
          const ToString = this.method("ToString", 0);
          return this.isNull() ? "null" :
          // If ToString is defined within a value type class, we can
          // avoid a boxing operation.
          ToString.class.isValueType ? ToString.invoke().content ?? "null" : this.box().toString() ?? "null";
        }
      }
      Il2Cpp3.ValueType = ValueType;
    })(Il2Cpp2 || (Il2Cpp2 = {}));
    globalThis.Il2Cpp = Il2Cpp2;
  }
});

// avatar.js
var require_avatar = __commonJS({
  "avatar.js"() {
    init_node_globals();
    init_dist();
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
  }
});
export default require_avatar();
