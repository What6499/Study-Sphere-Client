import React from "react";
import { BookOpen, BarChart3, UploadCloud, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-indigo-600" />,
    title: "Create Assignments",
    description:
      "Easily design and publish assignments for your peers or students.",
  },
  {
    icon: <UploadCloud className="h-10 w-10 text-green-600" />,
    title: "Submit Work",
    description:
      "Upload your solutions and stay organized with automatic tracking.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-blue-600" />,
    title: "Track Progress",
    description:
      "Monitor your assignment completion and review scores instantly.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-yellow-500" />,
    title: "Get Evaluated",
    description:
      "Receive evaluations from creators and view detailed feedback.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Explore Our Features
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.1,
                delay: index * 0.2,
                ease: "easeIn",
              }}
              key={index}
              className="bg-white dark:bg-gray-800 cursor-default rounded-2xl shadow-md p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
