'use strict';

///<reference path="typings/tsd.d.ts"/>
var Debug = require('debug');
var debug = Debug('rare');
var _ = require('lodash');
var equal = function equal(value, other) {
    return value === other;
};
var deepEqual = _.isEqual;
module.exports = function createRare(options) {
    var map = [],
        lastId = 1;
    var deep = options && options.deep;
    var compare = deep ? deepEqual : equal;
    function rare() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (args.length === 0) return 0;
        var entries = map,
            match,
            hasMatch;
        args.forEach(function (arg) {
            hasMatch = entries.some(function (entry) {
                // equal or NaN
                if (compare(entry.key, arg) || arg !== arg && entry.key !== entry.key) {
                    match = entry;
                    return true;
                }
            });
            if (!hasMatch) {
                match = {
                    key: arg,
                    value: lastId++,
                    entries: []
                };
                entries.push(match);
            }
            entries = match.entries;
        });
        debug('map', map);
        return match.value;
    }
    return rare;
};

