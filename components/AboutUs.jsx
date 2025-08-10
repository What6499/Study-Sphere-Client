import React from "react";

const AboutUs = () => {
  return (
    <section className="py-36 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center space-y-8">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            About Us
          </h2>

          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At{" "}
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">
              StudySphere
            </span>
            , we believe learning is better when it's collaborative and
            supportive. Our mission is to connect students through shared
            assignments and peer review, creating a friendly community where
            everyone can teach and learn from one another.
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you're creating assignments, submitting work, or providing
            feedback, StudySphere is here to empower your educational journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
