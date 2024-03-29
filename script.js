// Fetch all files from the backend on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchFiles();
});

function fetchFiles() {
    fetch('/api/files')
        .then(response => response.json())
        .then(files => {
            renderFiles(files);
        })
        .catch(error => console.error('Error fetching files:', error));
}

function renderFiles(files) {
    let fileListDiv = document.getElementById("file-list");
    fileListDiv.innerHTML = "";
    for (let fileName in files) {
        let fileContent = files[fileName];
        let fileDiv = document.createElement("div");
        fileDiv.innerHTML = `<strong>${fileName}</strong>: ${fileContent}`;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteFile(fileName);
        };
        fileDiv.appendChild(deleteButton);
        fileListDiv.appendChild(fileDiv);
    }
}

function deleteFile(fileName) {
    fetch(`/api/files/${fileName}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchFiles();
        } else {
            console.error('Error deleting file');
        }
    })
    .catch(error => console.error('Error deleting file:', error));
}
