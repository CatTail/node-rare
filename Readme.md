# node-rare [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

> Unique identifier generator for any value, even list of value

## Installation

    npm install --save rare

## Usage

    var createRare = require('rare')
    var rare = createRare()
    var id1 = rare('something')
    var id2 = rare(42)
    var id3 = rare({}, 'hello world')

## License

MIT

[npm-image]: https://img.shields.io/npm/v/rare.svg?style=flat
[npm-url]: https://npmjs.org/package/rare
[travis-image]: https://img.shields.io/travis/CatTail/node-rare.svg?style=flat
[travis-url]: https://travis-ci.org/CatTail/node-rare
[coveralls-image]: https://img.shields.io/coveralls/CatTail/node-rare.svg?style=flat
[coveralls-url]: https://coveralls.io/r/CatTail/node-rare?branch=master
