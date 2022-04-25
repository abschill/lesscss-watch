#!/usr/bin/env node
const { watch, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');
const { charset_default, css_ext, less_ext, path_default } = require('./enums');
const less = require('less');
const [,,
    watchPath = path_default, 
    encoding = charset_default
] = process.argv;
const { log } = console;
const wpLink = join(process.cwd(), watchPath)
watch(wpLink, { recursive: true, encoding }, ( _, fileName) => {
    const filePath = resolve(wpLink, fileName);
    const fileContent = readFileSync(filePath).toString(encoding);
    if(!fileName.includes(less_ext)) return;
    // render it brah
    less.render(fileContent).then( content => {
        writeFileSync(filePath.replace(less_ext, css_ext), content.css);
        log(`\x1b[32mStyles Updated\x1b[0m: ${fileName}\n
Full Path: \x1b[35m${filePath}\x1b[0m`);
    });
});
