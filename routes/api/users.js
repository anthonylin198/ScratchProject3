// Router for user registrations
const express = require ("express")
const router = express.Router();

const User = require("../../models/User") // bringing in the user model



// Successfully making the post request
router.post("/", async(req, res) => {
  const {name, email, password, favorites, beginner, intermediate, advanced} = req.body
  try{
    
    // checking if the user already exists
    let user = await User.findOne({ email }); // don't need to do email: email since the email is the same name
      // if user already exists, return an error
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "user already exists" }] });
    }


    // Else add the user to the database
    user = new User({
      name,
      email,
      password,
    });
    user.save(); // throwing an error here right now
    res.json(req.body)

  } catch(err) {
    console.log("error")
  }
})


module.exports = router;