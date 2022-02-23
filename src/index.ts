interface INode {
  value: Object;
  type: 'array' | 'object';
  key: string;
}
type Types =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'null'
  | 'array';
const PrimitiveTypes = ['string', 'number', 'boolean', 'undefined', 'null'];
class GenInterface {
  isProcess = false;
  resStr = '';
  start(name) {
    this.resStr += `interface ${name} { \n`;
    this.isProcess = true;
  }
  end() {
    this.resStr += `}`;
    return this.resStr;
  }
  reset() {
    this.resStr = '';
    this.isProcess = false;
  }
  append(key, type) {
    this.resStr += `  ${key} : ${type}; \n`;
  }
}
const GenInterfaceInstance = new GenInterface();
const titleCase = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};
const getInterfaceName = (key: string, type: INode['type']) => {
  return `I${titleCase(key)}`;
};
const isObject = (v) => typeof v === 'object' && v !== null;
const isArray = (v) => Array.isArray(v);
const getType = (target): Types => {
  const strTarget = Object.prototype.toString.call(target);
  const type = /\[object (.*)]/.exec(strTarget)[1];
  return type.toLowerCase() as Types;
};

const checkArrayItemTypes = (arr: any[], arrName: string) => {
  const types = arr.map(getType);
  // 对type去重
  const uniTypeArr = Array.from(new Set(types));

  // 区分开 基本类型 和 对象类型
  const primitiveArr = uniTypeArr.filter((t) => PrimitiveTypes.includes(t));
  const objArr = uniTypeArr.filter((t) => !PrimitiveTypes.includes(t));

  const interfaceName = getInterfaceName(arrName, 'array');

  const objInterfaceArr = [];
  if (objArr.length > 0) {
    const objs = arr.filter(isObject);
    const objKeys = objs.map((i) => Object.keys(i).join('-'));
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
    // 数组里全是基础类型
    return primitiveArr;
  } else if (primitiveArr.length === 0 && objArr.length > 0) {
    // 数组里全是对象
    return objInterfaceArr;
  } else if (primitiveArr.length > 0 && objArr.length > 0) {
    return [...primitiveArr, ...objInterfaceArr];
  } else {
    return [];
  }
};

const getUniObjInArr = (arr: any[]) => {
  const objs = arr.filter(isObject);
  const objsWithKeys = objs.map(obj => ({ ...obj, uniKey: Object.keys(obj).join('-') }));
  const pickKeys = [];
  const pickObjs = [];

  objsWithKeys.forEach(obj => {
    if (pickKeys.includes(obj.uniKey)) return;
    pickKeys.push(obj.uniKey);
    delete obj.uniKey;
    pickObjs.push(obj);
  })

  return pickObjs;
};

const traves = (jsonObj, topName) => {
  const nodes = [];
  const dfs = (value, key) => {
    if (isArray(value)) {
      // nodes.push({ key, value, type: 'array' });
      const objs = getUniObjInArr(value);
      if (objs.length <= 1) {
        objs.forEach((v) => dfs(v, `${key}`));
      } else {
        objs.forEach((v, i) => dfs(v, `${key}${i + 1}`));
      }
    } else if (isObject(value)) {
      nodes.push({ key, value, type: 'object' });
      Object.keys(value).forEach((k) => dfs(value[k], k));
    } else {
      // nodes.push({ key, value });
    }
  };
  dfs(jsonObj, topName);
  const interfaceArr = nodes.map(generateInterface);
  return interfaceArr.join('\n\n');
};

const generateInterface = (node: INode) => {

  if (node.type === 'object') {
    const name = getInterfaceName(node.key, 'object');
    GenInterfaceInstance.reset();
    GenInterfaceInstance.start(name);
    Object.keys(node.value).forEach((k) => {
      const target = node.value[k];
      if (isArray(target)) {
        const types = checkArrayItemTypes(target, k);
        GenInterfaceInstance.append(k, `(${types.join('|')})[]`);
      } else if (isObject(target)) {
        const interfaceName = getInterfaceName(k, 'object');
        GenInterfaceInstance.append(k, interfaceName);
      } else {
        GenInterfaceInstance.append(k, getType(target));
      }
    });
    const result = GenInterfaceInstance.end();
    GenInterfaceInstance.reset();
    return result;
  }

  return '';
};

const json2ts = (jsonStr: string, interfaceName = 'SomeInterface') => {
  try {
    const jsonObj = JSON.parse(jsonStr);
    const resultStr = traves(jsonObj, interfaceName);
    return resultStr;
  } catch (error) {
    console.log(error);
  }
};

export default json2ts;