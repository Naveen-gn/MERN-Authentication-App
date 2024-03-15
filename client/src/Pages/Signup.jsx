import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });     
  };
  console.log(formData);
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all the fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('https://naveen-mern-blog-app-server.vercel.app/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json()
      console.log(data);
      if (data.success===false) {
        setLoading(false);
       return setErrorMessage("Username or Email already exists! Please try again.");
       
      }
      if (res.ok) {
        navigate('/signin')
      }
    } 
    catch (error) {
      setErrorMessage(error.message || "Something went wrong! Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className='py-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} required />
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} required />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} required />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90' type='submit' disabled={loading}>
        {
              loading ? (<>
                <span className='ml-2'>Loading...</span>
              </>
              ) : 'Sign Up'
            }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      {
            errorMessage && <h3 className='mt-5 text-red-700 text-lg'>
              {errorMessage}
            </h3>
          }
    </div>
  )
}
