import { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Link from "next/link"
import AuthForm from "../components/forms/AuthForm"
import { useRouter } from "next/router"
import { UserContext } from "../context"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [state, setState] = useContext(UserContext)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Submitting", name, email, password, secret)
    try {
      setLoading(true)
      const { data } = await axios.post(`/login`, {
        email,
        password,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        setState({
          user: data.user,
          token: data.token,
        })
        window.localStorage.setItem("auth", JSON.stringify(data))
        if (state && state.token) {
          router.push("/user/dashboard")
          toast.success(`Welcome ${data.user.name} to your dashboard!`)
        }
        if (!state.token) {
          toast.error("You are not authorized to visit that page")
          router.push("/")
        }
      }
    } catch (error) {
      // console.log("Error", error)
      toast.error(error.data)
      setLoading(false)
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row py-5 bg-default-img text-light pt-5'>
        <div className='col text-center mt-5'>
          <h1 className='align-text-bottom mt-3 mb-5 pt-5 pb-3'>Login</h1>
        </div>
      </div>

      <div className='row py-5'>
        <div className='col-md-6 offset-md-3'>
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page='login'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <p className='text-center'>
            Don't have an account yet?{" "}
            <Link href='/register'>
              <a className='login-link text-info'>Register</a>
            </Link>
          </p>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <p className='text-center'>
            Forgot Your{" "}
            <Link href='/forgot-password'>
              <a className='login-link text-info'>Password?</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
