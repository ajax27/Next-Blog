import express from "express"
import formidable from "express-formidable"

const router = express.Router()

import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
} from "../controllers/post"
import { requireSignin } from "../middleware"

router.post("/create-post", requireSignin, createPost)
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
)
// user posts
router.get("/user-posts", requireSignin, postsByUser)
router.get("/user-post/:_id", requireSignin, userPost)

module.exports = router
