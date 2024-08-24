// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('./config/mongoose.config');
const newRoute = require('./routes/newRoutes');
const userRoute = require('./routes/user.routes');
const subscribeRoute = require('./routes/subscribeRoutes');
const sponsorRoute = require('./routes/sponsorRoutes');
const categoryRoute = require('./routes/categoryRoutes');


const app = express();
const PORT = process.env.API_DOCKER_PORT || 8000;
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://srv586727.hstgr.cloud:8000 http://srv586727.hstgr.cloud:4000; script-src 'self';"
  );
  next();
});

// CORS setup
app.use(cors({
  origin: ['http://srv586727.hstgr.cloud:4000', 'http://tulibnews.com'], // Add your frontend's domain here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Google Generative AI setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Use environment variable

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

// API route for chat completion
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log(messages);
  const prompt = `translate this in english and delete all html tags   ${messages}`;
  try {
    const text = await run(prompt);
    console.log(text);
    res.json({ translateText: text });
  } catch (error) {
    console.error('Error calling Google Generative AI API:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from Google Generative AI' });
  }
});

// Send verification code
app.post('/send-verification-code', async (req, res) => {
  const { nameOrWord } = req.body;

  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Create a transporter using environment variables for sensitive data
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable
      pass: process.env.EMAIL_PASS, // Use environment variable
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Verification Code Request from TULIB',
    text: `Name/Word: ${nameOrWord}\nVerification Code: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Verification code sent to admin.', verificationCode });
    }
  });
});

// Route setup
app.use('/api/articles', newRoute);

app.use('/api/subscriber', subscribeRoute);
app.use('/api/sponsors', sponsorRoute);
app.use('/api/categories', categoryRoute);
app.use('/api', userRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://srv586727.hstgr.cloud:${PORT}`);
});
