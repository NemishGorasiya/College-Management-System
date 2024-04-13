import otpGenerator from "otp-generator";
import emailTransport from "../config/nodemailer.config.js";
import OTP from "../modules/OTP/OTP.js";
import Admin from "../modules/Admin/Admin.js";
import Faculty from "../modules/Faculty/Faculty.js";
import Student from "../modules/Student/Student.js";

const getUserType = (user) => {
  if (user instanceof Student) {
    return "student";
  } else if (user instanceof Faculty) {
    return "faculty";
  } else if (user instanceof Admin) {
    return "admin";
  }
}

export const otpEmailGeneration = async (user) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const SENDER_EMAIL = "cmsldce@gmail.com";

  // const otpDoc = new OTP({
  //   otp,
  //  externalType: getUserType(user),
  //   email: user.email,
  //   userId: user._id,
  // });
  // await otpDoc.save();
  //create a new OTP document in the database

  const mailOptions = {
    from: {
      name: "CMS-LDCE",
      address: SENDER_EMAIL
    },
    to: user.email,
    subject: "OTP for password reset",
    title: "Password Reset OTP",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
  <style>
    /* Styles for the email */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
      text-align: center;
    }

    p {
      color: #555;
      font-size: 16px;
      line-height: 1.6;
    }

    strong {
      color: #007bff;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
    }
  </style>
</head>
<body>

  <div class="container">
  <h1 style="text-align: center;">CMS-LDCE</h1>
    <h2 style="text-align: center;">Password Reset OTP</h2>
    <p>Your OTP for password reset is: <strong>${otp}</strong></p>
    <p>Please use this OTP to reset your password. Do not share it with anyone.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p class="footer">Thank you!</p>
  </div>

</body>
</html>
    `,
  }

  emailTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
};

otpEmailGeneration({
  email: "naineelsoyantar@gmail.com"
})