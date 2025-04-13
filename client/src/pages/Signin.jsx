import {Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/authentication/signin', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if(data.success===false){
      setError(true);
      return;
    }
    navigate('/');
    setError(false);
  } catch(error){
    setError(true);
    setLoading(false);
  }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign-In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type='email' 
          placeholder='Email' 
          id='email' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange}
          />
      
        <input 
          type='password' 
          placeholder='Password' 
          id='password' 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange}
          />

        <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg hover:opacity-95 '> 
        {loading ? 'Loading...' : 'SIGN-IN'}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500 '> Sign-Up</span>
        </Link>
      </div>
      <p className="text-red-600 p-3">{error && 'Something went wrong.!'}</p>
    </div>
  );
}