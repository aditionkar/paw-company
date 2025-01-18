"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");

      // Redirect to the home page after successful login
      if (response.data.success) {
        router.push("/"); // Go to the home page
      }
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-w-screen min-h-screen bg-[#B5C6FF] flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 744.84799 747.07702"
            >
              {/* Your SVG paths */}
            </svg>
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              {loading ? <Loader /> : "Login"}
            </h2>
            <p className="text-sm text-gray-600 mb-10">
              Log in to your account. It’s quick and easy!
            </p>
            <form onSubmit={onLogin}>
              <div className="flex -mx-3 mt-5">
                <div className="w-full px-3">
                  <label className="text-xs font-semibold px-1">Email</label>
                  <div className="flex items-center">
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="w-full px-4 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3 mt-5">
                <div className="w-full px-3">
                  <label className="text-xs font-semibold px-1">Password</label>
                  <div className="flex items-center">
                    <input
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      className="w-full px-4 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3 mt-5">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className={`block w-full text-white text-sm font-semibold rounded-lg px-4 py-2 ${
                      buttonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                    disabled={buttonDisabled}
                  >
                    Login
                  </button>
                  <Link
                    href="/signup"
                    className=" mt-3 text-center block w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg px-4 py-2"
                  >
                    Don't have an account? Create one here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
