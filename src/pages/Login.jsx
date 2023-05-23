import React, { useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../firebase-config";
import moviesLogo from "../assets/MovieLogo.svg";
import { useAuth } from "../firebase-config";


const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin(e) {
    e.preventDefault();
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      setError(true);
      alert("error!");
      return;
    }
    setError(false);
    setLoading(true);
    try {
        await login(emailRef.current.value, passwordRef.current.value);
        // setTimeout(() => {       
          navigate("/");
        // }, 2000);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className={
            error
              ? `border-redColor outline-none  border-b pl-4 pb-4 mb-[40px] bg-transparent`
              : `outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent`
          }
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className={
            loading
              ? `bg-redColor rounded-[6px] mb-6 py-4 cursor-not-allowed opacity-50`
              : "bg-redColor rounded-[6px] mb-6 py-4 cursor-pointer duration-500 hover:bg-primaryColor hover:text-darkBlue"
          }
        >
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
