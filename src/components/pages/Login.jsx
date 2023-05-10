import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../firebase-config";
import moviesLogo from "../../assets/MovieLogo.svg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin(e) {
    e.preventDefault();
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      alert("Please enter all fields");
      return;
    }
    setLoading(true)
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen px-6 font-light">
      <img
        src={moviesLogo}
        alt="Entertainment Webapp Logo"
        className="mb-[58px]"
      />
      <form className="bg-darkBlue flex flex-col w-full  p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8">
        <h1 className=" mb-[40px] text-[32px] font">Login</h1>
        <input
        ref={emailRef}
          type="email"
          placeholder="Email address"
          className="outline-none  border-b border-b-red-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
        ref={passwordRef}
          type="password"
          placeholder="Password"
          className="outline-none  border-b border-b-red-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent"
        />
        <button className="bg-redColor rounded-[6px] mb-6 py-4">
          Login to your account
        </button>
        <div className="flex gap-x-2 text-[15px] self-center">
          <p className="">Don’t have an account?</p>
          <Link to="/signup" className="text-redColor ">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
