<h1 align="center">Welcome to json2ts 👋</h1>
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

[json2tsDEMO](https://json2ts.vercel.app/)

## 引入

### In Browser

```javascript
<script src="./dist/index.global.js"></script>

const jsonStr = `{ "key" : 2 }`;

json2ts.default(jsonStr);

```

### ES Module

```javascript
import json2ts from 'json2ts';

const jsonStr = `{ "key" : 2 }`;

json2ts(jsonStr);

```

### NodeJS

```javascript
const json2ts = require('json2ts');

const jsonStr = `{ "key" : 2 }`;

json2ts(jsonStr);
```


## 支持一下

如果该库对你有帮助，可以点一下 ⭐️!



