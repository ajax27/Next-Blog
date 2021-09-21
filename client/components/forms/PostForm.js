import { Avatar } from "antd"
import { CameraTwoTone, LoadingOutlined } from "@ant-design/icons"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

import "react-quill/dist/quill.snow.css"

const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  return (
    <div className='card'>
      <div className='card-body pb-1'>
        <form className='form-group'>
          <ReactQuill
            theme='snow'
            value={content}
            onChange={(e) => setContent(e)}
            className='form-control'
            placeholder="What's on your mind..."
          />
        </form>
      </div>

      <div className='card-footer d-flex justify-content-between mt-2'>
        <button onClick={postSubmit} className='btn btn-primary'>
          Post
        </button>
        <label className='mt-1'>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className='mt-1' />
          ) : uploading ? (
            <LoadingOutlined className='alert-primary mt-3' />
          ) : (
            <CameraTwoTone
              className='alert-primary mt-3'
              title='Add Image'
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
            />
          )}
          <input onChange={handleImage} type='file' accept='image/*' hidden />
        </label>
      </div>
    </div>
  )
}

export default PostForm
