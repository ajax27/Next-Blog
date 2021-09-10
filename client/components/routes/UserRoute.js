import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context"
import axios from "axios"
import { useRouter } from "next/router"
import { SyncOutlined } from "@ant-design/icons"

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false)
  const [state] = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (state && state.token) getCurrentUser()
  }, [state && state.token])

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`)
      if (data.ok) setOk(true)
    } catch (error) {
      console.log(error)
      router.push("/login")
    }
  }

  process.browser && state === null && setTimeout(() => getCurrentUser(), 1500)

  return !ok ? (
    <SyncOutlined
      spin
      className='d-flex justify-content-center display-3 text-primary p-5'
    />
  ) : (
    <> {children} </>
  )
}

export default UserRoute
