import { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "antd"
import Link from "next/link"
import AuthForm from "../components/forms/AuthForm"
import { useRouter } from "next/router"
import { UserContext } from "../context"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        setName("")
        setEmail("")
        setPassword("")
        setSecret("")
        setOk(data.ok)
        setLoading(false)
      }
    } catch (error) {
      // console.log("Error", error)
      toast.error(error.data)
      setLoading(false)
    }
  }

  if (state && state.token) router.push("/")

  return (
    <div className='container-fluid mt-5'>
      <div className='row py-5 bg-default-img text-light pt-5'>
        <div className='col text-center mt-5'>
          <h1 className='align-text-bottom mt-3 mb-5 pt-5 pb-3'>
            Register Account
          </h1>
        </div>
      </div>

      <div className='row py-5'>
        <div className='col-md-6 offset-md-3'>
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
            <p>You have successfully registered your account.</p>
            <Link href='/login'>
              <a className='btn btn-success btn-sm'>Login</a>
            </Link>
          </Modal>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='text-center'>
            Already have an account?{" "}
            <Link href='/login'>
              <a className='login-link'>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
