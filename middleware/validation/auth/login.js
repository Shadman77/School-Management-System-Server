
  
  const login_validate = (req, res, next) => {
    console.log("Middleware");
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
  
    // Email
    if (typeof email === "undefined") {
      return res.status(400).json({
        msg: "Email required",
        field: ["email"],
      });
    }
 
  
    //  Password
    if (typeof req.body.password === "undefined") {
      return res.status(400).json({
        msg: "Password required",
        field: ["password"],
      });
    }


};
module.exports=login_validate;