import { useContext } from "react"
import renderHTML from "react-render-html"
import moment from "moment"
import { Avatar } from "antd"
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { UserContext } from "../../context"
import { useRouter } from "next/router"
import { imageSource } from "../../functions"

const PostList = ({ posts, handleDelete, handleLike, handleUnLike }) => {
  const [state] = useContext(UserContext)

  const router = useRouter()

  const deletePost = async (id) => {}

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className='card mb-5 mt-5'>
            <div className='card-header'>
              <Avatar
                src={imageSource(post.postedBy)}
                size={40}
                className='text-black'
              />{" "}
              <span className='pt-2 p-lg-5'>{post.postedBy.name}</span>{" "}
              <span className='pt-2'>
                <span className='text-info'>posted:</span>{" "}
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className='card-body'>{renderHTML(post.content)}</div>
            <div className='card-footer container-fluid'>
              <img
                src={post.image && post.image.url}
                alt={post.postedBy.name}
                className='img-fluid card-img'
                style={{ maxHeight: "300px", backgroundSize: "cover" }}
              />
              <div className='d-flex'>
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    style={{ cursor: "pointer" }}
                    className='text-danger pt-3 px-3 h6'
                    onClick={() => handleUnLike(post._id)}
                  />
                ) : (
                  <HeartOutlined
                    style={{ cursor: "pointer" }}
                    className='text-danger pt-3 px-3 h6'
                    onClick={() => handleLike(post._id)}
                  />
                )}
                <div className='pt-3'>{post.likes.length}</div>{" "}
                <CommentOutlined
                  style={{ cursor: "pointer" }}
                  className='text-info pt-3 px-3 h6'
                />
                <div className='pt-3'>5 comments</div>
                {state && state.user && state.user._id === post.postedBy._id && (
                  <div className='mx-auto m-2 pt-1'>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      style={{ cursor: "pointer" }}
                      className='px-4 text-info'
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      style={{ cursor: "pointer" }}
                      className='text-danger'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default PostList
