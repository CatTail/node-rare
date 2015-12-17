var should = require('should')
var createRare = require('..')

describe('Rare', function() {
    var rare

    beforeEach(function() {
        rare = createRare()
    })

    it('should create id generator function', function() {
        should(rare).be.a.Function()
        should(rare({key: 'value'})).be.a.Number()
    })

    it('should generate unique id for any value', function() {
        // primitive
        should(rare(1)).be.equal(rare(1))
        should(rare(1.2)).be.equal(rare(1.2))
        should(rare('a')).be.equal(rare('a'))

        // object
        var arr = [], obj = {}
        should(rare(arr)).be.equal(rare(arr))
        should(rare(obj)).be.equal(rare(obj))
        should(rare([])).be.not.equal(rare([]))
        should(rare({})).be.not.equal(rare({}))

        // unfixed length
        should(rare('a', 'b')).be.not.equal(rare('a'))
        should(rare('a', 'b')).be.not.equal(rare('a', 'a'))
        should(rare('a', 'b')).be.equal(rare('a', 'b'))
        should(rare('a', {})).be.not.equal('a', {})
    })

    it('should handle without arguments', function() {
        // special case without arguments
        should(rare()).be.not.equal(rare(undefined))
    })

    it('should handle NaN as equal even through NaN !== NaN', function() {
        should(rare(NaN)).be.equal(rare(NaN))
    })
})
