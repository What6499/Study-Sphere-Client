import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SignIn from "./SignIn";
import Register from "./Register";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuth = () => setIsSignIn((prev) => !prev);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/src/assets/Banner.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/10 z-0 dark:bg-black/50" />

      <div className="relative z-10 w-full max-w-4xl p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            className="relative w-full md:w-3/5 min-h-[200px] md:min-h-[300px] bg-[url('/src/assets/auth.jpg')] bg-cover bg-center rounded-lg overflow-hidden"
            layout
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignIn ? "signin-text" : "register-text"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  {isSignIn ? (
                    <>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        👋 Welcome Back!
                      </h3>
                      <p className="text-sm md:text-base">
                        Log in to access your dashboard and stay productive with
                        StudySphere.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        🌟 Join StudySphere!
                      </h3>
                      <p className="text-sm md:text-base">
                        Create your account to start organizing your studies and
                        boosting productivity.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              className="w-full md:w-2/5 flex flex-col backdrop-blur-lg bg-white/40 dark:bg-gray-900/40 rounded-lg p-6"
              layout
              transition={{ duration: 0.1 }}
            >
              <motion.div
                key={isSignIn ? "signin-form" : "register-form"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {isSignIn ? (
                  <SignIn toggleAuth={toggleAuth} />
                ) : (
                  <Register toggleAuth={toggleAuth} />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
