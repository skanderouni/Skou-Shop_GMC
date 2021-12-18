const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
const User = require('../models/User');

const transporter = mailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
});
function sendmail(mailOptions) {
    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.signup = (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then((users) => {
            console.log(users)
            if (users.length >= 1) {
                console.log("true")
                return res.status(409).json({error: 'Mail Exists'});
            } else {
                bcrypt.hash(req.body.password, 10, async (error, hash) => {
                    if (error) {
                        return res.status(500).json(error);
                    } else {
                        const resetCode = Math.floor(Math.random() * 9999);
                        const user = new User({
                          _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              FirstName: req.body.FirstName,
              LastName: req.body.LastName,
              resetCode: resetCode,
                        });
                        let mailOptions = {
                            from: 'Aikido.ClubT@gmail.com',
                            to: req.body.email,
                            subject: 'Verify your Account',
                            text: 'Here is your verification code: ' + resetCode
                        };
                        sendmail(mailOptions);
                        await user.save();
                        return res.status(200).json(user);
                    }
                });
            }
        });
};
exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).json({message: 'E-mail does not exist'});
    }
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPassword) {
        return res.status(400).send({message: 'Password is invalid'});
    }
    if (!user.isActive) {
        return res.status(400).send({message: 'Account is disabled'});
    }
    return await res.status(200).json(user);
};
exports.forgetPassword = async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if (!emailExist) {
        return res.status(400).json({message: 'Email does not exist'});
    }
    const resetCode = Math.floor(Math.random() * 9999);
    User.findOneAndUpdate({email: req.body.email}, {$set: {resetCode: resetCode}}, function (error, user) {
        if (error) {
            return res.status(error.code).json(error);
        } else {
            let mailOptions = {
                from: 'Aikido.ClubT@gmail.com',
                to: req.body.email,
                subject: 'Reset Password',
                text: 'Here is your verification code: ' + resetCode
            };
            sendmail(mailOptions);
            return res.status(200).json({message: "Reset code sent successfully", user});
        }
    });
};
exports.activateAccount = async (req, res) => {
    const code = req.body.code;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'E-mail does not exist' });
    }
    if (user.resetCode === code) {
        User.findOneAndUpdate({ email: req.body.email }, { $set: { isActive: true } }, function (error, user) {
            if (error) {
                return res.status(error.code).json(error);
            }
            return res.status(200).json(user);
        });
    } else {
        return res.status(400).json({ message: "Invalid verification code" });
    }
};
exports.resetPassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).json({message: 'Email does not exist'});
    }
    if (user.resetCode === req.body.resetCode) {
        User.findOneAndUpdate({email: req.body.email}, {$set: {password: bcrypt.hashSync(req.body.password, 10)}}, function (error, user) {
            if (error) {
                return res.status(error.code).json(error);
            }
            return res.status(200).json({message: "Password updated successfully", user});
        });
    } else {
        return res.status(400).json({message: "Invalid credentials!"});
    }
};
exports.updatePassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).json({message: 'Email does not exist'});
    }
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPassword) {
        return res.status(400).send({message: 'Password is invalid'});
    } else {
        User.findOneAndUpdate({email: req.body.email}, {$set: {password: bcrypt.hashSync(req.body.repassword, 10)}}, function (error, user) {
            if (error) {
                return res.status(error.code).json(error);
            }
            return res.status(200).json({message: "Password updated successfully", user});
        });
    }
};
exports.deleteAccount = (req, res) => {
    const email = req.body.email;
    User.remove({email: email})
        .exec()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(error.code).json({error: error});
        });
};
exports.changeRole = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).json({message: 'E-mail does not exist'});
    }
    User.findOneAndUpdate({email: req.body.email}, {$set: {isAdmin: !user.isAdmin}}, function (error, user) {
        if (error) {
            return res.status(error.code).json(error);
        }
        return res.status(200).json({message: "Password updated successfully", user});
    });
};


/*const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ error: 'User exists' });
    }

    const newUser = new User({ ...req.body });

    const hashedpassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashedpassword;

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: '3h' }
    );

    return res.status(200).json({ user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: '3h' }
    );
   return res.status(200).json({ user: findUser });
  } catch (error) {
    res.status(500).json({ error: 'Cannot login' });
  }
};*/
