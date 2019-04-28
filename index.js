const generateNodesByDir = require('./src/generateNodesByDir');
const createFile = require('./src/createFile');

const PUBLISH_DIR = `${__dirname}/${process.env.PUBLISH_DIR || 'public'}`;
const BASE_DIR = `${__dirname}/data`;

generateNodesByDir(BASE_DIR, (absoluteFileDir, err, data) => {
    if(err) {
        console.log(`${absoluteFileDir} processing failed`);
        process.exit(1);
    }
    const publishFileDir = absoluteFileDir.replace(BASE_DIR, PUBLISH_DIR);
    createFile(publishFileDir, data); // replace with bash
});
