import React from "react";

const SignIn = ({ toggleAuth }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-500">
        Sign In
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-2 pl-10 border border-gray-500 dark:border-gray-500 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
              type="password"
              className="w-full px-4 py-2 pl-10 border border-gray-500 dark:border-gray-500 rounded-md bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="••••••••"
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              🔒
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold rounded-md transition duration-200 hover:scale-105"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-900 dark:text-white">
        Don’t have an account?{" "}
        <button
          onClick={toggleAuth}
          className="text-emerald-500 font-medium hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default SignIn;
