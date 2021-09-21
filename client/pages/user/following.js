import { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import { UserContext } from "../../context"
import { useRouter } from "next/router"
import { Avatar, List } from "antd"
import { RollbackOutlined } from "@ant-design/icons"
import Link from "next/link"
import moment from "moment"
import axios from "axios"

const Following = () => {
  const [state, setState] = useContext(UserContext)
  const [people, setPeople] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (state && state.token) fetchFollowing()
  }, [state && state.token])

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following")
      console.log(data)
      setPeople(data)
    } catch (error) {
      console.log(error)
    }
  }

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url
    } else {
      return "/images/default_user.jpg"
    }
  }

  const handleUnFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id })
      // console.log("UnFollow user: ", data)
      // update local storage, user and keep user token
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      // update context
      setState({ ...state, user: data })
      // update user list
      let filteredPeople = people.filter((p) => p._id !== user._id)
      setPeople(filteredPeople)
      toast.success(`You are no longer following ${user.name}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='row col-md-6 offset-md-3 mt-5 pt-5 m-auto'>
      <h1 className='text-center mb-5'>People You Follow</h1>
      <List
        className='list-group'
        itemLayout='horizontal'
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} size='small' />}
              style={{ backgroundColor: "#eff9a4" }}
              className='p-2 px-md-5'
              title={
                <div className='d-flex justify-content-between'>
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnFollow(user)}
                    style={{ cursor: "pointer" }}
                    className='text-primary'>
                    UnFollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Link href='/user/dashboard'>
        <a className='d-flex justify-content-center pt-5'>
          <RollbackOutlined className='h4' />
        </a>
      </Link>
    </div>
  )
}

export default Following
