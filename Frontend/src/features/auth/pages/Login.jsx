import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {


  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const {handleLogin} = useAuth();

  

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    const payload ={
      email,
      password
    }

    console.log(payload.email+" "+payload.password);
    
    await handleLogin(payload);
    navigate('/')

  };

  return (
<div className="min-h-screen flex items-center justify-center  from-slate-900 via-purple-900 to-slate-900 px-4">      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8"> 
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Perplexity account</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* Error Message */}
          {/* {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )} */}

          {/* Form */}
          <form onSubmit={handleSubmitForm} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
               
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={loading}
              className="w-full py-3 bg-gradient-to-red from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400">New to Perplexity?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="block w-full text-center py-3 border border-slate-600 hover:border-purple-500 text-gray-300 hover:text-white font-semibold rounded-lg transition"
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};