const fs = require('fs');
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const doc = require('rehype-document');
const format = require('rehype-format');
const html = require('rehype-stringify')

const processNode = (fileDir, createNode) => {
    const fileContent = fs.readFileSync(fileDir, 'utf8');
    unified()
        .use(markdown)
        .use(remark2rehype)
        .use(doc)
        .use(format)
        .use(html)
        .process(
            fileContent,
            (err, data) => createNode(fileDir, err, data.contents)
        )
    ;
};

const analyzeDir = (createNode) => (dir) => /\.md$/.test(dir)
    ? processNode(dir, createNode)
    : generateNodesByDir(dir, createNode)
;

const generateNodesByDir = (dir, createNode) => {
    const subDirs = fs.readdirSync(dir).map(subDir => `${dir}/${subDir}`);
    subDirs.forEach(analyzeDir(createNode));
};

module.exports = generateNodesByDir;
