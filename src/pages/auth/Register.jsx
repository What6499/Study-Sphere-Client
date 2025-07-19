import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Register = ({ toggleAuth }) => {
  const { createUser } = use(AuthContext);
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // create User
    createUser(email, password)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <form name="form" onSubmit={handleRegister}>
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-500">
        Register
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Full Name
          </label>
          <div className="relative">
            <input
              name="name"
              type="text"
              className="w-full focus:outline-none  border-none px-4 py-2 pl-10 border border-gray-500 dark:border-gray-500 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white  "
              placeholder="Your Name"
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              👤
            </span>
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
              className="w-full  border-none px-4 py-2 pl-10 border border-gray-500 dark:border-gray-500 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none "
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
              pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              className="w-full  border-none px-4 py-2 pl-10 border border-gray-500 dark:border-gray-500 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none "
              placeholder="Set Password"
              required
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
    </form>
  );
};

export default Register;
