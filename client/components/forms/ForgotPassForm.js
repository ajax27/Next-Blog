import { SyncOutlined } from "@ant-design/icons"

const ForgotPassForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
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
      <label className='text-muted'>Your New Password</label>
      <input
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type='password'
        className='form-control'
        placeholder='New Password'
      />
    </div>

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

    <div className='form-group p-2'>
      <button
        disabled={!email || !newPassword || !secret || loading}
        className='btn btn-primary col-12'>
        {loading ? <SyncOutlined className='py-1' spin /> : "Submit"}
      </button>
    </div>
  </form>
)

export default ForgotPassForm
