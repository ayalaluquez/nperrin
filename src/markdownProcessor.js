const unified = require('unified');
const markdown = require('remark-parse');
const remark2retext = require('remark-retext');
const toc = require('remark-toc');
const retextProcessor = require('./retextProcessor');

const markdownProcessor = unified()
    .use(markdown)
    .use(remark2retext, retextProcessor)
    .use(toc)
;

module.exports = markdownProcessor