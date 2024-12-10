import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3 ' />
          <input type="text" placeholder='Email id' onChange={e => setEmail(e.target.value)} required value={email} className='bg-transparent outline-none text-white' />
        </div>
        <button></button>
      </form>
    </div>
  )
}

export default ResetPassword