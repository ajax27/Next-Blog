import Post from "../models/post"
import User from "../models/user"
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const createPost = async (req, res) => {
  // console.log(req.body)
  const { content, image } = req.body
  if (!content.length) {
    return res.json({ error: "Content is required" })
  }
  try {
    const post = await new Post({ content, image, postedBy: req.user._id })
    post.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const uploadImage = async (req, res) => {
  // console.log(req.file)
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path)
    // console.log(result)
    res.json({ url: result.secure_url, public_id: result.public_id })
  } catch (error) {
    console.log(error)
  }
}

export const postsByUser = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.user._id })
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .limit(10)
      .sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    })
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id)
    //remove image
    if (post.image && post.image.public_id) {
      cloudinary.uploader.destroy(post.image.public_id)
    }
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
  }
}

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    let following = user.following
    following.push(req.user._id)
    const posts = await Post.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(12)
    res.json(posts)
  } catch (error) {
    console.log(error)
  }
}

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    )
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    )
    res.json(post)
  } catch (error) {
    console.log(error)
  }
}
