
module.exports = function(ssen) {

  // middleware function to check for logged-in users
  return {
    logInChecker = (req, res, next) => {
      if (!ssen.user) {
        res.redirect("/auth/login?massage=pleaseLogIn");
      } else {
        next();
      }
    },
  };

};
