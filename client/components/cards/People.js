import { useContext } from "react"
import { UserContext } from "../../context"
import { useRouter } from "next/router"
import { Avatar, List } from "antd"
import moment from "moment"
import { imageSource } from "../../functions"

const People = ({ people, handleFollow }) => {
  const [state] = useContext(UserContext)

  const router = useRouter()

  return (
    <>
      <List
        itemLayout='horizontal'
        dataSource={people}
        renderItem={(user) => (
          <List.Item className='d-flex justify-content-between'>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={imageSource(user)}
                  className='mt-2 m-lg-2'
                  size='small'
                />
              }
              className='bg-light border-1 border-dark p-2'
              title={
                <div className='d-flex text-black justify-content-between mt-2'>
                  {user.username}{" "}
                  <span
                    onClick={() => handleFollow(user)}
                    style={{ cursor: "pointer" }}
                    className='btn btn-outline-primary mb-1 btn-sm'>
                    Follow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default People
