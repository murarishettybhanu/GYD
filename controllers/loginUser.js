const bcrypt = require('bcryptjs')
const User = require('../database/models/User')

module.exports = (req, res) => {
  const { email, password } = req.body;
  // try to find the user
  User.findOne({ email }, (error, user) => {
    if (user) {
      // compare passwords.
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.email = user.email;
          req.flash('loginSucces','You Are Logged In')
          res.redirect('/')
        } else {
          req.flash('IncorrectPwd','You Have Entered an Incorrect Password')
          res.redirect('/auth/login')
        }
      })
    } else { 
      req.flash('EmailDoesnot','Email does not exist')
      return res.redirect('/auth/login')
    }
  })
}
