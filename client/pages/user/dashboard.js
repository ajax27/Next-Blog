import { useContext, useState, useEffect } from "react"
import UserRoute from "../../components/routes/UserRoute"
import { UserContext } from "../../context"
import PostForm from "../../components/forms/PostForm"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import axios from "axios"
import PostList from "../../components/cards/PostList"

const Dashboard = () => {
  const [state] = useContext(UserContext)
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  const [posts, setPosts] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (state && state.token) fetchUserPosts()
  }, [state && state.token])

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/user-posts`)
      console.log(data)
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const postSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/create-post", { content, image })
      if (data.error) {
        toast.error(data.error)
      } else {
        fetchUserPosts()
        toast.success("Post created successfully")
        setContent("")
        setImage({})
      }
    } catch (error) {
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
            <h1 className='align-text-bottom mt-5 pt-5'>News Feed</h1>
          </div>
        </div>

        <div className='row py-3 pt-3 mt-5 m-5'>
          <div className='col-md-8'>
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <hr />
            <PostList className='mt-3' posts={posts} />
          </div>

          <div className='col-md-4'>Sidebar</div>
        </div>
      </div>
    </UserRoute>
  )
}

export default Dashboard
