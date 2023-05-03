var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'blinkkopticals@gmail.com',
    pass: 'xdjxysqboyebnfyr'
  }
});


const sendOtpMail=(receiver,otp)=>{
    var mailOptions = {
        from: 'blinkkopticals@gmail.com',
        to: receiver,
        subject: 'OTP for login',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"><img style="width:15em" src='https://firebasestorage.googleapis.com/v0/b/blinkkopticals-6c609.appspot.com/o/Blinkk.png?alt=media&token=1bb4807c-2ec0-4078-bbc3-eec0da794288' /></a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Blinkk. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br /><img style="width:10em" src='https://firebasestorage.googleapis.com/v0/b/blinkkopticals-6c609.appspot.com/o/Blinkk.png?alt=media&token=1bb4807c-2ec0-4078-bbc3-eec0da794288' /></p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Blinkk opticals</p>
            <p>Rajgram, Hospital Road</p>
            <p>Rajgram</p>
          </div>
        </div>
      </div>`
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
      );
}

module.exports=sendOtpMail;
