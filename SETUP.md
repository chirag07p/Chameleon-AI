# Setup Instructions for Chameleon AI Backend

## Quick Start Guide

### 1. Install Dependencies

First, install all required Node.js packages:

```bash
npm install
```

This will install:
- express (web server)
- resend (email functionality)
- cors (cross-origin requests)
- dotenv (environment variables)
- body-parser (form data parsing)

### 2. Configure Email Settings

#### Option A: Using Resend (Recommended)

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Create a Resend account:**
   - Go to [resend.com](https://resend.com) and sign in

3. **Generate an API key:**
   - Open your Resend dashboard
   - Create a new API key with send permissions

4. **Update your `.env` file:**
   ```env
   PORT=3000
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=Chameleon AI <onboarding@resend.dev>
   ADMIN_EMAIL=pradhanchirag03@gmail.com
   ```

   Replace:
   - `re_xxxxxxxxxxxxxxxxxxxxxxxx` with your Resend API key
   - `EMAIL_FROM` with your verified sender/domain in production
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

#### "Resend is not configured"
- Double-check your `.env` file values
- Ensure `RESEND_API_KEY` is set correctly
- Ensure `EMAIL_FROM` is set to a valid sender identity

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
- Verify `RESEND_API_KEY` and `EMAIL_FROM` in `.env`
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
   heroku config:set RESEND_API_KEY=your-resend-api-key
   heroku config:set EMAIL_FROM="Chameleon AI <onboarding@resend.dev>"
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

To customize the email templates, edit the HTML in `server.js`:

- **Admin notification email:** Line ~60
- **User confirmation email:** Line ~110

The emails use responsive HTML with inline CSS for maximum compatibility.

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
- ✅ Store and rotate your Resend API key securely
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
