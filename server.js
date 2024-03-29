const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../frontend'));

// Get all files
app.get('/api/files', (req, res) => {
    res.json(data.getFiles());
});

// Create a new file
app.post('/api/files', (req, res) => {
    const fileName = req.body.fileName;
    data.createFile(fileName);
    res.sendStatus(201);
});

// Update file content
app.put('/api/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const fileContent = req.body.fileContent;
    data.updateFile(fileName, fileContent);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Delete a file
app.delete('/api/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    data.deleteFile(fileName);
    res.sendStatus(200);
});

// In data.js
function deleteFile(fileName) {
    delete files[fileName];
}
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const data = require('./data');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../frontend'));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-password' // Your email password
    }
});

// Get all files
app.get('/api/files', (req, res) => {
    res.json(data.getFiles());
});

// Create a new file
app.post('/api/files', (req, res) => {
    const fileName = req.body.fileName;
    data.createFile(fileName);
    res.sendStatus(201);
});

// Update file content
app.put('/api/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const fileContent = req.body.fileContent;
    data.updateFile(fileName, fileContent);
    res.sendStatus(200);
});

// Delete a file
app.delete('/api/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    data.deleteFile(fileName);
    res.sendStatus(200);
});

// Create user account
app.post('/api/account', (req, res) => {
    const { email, password } = req.body;
    // Here you can save the email and password to a database for future authentication
    // For simplicity, I'll just send an email with the provided information
    sendEmail(email, password);
    res.sendStatus(201);
});

// Function to send email upon account creation
function sendEmail(email, password) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Account Created',
        text: `Your account has been successfully created.\n\nEmail: ${email}\nPassword: ${password}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
