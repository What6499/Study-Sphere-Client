import React, { use } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

import Swal from "sweetalert2";

const SignIn = ({ toggleAuth }) => {
  const { signIn } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const errorMessages = {
      "auth/user-not-found":
        "No account found with this email. Please register or try a different email.",
      "auth/invalid-credential":
        "Incorrect email or password. Please check your credentials and try again.",
    };

    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed In!",
          text: "You have successfully signed in.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error("Sign-in error:", error.code, error.message);
        const errorMessage =
          errorMessages[error.code] ||
          "An error occurred during sign-in. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Sign-In Failed",
          text: errorMessage,
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-500">
        Sign In
      </h2>
      <form name="form" onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 pl-10  border-none  rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none "
              placeholder="you@example.com"
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              📧
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 pl-10  border-none rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none "
              placeholder="Enter Your Password"
              required
              title="Password must be at least 6 characters long and include both uppercase and lowercase letters."
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              🔒
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white font-semibold rounded-md transition duration-200 hover:scale-105"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-900 dark:text-white">
        Don't have an account?{" "}
        <button
          onClick={toggleAuth}
          className="text-emerald-500 cursor-pointer font-medium hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default SignIn;
