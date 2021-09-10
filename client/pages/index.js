import { useContext } from "react"
import { UserContext } from "../context"

const Home = () => {
  const [state, setState] = useContext(UserContext)

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col'>
          <h1 className='display-3 text-center py-5'>
            Welcome To <span className='logo display-4'>DevOlution</span>
          </h1>
          <video
            style={{ maxHeight: "400px", width: "auto" }}
            className='w-80 d-flex justify-content-around m-auto'
            controls
            autoPlay={true}
            playsInline>
            <source
              style={{ width: "auto" }}
              src='/images/ajax27_intro.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Home
