var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
var PrimitiveTypes = ["string", "number", "boolean", "undefined", "null"];
var GenInterface = class {
  constructor() {
    this.isProcess = false;
    this.resStr = "";
  }
  start(name) {
    this.resStr += `interface ${name} { 
`;
    this.isProcess = true;
  }
  end() {
    this.resStr += `}`;
    return this.resStr;
  }
  reset() {
    this.resStr = "";
    this.isProcess = false;
  }
  append(key, type) {
    this.resStr += `  ${key} : ${type}; 
`;
  }
};
var GenInterfaceInstance = new GenInterface();
var titleCase = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};
var getInterfaceName = (key, type) => {
  return `I${titleCase(key)}`;
};
var isObject = (v) => typeof v === "object" && v !== null;
var isArray = (v) => Array.isArray(v);
var getType = (target) => {
  const strTarget = Object.prototype.toString.call(target);
  const type = /\[object (.*)]/.exec(strTarget)[1];
  return type.toLowerCase();
};
var checkArrayItemTypes = (arr, arrName) => {
  const types = arr.map(getType);
  const uniTypeArr = Array.from(new Set(types));
  const primitiveArr = uniTypeArr.filter((t) => PrimitiveTypes.includes(t));
  const objArr = uniTypeArr.filter((t) => !PrimitiveTypes.includes(t));
  const interfaceName = getInterfaceName(arrName, "array");
  const objInterfaceArr = [];
  if (objArr.length > 0) {
    const objs = arr.filter(isObject);
    const objKeys = objs.map((i) => Object.keys(i).join("-"));
    const uniObjKeys = Array.from(new Set(objKeys));
    if (uniObjKeys.length === 1) {
      objInterfaceArr.push(interfaceName);
    } else {
      uniObjKeys.forEach((k, i) => {
        objInterfaceArr.push(`${interfaceName}${i + 1}`);
      });
    }
  }
  if (primitiveArr.length > 0 && objArr.length === 0) {
    return primitiveArr;
  } else if (primitiveArr.length === 0 && objArr.length > 0) {
    return objInterfaceArr;
  } else if (primitiveArr.length > 0 && objArr.length > 0) {
    return [...primitiveArr, ...objInterfaceArr];
  } else {
    return [];
  }
};
var getUniObjInArr = (arr) => {
  const objs = arr.filter(isObject);
  const objsWithKeys = objs.map((obj) => __spreadProps(__spreadValues({}, obj), { uniKey: Object.keys(obj).join("-") }));
  const pickKeys = [];
  const pickObjs = [];
  objsWithKeys.forEach((obj) => {
    if (pickKeys.includes(obj.uniKey))
      return;
    pickKeys.push(obj.uniKey);
    delete obj.uniKey;
    pickObjs.push(obj);
  });
  return pickObjs;
};
var traves = (jsonObj, topName) => {
  const nodes = [];
  const dfs = (value, key) => {
    if (isArray(value)) {
      const objs = getUniObjInArr(value);
      if (objs.length <= 1) {
        objs.forEach((v) => dfs(v, `${key}`));
      } else {
        objs.forEach((v, i) => dfs(v, `${key}${i + 1}`));
      }
    } else if (isObject(value)) {
      nodes.push({ key, value, type: "object" });
      Object.keys(value).forEach((k) => dfs(value[k], k));
    } else {
    }
  };
  dfs(jsonObj, topName);
  console.log(nodes);
  const interfaceArr = nodes.map(generateInterface);
  return interfaceArr.join("\n\n");
};
var generateInterface = (node) => {
  if (node.type === "array") {
    const name = getInterfaceName(node.key, "array");
    GenInterfaceInstance.reset();
    GenInterfaceInstance.start(name);
    const types = checkArrayItemTypes(node.value, node.key);
    GenInterfaceInstance.append(node.key, `(${types.join("|")})[]`);
    const result = GenInterfaceInstance.end();
    GenInterfaceInstance.reset();
    return result;
  }
  if (node.type === "object") {
    const name = getInterfaceName(node.key, "object");
    GenInterfaceInstance.reset();
    GenInterfaceInstance.start(name);
    Object.keys(node.value).forEach((k) => {
      const target = node.value[k];
      if (isArray(target)) {
        const types = checkArrayItemTypes(target, k);
        GenInterfaceInstance.append(k, `(${types.join("|")})[]`);
      } else if (isObject(target)) {
        const interfaceName = getInterfaceName(k, "object");
        GenInterfaceInstance.append(k, interfaceName);
      } else {
        GenInterfaceInstance.append(k, getType(target));
      }
    });
    const result = GenInterfaceInstance.end();
    GenInterfaceInstance.reset();
    return result;
  }
  return "";
};
var json2ts = (jsonStr, interfaceName = "ISomeInterface") => {
  try {
    const jsonObj = JSON.parse(jsonStr);
    const resultStr = traves(jsonObj, interfaceName);
    return resultStr;
  } catch (error) {
    console.log(error);
  }
};
var src_default = json2ts;
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
