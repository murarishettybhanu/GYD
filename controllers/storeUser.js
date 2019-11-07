const User = require('../database/models/User')
const path = require('path');

module.exports = (req, res) => {
  const { image } = req.files

  image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
    User.create({
      ...req.body,
      image: `/posts/${image.name}`
      }, (error, user) => {
    if (error) {
      req.flash('RegistrationUnSuccess', "you have Not registered")
      return res.redirect('/auth/register')
    }
    req.flash('RegistrationSuccess', "you have registered")
    res.redirect('/auth/login')
  })
})
}
