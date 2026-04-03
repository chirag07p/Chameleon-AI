const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { isEmailConfigured, sendContactEmails } = require('./email');

const app = express();
const PORT = process.env.PORT || 3000;

const adminEmail = process.env.ADMIN_EMAIL || 'pradhanchirag03@gmail.com';

// Middleware — explicit CORS for all origins (dev-friendly)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight OPTIONS for every route
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Verify EmailJS configuration
if (!isEmailConfigured()) {
  console.error('EmailJS is not configured. Set EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY, EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID and EMAILJS_USER_TEMPLATE_ID in .env');
} else {
  console.log('EmailJS is configured and ready to send messages');
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    if (!isEmailConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Email service is not configured on the server. Please contact support directly at pradhanchirag03@gmail.com'
      });
    }

    const { name, company, email, spend, message } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Send both emails via EmailJS templates
    await sendContactEmails({ name, company, email, spend, message, adminEmail });

    res.json({ 
      success: true, 
      message: 'Your request has been submitted successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again or contact us directly at pradhanchirag03@gmail.com' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chameleon AI backend is running' });
});

// Serve mvp.html for root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/mvp.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`🦎 Chameleon AI server running on http://localhost:${PORT}`);
});
