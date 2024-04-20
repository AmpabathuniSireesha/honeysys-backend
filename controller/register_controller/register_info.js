const userRegisterModel = require("../../model/register_model/register_info");
const jwt = require("jsonwebtoken");
const secretKey = "qwerty";
const otpGenerator=require("otp-generator");
const errormessages=require('../../config/errormessages')
const statusmessages=require("../../config/statusmessages")

// Register API
exports.registerUser = async (req, res) => {
  try {
    const {username,email} = req.body;
// Generating OTP
const otp = otpGenerator.generate(6,{digits:true,alphabets:true,upperCase:false,specialChars:false})
    
// Validate request body

    if (!username|| !email ) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.allFieldsRequired,
      });
    } 

    // Validate email format
    const emailRegExp = /.+\@+..+\.+..+/;
    if (!emailRegExp.test(email)) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.invalidEmail,
      });
    }

    // Check if user already exists
    const isUser = await userRegisterModel.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        status: statusmessages.statusFailed,
        message: errormessages.emailExists,
      });
    }

    // Create user
    const newUser = await userRegisterModel.create({
      username,
      email,
      otp:otp
    });

    // Return success response
    return res.status(201).json({
      status: statusmessages.statusSuccess,
      message: "User Registered successfully",
      user: newUser,
      otp:otp
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  }
};

// Login API
exports.loginUser = async (req, res) => {
  try {
    const { email,otp} = req.body;

    // Validate request body
    if (!email || !otp) {
      return res.status(400).json({
        status: statusmessages.statusFailed,
        message: errormessages.allFieldsRequired,

      });
    }

    // Find user by email
    const user = await userRegisterModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: statusmessages.statusFailed,
        message: errormessages.notFound,
      });
    }
// OTP Validationt
if(user.otp!==otp){
  return res.status(401).json({
    status:statusmessages.statusFailed,
    message:errormessages.invalidOtp,
  })
}

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey);

    // Return success response
    return res.status(200).json({
      status: statusmessages.statusSuccess,
      message: "Logged In successfully",
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: statusmessages.statusFailed,
      message: error.message,
    });
  }
};


// Logout API
exports.logoutUser=async(req,res)=>{
  try {
    return res.status(200).json({
      status:statusmessages.statusSuccess,
      message:"Logged out successfully",
    })
  } catch (error) {
    return res.status(500).json({
      status:statusmessages.statusFailed,
      message:error.message
    })
  }
}
