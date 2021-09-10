import { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "antd"
import Link from "next/link"
import ForgotPassForm from "../components/forms/ForgotPassForm"
import { useRouter } from "next/router"
import { UserContext } from "../context"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const [state] = useContext(UserContext)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Submitting", name, email, password, secret)
    try {
      setLoading(true)
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      }
      if (data.success) {
        setEmail("")
        setNewPassword("")
        setSecret("")
        setOk(data.ok)
        setLoading(false)
      }
    } catch (error) {
      // console.log("Error", error)
      toast.error(error.response.data)
      setLoading(false)
    }
  }

  if (state && state.token) router.push("/")

  return (
    <div className='container-fluid mt-5'>
      <div className='row py-5 bg-default-img text-light pt-5'>
        <div className='col text-center mt-5'>
          <h1 className='align-text-bottom mt-3 mb-5 pt-5 pb-3'>
            Forgot Password
          </h1>
        </div>
      </div>

      <div className='row py-5'>
        <div className='col-md-6 offset-md-3'>
          <ForgotPassForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
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
            <p>Success! You can now login to your account with new password.</p>
            <Link href='/login'>
              <a className='btn btn-success btn-sm'>Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
