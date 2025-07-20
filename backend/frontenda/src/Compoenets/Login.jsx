import React, { useEffect, useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const id = sessionStorage.getItem("id");

  if (id) {
    return <Navigate to="/" />;
  }

  const but = !signUp ? "login" : "signin";
  const handleLogin = async (e) => {
    e.preventDefault();
    if (but == "signin") {
      const res = await axios.post(`${window.location.origin}/api/v1/register`, {
        email,
        username,
        password,
      });
      if (res.status == 200) {
        alert("Registered successfully! Please log in.");
        setTimeout(() => {
          setSignUp(!signUp);
        }, 800);
      } else {
        alert(res.data);
      }
      console.log(res.data);
    } else {
      try {
        const res = await axios.post(`${window.location.origin}/api/v1/login`, {
          email,
          password,
        });
        if (res.status == 200) {
          sessionStorage.setItem("id", res.data.others._id);
          alert("you have login sucesfully");
          history("/");
          return <Navigate to="/home"></Navigate>;
        } else {
          alert("wrong email and password");
        }
      } catch (error) {
        alert(error);
      }
    }

    setEmail("");
    setPassword("");
    setUser("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4"
      style={{ backgroundColor: "#fdf8f4" }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-full flex flex-col items-center text-center md:flex-row md:text-left md:items-start md:justify-around md:space-x-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Log in</h1>
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email..."
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            {!signUp ? (
              <></>
            ) : (
              <div>
                <div className="relative">
                  <input
                    placeholder="Enter your user name ..."
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {signUp ? (
              <button
                type="submit"
                id="1"
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-red-600 transition-colors duration-300"
              >
                Sign in
              </button>
            ) : (
              <button
                type="submit"
                id="2"
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-red-600 transition-colors duration-300"
              >
                Log in
              </button>
            )}
          </form>

          <p className="mt-6 text-gray-600 text-xs leading-relaxed">
            By continuing with Google, Apple, or Email, you agree to Todoist’s
            <a href="/terms" className="text-red-500 hover:underline">
              Terms of Service
            </a>
            and
            <a href="/privacy" className="text-red-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {signUp ? (
            <p className="mt-6 text-gray-600 text-sm">
              Already signed up?{" "}
              <button
                className="text-red-500 hover:underline font-medium"
                onClick={() => {
                  setSignUp(!signUp);
                }}
              >
                Log in
              </button>
            </p>
          ) : (
            <p className="mt-6 text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                className="text-red-500 hover:underline font-medium"
                onClick={() => {
                  setSignUp(!signUp);
                }}
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <img
            src="https://www.papersmiths.co.uk/cdn/shop/articles/To_Do_List_Pad.jpg?v=1715699759"
            alt="Login Illustration"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
