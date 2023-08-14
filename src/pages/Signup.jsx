import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moviesLogo from "../assets/MovieLogo.svg";
import { signup, auth } from "../firebase-config";
import { sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSignUp(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {

      // Toast Notification
      toast.error("Passwords do not match.", {
        pauseOnHover: false,
      });
      return;
    }
    setLoading(true);
    try {
      await signup(emailRef.current.value, confirmPasswordRef.current.value);

      // Toast Notification
      toast.success("Signup Successful!", {
        pauseOnHover: false,
      });

      // Send Email Verification
      await sendEmailVerification(auth?.currentUser)
        .then(() => {
          toast.success("Email Verification Sent!");
        })
        .catch((error) => {
          toast.success("Error Sending Verification Email!");
          console.error(error);
        });
        
      navigate("/login");

    } catch (error) {
      // Toast Notification
      toast.error("Error Creating Account", {
        pauseOnHover: false,
      });
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
      <form
        onSubmit={handleSignUp}
        className="bg-darkBlue flex flex-col w-full  p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8"
      >
        <h1 className=" mb-[40px] text-[32px] font">Sign Up</h1>
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
          className="outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Repeat Password"
          className="outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent"
        />
        <button
          disabled={loading}
          className={
            loading
              ? `bg-redColor rounded-[6px] mb-6 py-4 cursor-not-allowed opacity-50`
              : "bg-redColor rounded-[6px] mb-6 py-4 cursor-pointer"
          }
        >
          Create an account
        </button>
        <div className="flex gap-x-2 text-[15px] self-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-redColor ">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Signup;
