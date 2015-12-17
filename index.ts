///<reference path="typings/debug/debug.d.ts"/> 
import * as Debug from 'debug'
var debug = Debug('rare')

/**
 * map structure after query rare('a', {key: 'value})
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

export = function createRare() {
    var map: Array<Entry> = [], lastId = 1
    function rare(...args: any[]): number {
        if (args.length === 0) return 0
                
        var entries = map, match: Entry, hasMatch
        args.forEach(arg => {
            hasMatch = entries.some(entry => {
                if (entry.key === arg || arg !== arg && entry.key !== entry.key) {
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
