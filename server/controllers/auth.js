import User from "../models/user"
import { hashPassword, comparePassword } from "../helpers/auth"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid"

export const register = async (req, res) => {
  // console.log(req.body)
  const { name, email, password, secret } = req.body
  // validate the name, email and password are not empty
  if (!name) return res.json({ error: "Name is required" })
  if (!password || password.length < 6)
    return res.json({ error: "Password must be at least 6 characters" })
  if (!secret) return res.json({ error: "Secret is required" })
  const userExists = await User.findOne({ email })
  if (userExists) return res.json({ error: "User already exists" })
  const hashedPassword = await hashPassword(password)
  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  })
  try {
    await user.save()
    // console.log("user registered")
    return res.json({ ok: true, message: "User created successfully" })
  } catch (error) {
    // console.log("Registration Failed ==> ", error)
    return res.json({ error: "Registration Failed" })
  }
}

export const login = async (req, res) => {
  // console.log(req.body)
  try {
    // check for user and email
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.json({ error: "User not found" })
    // check password
    const match = await comparePassword(password, user.password)
    if (!match) return res.json({ error: "Password is incorrect" })
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    })
    user.password = undefined
    user.secret = undefined
    res.json({ token, user })
  } catch (error) {
    console.log(error)
    return res.json({ error: "Login Failed" })
  }
}

export const currentUser = async (req, res) => {
  // console.log(req.user)
  try {
    await User.findById(req.user._id)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const forgotPassword = async (req, res) => {
  // console.log(req.body)
  const { email, newPassword, secret } = req.body
  if (!newPassword || newPassword < 6) {
    return res.json({
      error: "Password is required and must be at least 6 characters",
    })
  }
  if (!secret) {
    return res.json({ error: "Secret is required" })
  }
  const user = await User.findOne({ email, secret })
  if (!user) {
    return res.json({ error: "User not verified with those details" })
  }
  try {
    const hashed = await hashPassword(newPassword)
    await User.findByIdAndUpdate(user._id, { password: hashed })
    return res.json({
      success:
        "Password changed successfully, you can now login with your new password",
    })
  } catch (error) {
    console.log(error)
    return res.json({ error: "Error resetting password, please try again" })
  }
}

export const profileUpdate = async (req, res) => {
  try {
    // console.log("profile req.body: ", req.body)
    const data = {}
    if (req.body.image) {
      data.image = req.body.image
    }
    if (req.body.username) {
      data.username = req.body.username
    }
    if (req.body.about) {
      data.about = req.body.about
    }
    if (req.body.name) {
      data.name = req.body.name
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return res.json({ error: "Password must be at least 6 characters" })
      } else {
        data.password = await hashPassword(req.body.password)
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret
    }
    let user = await User.findByIdAndUpdate(req.user._id, data, {
      new: true,
    })
    user.password = undefined
    user.secret = undefined
    res.json(user)
  } catch (error) {
    if (error.code == "11000") {
      return res.json({ error: "Username already taken" })
    }
    console.log(error)
  }
}
