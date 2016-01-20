build: dist/index.js

dist/index.js: dist/ts/index.js
	./node_modules/.bin/babel dist/ts/index.js > dist/index.js

dist/ts/index.js: index.ts
	./node_modules/.bin/tsc

watch:
	fswatch -o index.ts | xargs -n1 -I{} make

test: build
	npm test

clean:
	rm -rf dist/*

.PHONY: build watch clean test
