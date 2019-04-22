const fs = require('fs');

const createFile = (fileDir, data) => {
    const containerFolderDir = fileDir.replace(/(.*)\/(.*)$/, '$1');
    if(!fs.existsSync(containerFolderDir)) {
        fs.mkdirSync(containerFolderDir, { recursive: true });
    }
    const file = fs.createWriteStream(fileDir);
    file.write(data);
    file.close();
}

module.exports = createFile;
