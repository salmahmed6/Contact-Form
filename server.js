const express = require ('express');
const nodemailer = require ('nodemailer');
const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req,res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: req.body.email,
        subject: `Message from ${req.body.name}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        } else{
            console.log('Email sent: '+ info.response);
            res.send('sucess')
        }
    })
    
})

app.listen(PORT, ( )=> {
    console.log(`server is listenning on port ${PORT}`);
})