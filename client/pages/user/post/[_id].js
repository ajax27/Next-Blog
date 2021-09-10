import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import axios from "axios"
import UserRoute from "../../../components/routes/UserRoute"
import PostForm from "../../../components/forms/PostForm"

const EditPost = () => {
  const [post, setPost] = useState({})
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  const router = useRouter()

  const _id = router.query._id

  useEffect(() => {
    if (_id) fetchPost()
  }, [_id])

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`)
      setPost(data)
      setContent(data.content)
      setImage(data.image)
    } catch (error) {
      console.log(error)
    }
  }

  const postSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Post updated successfully")
        router.push("/user/dashboard")
      }
    } catch (error) {
      setUploading(false)
      console.log(error)
    }
  }

  const handleImage = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    // console.log([...formData])
    setUploading(true)
    try {
      const { data } = await axios.post("/upload-image", formData)
      setImage({ url: data.url, public_id: data.public_id })
      toast.success("Image uploaded successfully")
      setContent("")
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <UserRoute>
      <div className='container-fluid'>
        <div className='row py-5 bg-dashboard-img text-light pt-5'>
          <div className='col text-center py-5 mt-5'>
            <h1 className='align-text-bottom mt-5 pt-5'>Edit Post</h1>
          </div>
        </div>

        <div className='row py-3 pt-3 mt-5'>
          <div className='col-md-8 offset-md-2'>
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default EditPost
