/**
 * Build the code for browser using
 *
 * @date 17/4/10
 */
'use strict';

const path = require('path');
const fs = require('fs');
const browserify = require('browserify');

browserify({
    entries: [path.join(__dirname, '../index.js')]
})
.bundle()
.pipe(fs.createWriteStream(path.join(__dirname, '../dist/canvas-zhihu.js')));