import { assert, expect, test } from 'vitest';
import json2ts from '../src/index';

// Edit an assertion and save to see HMR in action

const primitiveObj = {
  num: 1,
  str: 'str',
  boolean: true,
  null: null,
};

const correctPrimitiveStr = `interface ISomeInterface { 
    num : number; 
    str : string; 
    boolean : boolean; 
    null : null;
}`;

const nestedPrimitiveObj = {
  num: 1,
  str: 'str',
  boolean: true,
  null: null,
  object: {
    foo: 1,
    foo2: false,
  },
};

const correctNestedPrimitiveObj = `interface ISomeInterface { 
  num : number; 
  str : string; 
  boolean : boolean; 
  null : null; 
  object : IObject; 
}

interface IObject { 
  foo : number; 
  foo2 : boolean; 
}`;

const arrayValueObj = {
  array: [1, 'str', true, null, undefined],
  array2: [1, 2, 3, 4, 5],
  array3: ['1', '2', '3', '4'],
};

const correctArrayValueObj = `interface ISomeInterface { 
  array : (number|string|boolean|null)[]; 
  array2 : (number)[]; 
  array3 : (string)[]; 
}`;

const arrayObjObj = {
  array: [{ key: 12, key2: '34' }],
  array2: [
    { obj: 12, obj2: '34' },
    { obj: 12, obj2: '34', obj3: true },
  ],
};

const correctArrayObjObj = `interface ISomeInterface { 
  array : (IArray)[]; 
  array2 : (IArray21|IArray22)[]; 
}

interface IArray { 
  key : number; 
  key2 : string; 
}

interface IArray21 { 
  obj : number; 
  obj2 : string; 
}

interface IArray22 { 
  obj : number; 
  obj2 : string; 
  obj3 : boolean; 
}`;

const arrayValueObjObj = {
  array: [{ key: 12, key2: '34' },{ key: 12, key2: '34', key3 : '11' }, 1, 2, false],
  sameObjArr: [
    { obj: 12, obj2: '34' },
    { obj: 12, obj2: '34' },
  ],
};

const correctArrayValueObjObj = `interface ISomeInterface { 
  array : (number|boolean|IArray1|IArray2)[]; 
  sameObjArr : (ISameObjArr)[]; 
}

interface IArray1 { 
  key : number; 
  key2 : string; 
}

interface IArray2 { 
  key : number; 
  key2 : string; 
  key3 : string; 
}

interface ISameObjArr { 
  obj : number; 
  obj2 : string; 
}`;

const topIsArray = [
  { a: 1, b : 2 },
  { c : 'd', d : 'c'},
  1
]

const correctTopIsArray = `interface ISomeInterface1 { 
  a : number; 
  b : number; 
}

interface ISomeInterface2 { 
  c : string; 
  d : string; 
}`;

const removeWhiteSpace = (str: string) => {
  return str.replace(/\s*/g, '');
};

test('转换primitive Object为Interface', () => {
  const objStr = JSON.stringify(primitiveObj);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctPrimitiveStr));
});

test('转换嵌套的primitive Object为Interface', () => {
  const objStr = JSON.stringify(nestedPrimitiveObj);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctNestedPrimitiveObj));
});

test('转换值为基础值数组Object为Interface', () => {
  const objStr = JSON.stringify(arrayValueObj);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctArrayValueObj));
});

test('转换值为对象数组Object为Interface', () => {
  const objStr = JSON.stringify(arrayObjObj);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctArrayObjObj));
});

test('转换值为对象基础值混合数组Object为Interface', () => {
  const objStr = JSON.stringify(arrayValueObjObj);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctArrayValueObjObj));
});

test('转换顶层为数组的JSON字符串', () => {
  const objStr = JSON.stringify(topIsArray);
  const resultStr = removeWhiteSpace(json2ts(objStr, 'SomeInterface'));
  expect(resultStr).eq(removeWhiteSpace(correctTopIsArray));
});
