const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, spend, message } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Map spend value to readable format
    const spendMap = {
      'lt5': 'Below ₹5L',
      '5-25': '₹5L – ₹25L',
      '25-100': '₹25L – ₹1Cr',
      'gt100': 'Above ₹1Cr'
    };

    const spendText = spendMap[spend] || 'Not specified';

    // Email content for admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'pradhanchirag03@gmail.com',
      subject: `🦎 Chameleon AI – New Service Request from ${name || 'Unknown'}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Service Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Chameleon AI Platform</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Company/Agency:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Monthly Ad Spend:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${spendText}</td>
              </tr>
            </table>

            <h3 style="color: #1e293b; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Their Goals</h3>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <p style="color: #334155; line-height: 1.6; margin: 0;">${message || 'No specific goals mentioned'}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Email content for user confirmation
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Chameleon AI!',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You${name ? ', ' + name : ''}!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">We've received your service request</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #334155; line-height: 1.8; font-size: 16px;">
              Our team at <strong>Chameleon AI</strong> is excited to help you reinvent your ad experience!
            </p>
            
            <h3 style="color: #1e293b; margin-top: 25px; margin-bottom: 15px;">What happens next?</h3>
            <ul style="color: #475569; line-height: 1.8; padding-left: 20px;">
              <li>We'll review your submission within <strong>2 business days</strong></li>
              <li>Our team will audit your current ad placements and performance</li>
              <li>We'll prepare a tailored strategy showing potential uplift with contextual camouflage</li>
              <li>You'll receive a personalized demo of how Chameleon AI works</li>
            </ul>

            <div style="background: #f0f4ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <h4 style="margin: 0 0 10px 0; color: #1e293b;">Your submission summary:</h4>
              <p style="color: #475569; margin: 5px 0; line-height: 1.6;">
                <strong>Monthly Spend:</strong> ${spendText}<br>
                <strong>Focus Area:</strong> ${message || 'General inquiry'}
              </p>
            </div>

            <p style="color: #334155; line-height: 1.8;">
              In the meantime, feel free to explore our <a href="https://github.com/chirag07p/Chameleon-AI" style="color: #667eea; text-decoration: none;">GitHub repository</a> or reach out directly at <a href="mailto:pradhanchirag03@gmail.com" style="color: #667eea; text-decoration: none;">pradhanchirag03@gmail.com</a>.
            </p>

            <div style="text-align: center; margin-top: 30px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong style="color: #1e293b;">The Chameleon AI Team</strong>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

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
