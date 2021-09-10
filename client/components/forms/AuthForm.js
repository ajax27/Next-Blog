import { SyncOutlined } from "@ant-design/icons"

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {page !== "login" && (
      <div className='form-group p-2'>
        <label className='text-muted'>Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter Name'
        />
      </div>
    )}

    <div className='form-group p-2'>
      <label className='text-muted'>Email Address</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        className='form-control'
        placeholder='email@example.com'
      />
    </div>

    <div className='form-group p-2'>
      <label className='text-muted'>Your Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        className='form-control'
        placeholder='Password'
      />
    </div>

    {page !== "login" && (
      <>
        <div className='form-group p-2'>
          <label className='text-muted'>Pick A Question</label>
          <select className='form-control'>
            <option>What is your favorite color?</option>
            <option>What is your favorite food?</option>
            <option>What is your favorite movie?</option>
          </select>
          <small className='form-text text-muted'>
            This will be used to reset your password if you forget it
          </small>
        </div>

        <div className='form-group p-2'>
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Your answer goes here'
          />
        </div>
      </>
    )}

    <div className='form-group p-2'>
      <button
        disabled={
          page === "login"
            ? !email || !password || loading
            : !name || !email || !password || !secret || loading
        }
        className='btn btn-primary col-12'>
        {loading ? <SyncOutlined className='py-1' spin /> : "Submit"}
      </button>
    </div>
  </form>
)

export default AuthForm
