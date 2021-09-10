import expressJwt from "express-jwt"
import Post from "../models/post"

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
})

export const canEditDelete = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id)
    if (req.user._id != post.postedBy.toString()) {
      return res.status(401).json({
        error: "You are not authorized to perform this action",
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
