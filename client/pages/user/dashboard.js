import { useContext, useState, useEffect } from "react"
import UserRoute from "../../components/routes/UserRoute"
import { UserContext } from "../../context"
import PostForm from "../../components/forms/PostForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { toast } from "react-toastify"
import axios from "axios"
import PostList from "../../components/cards/PostList"
import People from "../../components/cards/People"

const Dashboard = () => {
  const [state, setState] = useContext(UserContext)
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  const [posts, setPosts] = useState([])
  const [people, setPeople] = useState([])

  const router = useRouter()

  useEffect(() => {
    const myRequest = axios.CancelToken.source()
    if (state && state.token) {
      fetchNewsFeed()
      findPeople()
    }
    return () => {
      myRequest.cancel()
    }
  }, [state && state.token])

  const fetchNewsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed`)
      console.log(data)
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const findPeople = async () => {
    try {
      const { data } = await axios.get(`/find-users`)
      setPeople(data)
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
        fetchNewsFeed()
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

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this post?"
      )
      if (!answer) return
      const { data } = await axios.delete(`/delete-post/${post._id}`)
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Post deleted successfully")
        fetchNewsFeed()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (user) => {
    // console.log(user)
    try {
      const { data } = await axios.put(`/user-follow`, { _id: user._id })
      // console.log("Follow user: ", data)
      // update local storage, user and keep user token
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      // update context
      setState({ ...state, user: data })
      // update user list
      let filteredPeople = people.filter((p) => p._id !== user._id)
      setPeople(filteredPeople)
      // render posts in new state
      fetchNewsFeed()
      toast.success(`You are now following ${user.name}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (_id) => {
    // console.log('post liked: ', _id)
    try {
      const { data } = await axios.put(`/like-post`, { _id })
      // console.log("Like post: ", data)
      fetchNewsFeed()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnLike = async (_id) => {
    // console.log('post unliked: ', _id)
    try {
      const { data } = await axios.put(`/unlike-post`, { _id })
      // console.log("UnLike post: ", data)
      fetchNewsFeed()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserRoute>
      <div className='container-fluid mt-5'>
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
            <PostList
              className='mt-3'
              posts={posts}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
          </div>

          <div className='col-md-4'>
            {state && state.user && state.user.following && (
              <div
                style={{ fontWeight: "600" }}
                className='text-dark btn btn-info text-center'>
                <Link href={`/user/following`}>
                  <a
                    style={{ textDecoration: "none" }}
                    className='h5 text-white'>
                    Following: {state.user.following.length}
                  </a>
                </Link>
              </div>
            )}
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default Dashboard
