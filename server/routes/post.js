import express from "express"
import formidable from "express-formidable"

const router = express.Router()

import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
} from "../controllers/post"
import { requireSignin, canEditDelete } from "../middleware"

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
router.put("/update-post/:_id", requireSignin, canEditDelete, updatePost)
router.delete("/delete-post/:_id", requireSignin, canEditDelete, deletePost)

module.exports = router
