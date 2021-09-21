import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal, Avatar } from "antd"
import { LoadingOutlined, CameraTwoTone } from "@ant-design/icons"
import Link from "next/link"
import AuthForm from "../../../components/forms/AuthForm"
import { useRouter } from "next/router"
import { UserContext } from "../../../context"
import UserRoute from "../../../components/routes/UserRoute"

const ProfileUpdate = () => {
  const [image, setImage] = useState({})
  const [username, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [state, setState] = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    if (state && state.user) {
      setImage(state.user.image)
      setUsername(state.user.username)
      setAbout(state.user.about)
      setName(state.user.name)
      setEmail(state.user.email)
    }
  }, [state && state.user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Submitting", name, email, password, secret)
    try {
      setLoading(true)
      const { data } = await axios.put(`/profile-update`, {
        image,
        username,
        about,
        name,
        email,
        password,
        secret,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        // update the state, user and local storage and retain the token
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data
        localStorage.setItem("auth", JSON.stringify(auth))
        // update context
        setState({ ...state, user: data })
        setOk(true)
        setLoading(false)
      }
    } catch (error) {
      // console.log("Error", error)
      toast.error(error.data)
      setLoading(false)
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
      <div className='container-fluid mt-5'>
        <div className='row py-5 bg-default-img text-light pt-5'>
          <div className='col text-center mt-5'>
            <h1 className='align-text-bottom mt-3 mb-5 pt-5 pb-3'>Profile</h1>
          </div>
        </div>

        <div className='row py-5'>
          <div className='col-md-6 offset-md-3'>
            <label className='mt-3 d-flex justify-content-center'>
              {image && image.url ? (
                <Avatar size={30} src={image.url} className='mt-1' />
              ) : uploading ? (
                <LoadingOutlined className='alert-primary mt-3' />
              ) : (
                <>
                  <span className='pt-3'>Add Image</span>{" "}
                  <CameraTwoTone
                    title='Add Image'
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    className='alert-primary m-3'
                  />
                </>
              )}
              <input
                onChange={handleImage}
                type='file'
                accept='image/*'
                hidden
              />
            </label>

            <AuthForm
              profileUpdate={true}
              handleSubmit={handleSubmit}
              username={username}
              setUsername={setUsername}
              about={about}
              setAbout={setAbout}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
              page='profile'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Modal
              title='Congrats!'
              visible={ok}
              onCancel={() => setOk(false)}
              footer={null}>
              <p>You have successfully updated your Profile</p>
              <hr />
              <p>Go to Dashboard</p>
              <Link href='/user/dashboard'>
                <a className='login-link'>Dashboard</a>
              </Link>
            </Modal>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='text-center'>
              Finished updating account?{" "}
              <Link href='/user/dashboard'>
                <a className='login-link'>Dashboard</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default ProfileUpdate
