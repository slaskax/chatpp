build: chatpp.js chatpp.min.js

chatpp.js: $(shell find src -type f)
	npx tsc

chatpp.min.js: chatpp.js
	npx uglifyjs chatpp.js -c passes=2 -m --v8 --source-map -o chatpp.min.js

clean:
	rm -f chatpp.js chatpp.min.js chatpp.min.js.map

rebuild: clean build

watch:
	while true; do $(MAKE) -q || $(MAKE); sleep 0.5; done

.PHONY: clean build rebuild watch