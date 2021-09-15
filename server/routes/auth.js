import express from "express"

const router = express.Router()

import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
} from "../controllers/auth"
import { requireSignin } from "../middleware"

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.get("/current-user", requireSignin, currentUser)

router.put("/profile-update", requireSignin, profileUpdate)

module.exports = router
