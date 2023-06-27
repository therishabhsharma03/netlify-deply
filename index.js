const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const path = require("path");



const app = express();
const port = 3000;

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.use('/css', express.static(path.join(path.resolve(), "public/css")));
app.use('/images', express.static(path.join(path.resolve(), "public/images")));
app.use('/js', express.static(path.join(path.resolve(), "public/js")));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route for handling the form submission
app.post('/submit', (req, res) => {
  // Extract the user data from the request body
  const { name, contactNumber, location, flatType, budget } = req.body;

  // Create the email content
  const emailContent = `
    <h2>New Flat Enquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Contact Number:</strong> ${contactNumber}</p>
    <p><strong>Preferred Location:</strong> ${location}</p>
    <p><strong>Flat Type:</strong> ${flatType}</p>
    <p><strong>Budget:</strong> ${budget}</p>
  `;

  // Configure the nodemailer transport
  const transporter = nodemailer.createTransport({
    // Provide your email server details here (e.g., SMTP)
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'apicheck11@gmail.com',
      pass: 'atnondyksdbdaxwv'
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'apicheck11@gmail.com',
    to: 'therishabhsharma03@gmail.com', // Replace with the admin email address
    subject: 'New Flat Enquiry',
    html: emailContent
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while submitting the form.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Form submitted successfully!' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
