const passport = require('passport')

// Config
const {
  bearer,
  login
} = require('../lib/passport')

passport.use('bearer', bearer)
passport.use('login', login)

const authenticate = (req, res, next) => passport.authenticate('bearer', {
  session: false,
  failureFlash: true
}, (err, user, info) => {
  if (err || !user) {
    req.user = false
    next()
  } else {
    req.user = user
    return next()
  }
})(req, res, next)

const signin = (req, res, next) => passport.authenticate('login', {
  session: false,
  failureFlash: true
}, (err, user, info) => {
  if (err) {
    switch (err.name) {
      case 'bad_password':
        err.code = 401
        next(err)
        break
      default:
        next(new Error('Si è verificato un errore durante il login.'))
        break
    }
  } else if (!user) {
    return res.status(401).json({
      message: info
    })
  } else {
    req.user = user
    return next()
  }
})(req, res, next)

module.exports = {
  authenticate,
  signin
}
