const unified = require('unified');
const english = require('retext-english');
const spell = require('retext-spell');
const dictionary = require('dictionary-en-gb');
const indefiniteArticle = require('retext-indefinite-article');
const simplify = require('retext-simplify');
const smartypants = require('retext-smartypants');
const indefiniteArticle = require('retext-indefinite-article')

const retextProcessor = unified()
    .use(english)
    .use(spell, dictionary)
    .use(indefiniteArticle)
    .use(simplify)
    .use(smartypants)
;

module.exports = retextProcessor;
