const fs = require('fs');

const createPublishDirectory = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);

module.exports = createPublishDirectory;