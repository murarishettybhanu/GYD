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
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

      req.flash('registrationErrors', registrationErrors)
      req.flash('data', req.body)
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
})
}
