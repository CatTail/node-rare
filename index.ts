///<reference path="typings/tsd.d.ts"/> 
import * as Debug from 'debug'
var debug = Debug('rare')
import * as _ from 'lodash'

/**
 * map structure after query rare('a', {key: 'value'})
 * [
 *   {
 *     key: 'a',
 *     value: 1,
 *     entries:
 *     [
 *       {
 *         key: {key: 'value'},
 *         value: 2,
 *         entries: []
 *       }
 *     ]
 *   },
 * ]
 */

interface Entry {
    key: any
    value: number
    entries: Array<Entry>
}

interface Options {
    deep: boolean
}

var equal = (value, other) => value === other

var deepEqual = _.isEqual

export = function createRare(options: Options) {
    var map: Array<Entry> = [], lastId = 1
    var deep = options && options.deep
    var compare = deep ? deepEqual : equal
    function rare(...args: any[]): number {
        if (args.length === 0) return 0
                
        var entries = map, match: Entry, hasMatch
        args.forEach(arg => {
            hasMatch = entries.some(entry => {
                // equal or NaN
                if (compare(entry.key, arg) || arg !== arg && entry.key !== entry.key) {
                    match = entry
                    return true
                }
            })
            if (!hasMatch) {
                match = {
                    key: arg,
                    value: lastId++,
                    entries: []
                }
                entries.push(match)
            }
            entries = match.entries
        })
        debug('map', map)
        return match.value
    }
    return rare
}