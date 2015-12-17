'use strict';

///<reference path="typings/debug/debug.d.ts"/>
var Debug = require('debug');
var debug = Debug('rare');
module.exports = function createRare() {
    var map = [],
        lastId = 1;
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
                if (entry.key === arg || arg !== arg && entry.key !== entry.key) {
                    match = entry;
                    entries = entry.entries;
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
        });
        debug('map', map);
        return match.value;
    }
    return rare;
};

