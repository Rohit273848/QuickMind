import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🧪 Basic manual check (extra safety)
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }



    // 🆕 Create user
    const user = await User.create({
      username,
      email,
      password,
    });


    const token = jwt.sign({
      id: user._id,
      email,
    }, process.env.JWT_SECRET,)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })

    console.log("User created:", user);

    const emailVerificationToken = jwt.sign({
      email: user.email,
    }, process.env.JWT_SECRET)

    const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}`;


    await sendEmail({
      to: email,
      subject: "Welcome to QueryMind!",
      html: `<p>Hi ${username},</p>

<p>
  Welcome to <strong>QueryMind</strong>! We’re excited to have you on board.
</p>

<p>
  To get started, please verify your email address by clicking the button below:
</p>

<p style="margin: 20px 0; text-align: center;">
  <a 
    href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"
    style="
      display: inline-block;
      padding: 12px 24px;
      background-color: #4F46E5;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
    "
  >
    Verify Email
  </a>
</p>

<p>
  This verification link will expire in <strong>10 minutes</strong> for security reasons.
</p>

<p>
  If the button above does not work, you can copy and paste the following link into your browser:
</p>

<p style="word-break: break-all;">
  <a href="${verificationUrl}" style="color: #4F46E5;">
    ${verificationUrl}
  </a>
</p>

<p>
  If you did not create an account, you can safely ignore this email.
</p>

<p>
  Best regards,<br>
  <strong>The QueryMind Team</strong>
</p>`
    })



    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Register Error:", error);

    // ⚠️ Handle duplicate key error (MongoDB unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credential",
        success: false,
        err: "User not found"
      })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        success: false,
        err: "Email not verified"
      })
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Creadential",
        success: false,
        err: "Incorrect password"
      })
    }

    const token = jwt.sign({
      id: user._id,
      email: user.email,
    }, process.env.JWT_SECRET,)

    res.cookie("token", token,{
      httpOnly: true,
  secure: true,
  sameSite: "None",
    })



    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },

    })

  } catch (err) {
    return res.status(500).json({
      message: "not login possible",
      err: err.message,
    })
  }
}

export const logout = (req, res) => {
  res.clearCookie("token"); // or whatever cookie name you use

  res.status(200).json({
    message: "Logged out successfully",
  });
};


export const varifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Verification token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    user.isVerified = true;
    await user.save();


    return res.send(`<div style="
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4F46E5, #9333EA);
  font-family: Arial, sans-serif;
">

  <div style="
    background: #ffffff;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  ">

    <div style="font-size: 50px; margin-bottom: 10px;">✅</div>

    <h1 style="
      font-size: 24px;
      margin-bottom: 10px;
      color: #111827;
    ">
      Email Verified!
    </h1>

    <p style="
      font-size: 14px;
      color: #6B7280;
      margin-bottom: 25px;
      line-height: 1.5;
    ">
      Your email has been successfully verified. You can now log in to your account and start using QueryMind.
    </p>

    <a href="http://localhost:3000/login" style="
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #4F46E5, #6366F1);
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      transition: 0.3s;
    ">
      Go to Login
    </a>

  </div>

</div>
    `);

  } catch (error) {
    console.error("Email Verification Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Verification token has expired",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const getme = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}