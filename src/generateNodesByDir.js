const fs = require('fs');
const format = require('rehype-format');
const html = require('rehype-stringify');
const remark2rehype = require('remark-rehype');
const stringify = require('retext-stringify');

const processHtml = (processor, fileContent, processFile) => processor
    .use(remark2rehype)
    .use(format, { indent: 4 })
    .use(html)
    .process(
        fileContent,
        (error, data) => processFile(
            fileDir.replace('md', 'html'),
            error,
            data.contents
        )
    );

const processRaw = (processor, fileContent, processFile) => processor
    .use(stringify)
    .process(
        fileContent,
        (error, data) => processFile(
            fileDir.replace('md', 'txt'),
            error,
            data.contents
        )
    );

const processMarkdownFile = (fileDir, processFile) => {
    const fileContent = fs.readFileSync(fileDir, 'utf8');
    processHtml(markdownProcessor, fileContent, processFile);
    processRaw(markdownProcessor, fileContent, processFile);
};

const processMarkdownDirectory = (dir, processFile) => {
    const subDirs = fs.readdirSync(dir).map(subDir => `${dir}/${subDir}`);
    subDirs.forEach(subDir => {
        if(/\.md$/.test(subDir)) {
            return processMarkdownFile(subDir, processFile);
        }
        processMarkdownDirectory(subDir, processFile);
    });
};

module.exports = generateNodesByDir;
