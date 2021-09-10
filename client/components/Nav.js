import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { UserContext } from "../context"
import { useRouter } from "next/router"

const Nav = () => {
  const [currentUser, setCurrentUser] = useState("")
  const [state, setState] = useContext(UserContext)

  useEffect(() => {
    process.browser && setCurrentUser(window.location.pathname)
  }, [process.browser && window.location.pathname])

  const router = useRouter()

  const logout = () => {
    window.localStorage.removeItem("auth")
    setState(null)
    router.push("/login")
    window.location.reload()
  }

  return (
    <nav
      style={{ backgroundColor: "#f4e800" }}
      role='navigation'
      className='nav d-flex fixed-top nav-justified'>
      <Link href='/' className=''>
        <a
          className={`nav-link text-dark logo ${
            currentUser === "/" && "active"
          }`}>
          DevOlution
        </a>
      </Link>
      <Link href='/about'>
        <a
          className={`nav-link text-dark ${
            currentUser === "/about" && "active"
          }`}>
          About
        </a>
      </Link>

      {state !== null ? (
        <>
          <Link href='/user/dashboard'>
            <a
              className={`nav-link text-dark ${
                currentUser === "/user/dashboard" && "active"
              }`}>
              {state &&
                state.user &&
                state.user.name &&
                `${state.user.name}'s Dashboard`}
            </a>
          </Link>
          <Link href='/login'>
            <a onClick={logout} className='nav-link text-dark'>
              Logout
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link href='/login' className=''>
            <a
              className={`nav-link text-dark ${
                currentUser === "/login" && "active"
              }`}>
              Login
            </a>
          </Link>
          <Link href='/register'>
            <a
              className={`nav-link text-dark ${
                currentUser === "/register" && "active"
              }`}>
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  )
}

export default Nav
