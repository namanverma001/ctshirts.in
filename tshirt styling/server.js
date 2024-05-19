const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5500; // Use the same port as in the error message

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handler for saving image
app.post('/saveimage', (req, res) => {
    const imageData = req.body.imageData;

    // Decode base64 image data
    const decodedImage = Buffer.from(imageData, 'base64');

    // Specify the file path where you want to save the image
    const filePath = path.join(__dirname, 'images', 'saved_image.png');

    // Write the decoded image data to the file
    fs.writeFile(filePath, decodedImage, (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image');
        } else {
            console.log('Image saved successfully');
            res.status(200).send('Image saved successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
