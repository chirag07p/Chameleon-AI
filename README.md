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
- EmailJS for transactional email delivery
- CORS enabled for cross-origin requests
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- EmailJS account (service + templates + keys)

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
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_PRIVATE_KEY=your_emailjs_private_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_ADMIN_TEMPLATE_ID=your_emailjs_admin_template_id
EMAILJS_USER_TEMPLATE_ID=your_emailjs_user_template_id
ADMIN_EMAIL=pradhanchirag03@gmail.com
```

### Setting up EmailJS

1. Create an account at [emailjs.com](https://www.emailjs.com)
2. Create one email service connection in EmailJS
3. Create two templates: one for admin alerts and one for user confirmation
4. Add `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_ADMIN_TEMPLATE_ID`, and `EMAILJS_USER_TEMPLATE_ID` to your `.env`

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
├── index.html          # Interactive MVP demo page (default)
├── landing.html        # Marketing/investor landing page
├── styles.css         # Styling and design system
├── script.js          # Frontend JavaScript
├── server.js          # Express backend server
├── package.json       # Node.js dependencies
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
├── PRD.md            # Product Requirements Document
├── TODO.md           # Development tasks
├── SETUP.md          # Setup instructions
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
heroku config:set EMAILJS_PUBLIC_KEY=your_emailjs_public_key
heroku config:set EMAILJS_PRIVATE_KEY=your_emailjs_private_key
heroku config:set EMAILJS_SERVICE_ID=your_emailjs_service_id
heroku config:set EMAILJS_ADMIN_TEMPLATE_ID=your_emailjs_admin_template_id
heroku config:set EMAILJS_USER_TEMPLATE_ID=your_emailjs_user_template_id
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
