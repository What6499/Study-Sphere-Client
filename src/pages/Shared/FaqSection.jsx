import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
const FaqSection = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    fetch("/json/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqData(data));
  }, []);
  return (
    <section className="py-36 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 bg-gray50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white  text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.1,
                delay: index * 0.2,
                ease: "easeIn",
              }}
              className="collapse shadow-md collapse-arrow bg-white dark:bg-gray-900"
              key={index}
            >
              <input type="checkbox" />
              <div className="collapse-title dark:text-gray-100 text-gray-900 text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content text-base text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
