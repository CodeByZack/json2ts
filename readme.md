<h1 align="center">Welcome to json2tstool 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/CodeByZack/json2ts#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CodeByZack/json2ts/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> transform json to typescript interface

## demo 演示

[json2tsDEMO](https://json2ts-plum.vercel.app/)

## 安装

```
npm i json2tstool

```

## 使用

### In Browser

```javascript
<script src="https://unpkg.com/json2tstool@1.0.0/dist/index.js"></script>

const jsonStr = `{ "key" : 2 }`;

json2tstool.default(jsonStr);

```

### ES Module

```javascript
import json2ts from 'json2tstool';

const jsonStr = `{ "key" : 2 }`;

json2ts(jsonStr);

```

### NodeJS

```javascript
const json2ts = require('json2tstool');

const jsonStr = `{ "key" : 2 }`;

json2ts(jsonStr);
```


## 支持一下

如果该库对你有帮助，可以点一下 ⭐️!



