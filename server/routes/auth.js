import express from "express"

const router = express.Router()

import {
  register,
  login,
  currentUser,
  forgotPassword,
} from "../controllers/auth"
import { requireSignin } from "../middleware"

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.get("/current-user", requireSignin, currentUser)

module.exports = router
