#!/usr/bin/env node
import json2ts from '../dist/index.mjs';
import 'zx/globals'

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


// console.log(__dirname);
// console.log(__filename);

fs.outputFile('test.ts',json2ts(JSON.stringify(nestedPrimitiveObj)));