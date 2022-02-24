#!/usr/bin/env node
import json2ts from '../dist/index.mjs';
import 'zx/globals';
import { Command } from 'commander';
const program = new Command();

program
  .option('-i, --input <value>', 'input json string')
  .option('-f, --file <value>', 'input json file name')
  .option('-o, --output <value>', 'output file name');

program.parse(process.argv);
const options = program.opts();

// 获取输入
let inputStr = '';
if(options.input){
  inputStr = options.input;
}else if(options.file){
  inputStr = await fs.readFile(options.file);
}

const resultStr = json2ts(inputStr);

if(options.output){
  await fs.outputFile(options.output,resultStr);
}else{
  console.log(resultStr);
}