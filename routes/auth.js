const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');

JWT_SECRET = "usman1$d@";
//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    success=false;    
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);


    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);7
    success = true;
    res.json({success, authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Route 2: authenticate a user with login using: POST '/auth/login' No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists(),
  

], async (req, res) => {
  let success = false;


  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    success = false;
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
     
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    success = false;
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }


    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;       
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route 3: Get logged in with user data using: POST '/auth/getuser'. login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})




module.exports = router