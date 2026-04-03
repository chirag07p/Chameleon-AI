const emailjs = require('@emailjs/nodejs');

async function testEmail() {
  try {
    const response = await emailjs.send(
      'service_xc8ajbl',
      'template_kb7hnyr',
      {
        admin_email: 'pradhanchirag03@gmail.com',
        name: 'Test',
        company: 'Test Company',
        email: 'test@example.com',
        spend: 'Below INR 5L',
        message: 'This is a test message',
        submitted_at: new Date().toISOString()
      },
      {
        publicKey: 'XKn02ZKH2GS0ezf2v',
        privateKey: 'PcL1_t9n4gNgAcD0QAq2K'
      }
    );
    console.log('Success:', response);
  } catch (err) {
    console.error('Error sending email:');
    console.error(err);
  }
}

testEmail();
