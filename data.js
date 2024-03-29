let files = {};

function getFiles() {
    return files;
}

function createFile(fileName) {
    files[fileName] = '';
}

function updateFile(fileName, fileContent) {
    files[fileName] = fileContent;
}

module.exports = { getFiles, createFile, updateFile };
