import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { UserContext } from "../context"
import { useRouter } from "next/router"
import { Avatar } from "antd"

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
    setState(null)
  }

  return (
    <nav
      style={{ backgroundColor: "#f4e800" }}
      role='navigation'
      className='nav d-flex fixed-top justify-content-between'>
      <Link href='/'>
        <a
          className={`nav-link text-dark logo ${
            currentUser === "/" && "active"
          }`}>
          <img
            src='/images/ajax27__logo.png'
            style={{ width: "50px", height: "26px" }}
          />{" "}
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
          <div className='dropdown'>
            <button
              className={`btn dropdown-toggle pb-2 ${
                (currentUser === "/user/dashboard" && "active" && "btn-info") ||
                (currentUser === "/user/profile/update" &&
                  "active" &&
                  "btn-info")
              }`}
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              {state && state.user && state.user.username}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li>
                <Link href='/user/dashboard'>
                  <a
                    className={`nav-link dropdown-item nav-color text-dark ${
                      currentUser === "/user/dashboard" && "active"
                    }`}>
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <Link href='/user/profile/update'>
                  <a
                    className={`nav-link dropdown-item nav-color text-dark ${
                      currentUser === "/user/profile/update" && "active"
                    }`}>
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <a onClick={logout} className='nav-link nav-color text-dark'>
                  Logout
                </a>
              </li>
            </ul>
          </div>
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
