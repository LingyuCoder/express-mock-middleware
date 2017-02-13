# express-mock-middleware

[![Test coverage](https://img.shields.io/coveralls/LingyuCoder/express-mock-middleware.svg?style=flat-square)](https://coveralls.io/r/LingyuCoder/express-mock-middleware?branch=master)
[![Build Status](https://travis-ci.org/LingyuCoder/express-mock-middleware.png)](https://travis-ci.org/LingyuCoder/express-mock-middleware)
[![Dependency Status](https://david-dm.org/LingyuCoder/express-mock-middleware.svg)](https://david-dm.org/LingyuCoder/express-mock-middleware)
[![devDependency Status](https://david-dm.org/LingyuCoder/express-mock-middleware/dev-status.svg)](https://david-dm.org/LingyuCoder/express-mock-middleware#info=devDependencies)
[![NPM version](http://img.shields.io/npm/v/express-mock-middleware.svg?style=flat-square)](http://npmjs.org/package/express-mock-middleware)
[![node](https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square)](http://nodejs.org/download/)
[![License](http://img.shields.io/npm/l/express-mock-middleware.svg?style=flat-square)](LICENSE)
[![npm download](https://img.shields.io/npm/dm/express-mock-middleware.svg?style=flat-square)](https://npmjs.org/package/express-mock-middleware)

A simple mock middleware for express

## Installation

```bash
$ npm install --save express-mock-middleware
```

## Usage

```js
const express = require('express');
const mockMiddleware = require('express-mock-middleware');
const app = express();
app.use(mockMiddleware({glob: 'mock/**/*.js'}));
app.listen(port, function (err) {
  return console.log(err);
})
```

In `mock/products.js`:

```js
module.exports = {
  'GET /api/products': function (req, res) {
    res.json({
      "success": true,
      "meta": {
        "code": 200
      },
      "data": {
        "products": [{
          "name": 'someName',
          "price": '123.00',
          "image": '',
          "category": ''
        }]
      }
    });
  },
};

```

## License

The MIT License (MIT)

Copyright (c) 2015 LingyuCoder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
