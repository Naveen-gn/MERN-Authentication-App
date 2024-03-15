import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Signup() {
  const baseUrl="http://localhost:3000/";
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
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch(`${baseUrl}api/auth/signin`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json()
      console.log(data);
      if (data.sucess===false) {
        setLoading(false);
       return setErrorMessage(data.message);
      }
      if (res.ok) {
        setLoading(false);
        navigate('/')
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "Something went wrong! Please try again.");
     
    }
  };
  return (
    <div className='py-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Sign in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} required />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} required />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90' type='submit' >
        {
              loading ? (<>
                <span className='ml-2'>Loading...</span>
              </>
              ) : 'Sign In'
            }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      {
            errorMessage && <h3 className='mt-5 text-red-700 text-lg text-center'>
              {errorMessage}
            </h3>
          }
    </div>
  )
}
