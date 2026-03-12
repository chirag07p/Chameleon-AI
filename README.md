# 🦎 Chameleon AI – Contextual Ad Camouflage Platform

A contextual ad platform that dynamically camouflages ads to match any website's native design, boosting CTR while protecting user privacy.

## Features

- **Real-time Visual Camouflage**: Match host fonts, colors, and spacing using AI-driven design analysis
- **Cookieless Targeting**: Zero-data targeting based on live page content and semantics
- **Brand-Safety Guardrails**: Semantic and sentiment filters to avoid negative contexts
- **Interactive Ad Creator**: Design and preview contextual ads in different themes
- **Contact Form with Email Backend**: Automated email notifications for service requests

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with mobile-first approach
- Interactive previews and theme switching

### Backend
- Node.js + Express.js
- Nodemailer for email functionality
- CORS enabled for cross-origin requests
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Gmail account with App Password enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chirag07p/Chameleon-AI.git
cd Chameleon-AI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your email credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=pradhanchirag03@gmail.com
```

### Setting up Gmail App Password

1. Go to your [Google Account Security settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Navigate to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it in your `.env` file

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/contact`
Submit contact form data and send email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "ABC Agency",
  "email": "john@agency.com",
  "spend": "25-100",
  "message": "Looking to improve CTR on our campaigns"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your request has been submitted successfully!"
}
```

### GET `/api/health`
Check server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Chameleon AI backend is running"
}
```

## Project Structure

```
Chameleon-AI/
├── index.html          # Main landing page
├── mvp.html           # Interactive demo page
├── styles.css         # Styling and design system
├── script.js          # Frontend JavaScript
├── server.js          # Express backend server
├── package.json       # Node.js dependencies
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
├── PRD.md            # Product Requirements Document
├── TODO.md           # Development tasks
└── README.md         # This file
```

## Features in Detail

### Visual Camouflage
Ads automatically adapt to match:
- Typography and font families
- Color schemes and palettes
- Spacing and layout patterns
- Overall design aesthetic

### Privacy-First Approach
- No third-party cookies
- No user fingerprinting
- Contextual intelligence only
- GDPR and privacy law compliant

### Email Notifications
When a user submits the contact form:
1. **Admin notification**: Full details sent to your configured admin email
2. **User confirmation**: Professional thank-you email sent to the user
3. Both emails use responsive HTML templates with branding

## Deployment

### Deploy to Heroku
```bash
heroku create chameleon-ai
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set ADMIN_EMAIL=admin@yourdomain.com
git push heroku main
```

### Deploy to Vercel
```bash
vercel --prod
```
Configure environment variables in the Vercel dashboard.

### Deploy to Railway
```bash
railway login
railway init
railway up
```
Add environment variables in Railway dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

**Chirag Pradhan**  
Email: pradhanchirag03@gmail.com  
GitHub: [@chirag07p](https://github.com/chirag07p)

## Roadmap

- [ ] Live ad serving integration
- [ ] Multi-tenant dashboard
- [ ] Advanced analytics pipeline
- [ ] Machine learning for sentiment analysis
- [ ] Integration with major ad exchanges
- [ ] A/B testing framework

---

Built with ❤️ for the future of contextual advertising
