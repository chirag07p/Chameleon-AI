const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
const emailJsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;
const emailJsServiceId = process.env.EMAILJS_SERVICE_ID;
const adminTemplateId = process.env.EMAILJS_ADMIN_TEMPLATE_ID;
const userTemplateId = process.env.EMAILJS_USER_TEMPLATE_ID;
const emailTimeoutMs = Number(process.env.EMAIL_TIMEOUT_MS || 15000);

const spendMap = {
  lt5: 'Below INR 5L',
  '5-25': 'INR 5L - INR 25L',
  '25-100': 'INR 25L - INR 1Cr',
  gt100: 'Above INR 1Cr'
};

const isEmailConfigured = () =>
  Boolean(
    emailJsPublicKey &&
      emailJsPrivateKey &&
      emailJsServiceId &&
      adminTemplateId &&
      userTemplateId
  );

const sendWithTimeout = (templateId, params, timeoutMs) => {
  const payload = {
    service_id: emailJsServiceId,
    template_id: templateId,
    user_id: emailJsPublicKey,
    accessToken: emailJsPrivateKey,
    template_params: params
  };

  const fetchPromise = fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost'
    },
    body: JSON.stringify(payload)
  }).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.text();
  });

  return Promise.race([
    fetchPromise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email send timed out')), timeoutMs);
    })
  ]);
};

const sendContactEmails = async ({ name, company, email, spend, message, adminEmail }) => {
  const spendText = spendMap[spend] || 'Not specified';
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const adminParams = {
    admin_email: adminEmail,
    name: name || 'Not provided',
    company: company || 'Not provided',
    email,
    spend: spendText,
    message: message || 'No specific goals mentioned',
    submitted_at: `${submittedAt} IST`
  };

  const userParams = {
    name: name || 'there',
    email,
    spend: spendText,
    message: message || 'General inquiry'
  };

  await sendWithTimeout(adminTemplateId, adminParams, emailTimeoutMs);
  await sendWithTimeout(userTemplateId, userParams, emailTimeoutMs);
};

module.exports = {
  isEmailConfigured,
  sendContactEmails
};
