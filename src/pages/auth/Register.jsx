import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = ({ toggleAuth }) => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      console.log("Invalid password detected");
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
      });
      return;
    }

    const errorMessages = {
      "auth/email-already-in-use":
        "This email is already registered. Please use a different email or sign in.",
    };

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL || null,
        });
      })
      .then(() => {
        console.log("Profile updated, showing success popup");
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been successfully created. You can now sign in.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          console.log("Redirecting to:", from);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        const errorMessage =
          errorMessages[error.code] ||
          "An error occurred during registration. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorMessage,
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-500">
        Register
      </h2>
      <form name="form" onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Full Name
          </label>
          <div className="relative">
            <input
              name="name"
              maxLength={12}
              type="text"
              className="w-full px-4 py-2 border-none rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none"
              placeholder="Enter Your Name"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border-none rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none"
              placeholder="Enter Your Email"
              required
            />
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
              pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              className="w-full px-4 py-2 border-none rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none"
              placeholder="Set a Password"
              required
              title="Password must be at least 6 characters long and include both uppercase and lowercase letters."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Profile Picture URL (Optional)
          </label>
          <div className="relative">
            <input
              name="photoURL"
              type="url"
              className="w-full px-4 py-2 border-none rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none"
              placeholder="Enter URL"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white font-semibold rounded-md transition duration-200 hover:scale-105"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-900 dark:text-white">
        Already have an account?{" "}
        <button
          onClick={toggleAuth}
          className="text-emerald-500 cursor-pointer font-medium hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Register;
