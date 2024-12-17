const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // Replace with your email service
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: "kashyapshivram512@gmail.com",
        pass:  'kmbc nqqe cavl eyma',
      },
    });
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = sendOtp;
