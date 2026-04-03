# Setup Instructions for Chameleon AI Backend

## Quick Start Guide

### 1. Install Dependencies

First, install all required Node.js packages:

```bash
npm install
```

This will install:
- express (web server)
- @emailjs/nodejs (email functionality)
- cors (cross-origin requests)
- dotenv (environment variables)
- body-parser (form data parsing)

### 2. Configure Email Settings

#### Option A: Using EmailJS (Recommended)

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Create an EmailJS account:**
   - Go to [emailjs.com](https://www.emailjs.com) and sign in

3. **Set up EmailJS resources:**
   - Create one email service connection
   - Create two templates (admin alert + user confirmation)
   - Generate public and private keys

4. **Update your `.env` file:**
   ```env
   PORT=3000
   EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   EMAILJS_PRIVATE_KEY=your_emailjs_private_key
   EMAILJS_SERVICE_ID=your_emailjs_service_id
   EMAILJS_ADMIN_TEMPLATE_ID=your_emailjs_admin_template_id
   EMAILJS_USER_TEMPLATE_ID=your_emailjs_user_template_id
   ADMIN_EMAIL=pradhanchirag03@gmail.com
   ```

   Replace:
   - EmailJS values with keys/IDs from your EmailJS dashboard
   - Update `ADMIN_EMAIL` if you want notifications sent elsewhere

### 3. Run the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start at `http://localhost:3000`

### 4. Test the Backend

1. **Health Check:**
   Open your browser and go to:
   ```
   http://localhost:3000/api/health
   ```
   You should see: `{"status":"ok","message":"Chameleon AI backend is running"}`

2. **Test Contact Form:**
   - Open `http://localhost:3000`
   - Scroll to the "Ready to reinvent your ad experience?" section
   - Fill out the contact form
   - Click "Request service"
   - Check your email for the confirmation

### 5. Troubleshooting

#### "EmailJS is not configured"
- Double-check your `.env` file values
- Ensure all required `EMAILJS_*` keys/IDs are set

#### Port already in use
Change the PORT in `.env`:
```env
PORT=3001
```

#### CORS errors
The backend is configured to allow all origins. For production, update `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

#### Email not sending
- Check spam/junk folder
- Verify `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_ADMIN_TEMPLATE_ID`, and `EMAILJS_USER_TEMPLATE_ID` in `.env`
- Check server console for error messages

### 6. Deploy to Production

#### Deploy to Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   heroku create chameleon-ai-backend
   ```

3. Set environment variables:
   ```bash
   heroku config:set EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   heroku config:set EMAILJS_PRIVATE_KEY=your_emailjs_private_key
   heroku config:set EMAILJS_SERVICE_ID=your_emailjs_service_id
   heroku config:set EMAILJS_ADMIN_TEMPLATE_ID=your_emailjs_admin_template_id
   heroku config:set EMAILJS_USER_TEMPLATE_ID=your_emailjs_user_template_id
   heroku config:set ADMIN_EMAIL=pradhanchirag03@gmail.com
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

#### Deploy to Railway

1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

3. Add environment variables in Railway dashboard

#### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in the dashboard

### 7. Email Template Customization

To customize emails, edit your templates in the EmailJS dashboard.
The backend sends template params from `email.js`.

### 8. API Usage

#### POST /api/contact

**Request:**
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    company: 'ABC Agency',
    email: 'john@agency.com',
    spend: '25-100',
    message: 'Looking to improve CTR'
  })
})
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your request has been submitted successfully!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again..."
}
```

### 9. Security Best Practices

- ✅ Never commit `.env` file to Git (it's in .gitignore)
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS in production
- ✅ Store and rotate your EmailJS private key securely
- ✅ Rate limit the contact form endpoint in production
- ✅ Add CAPTCHA for spam prevention

### 10. Next Steps

- [ ] Set up email analytics tracking
- [ ] Add reCAPTCHA to prevent spam
- [ ] Implement rate limiting
- [ ] Add email queue for better reliability
- [ ] Set up monitoring and alerts
- [ ] Create admin dashboard for viewing submissions

## Support

For issues or questions:
- Email: pradhanchirag03@gmail.com
- GitHub: https://github.com/chirag07p/Chameleon-AI

---

✨ Your backend is now ready! Users can submit the contact form and receive professional email confirmations.
