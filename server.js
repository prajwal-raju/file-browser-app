const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up a route to serve the list of files
app.get('/files', (req, res) => {
    const filesDirectory = path.join(__dirname, 'files');

    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            res.status(500).send('Error reading files directory');
        } else {
            res.json(files);
        }
    });
});

// Set up a route to handle file content retrieval
app.get('/file/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'files', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

// Set up a route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

