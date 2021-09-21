import express from "express"

const router = express.Router()

import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findUsers,
  addFollower,
  removeFollower,
  userFollowers,
  userFollowing,
  userUnfollow,
} from "../controllers/auth"
import { requireSignin } from "../middleware"

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.get("/current-user", requireSignin, currentUser)

router.put("/profile-update", requireSignin, profileUpdate)
router.put("/user-follow", requireSignin, addFollower, userFollowers)
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow)
router.get("/user-following", requireSignin, userFollowing)
router.get("/find-users", requireSignin, findUsers)

module.exports = router
