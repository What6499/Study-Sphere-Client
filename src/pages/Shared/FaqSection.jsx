import React, { useEffect, useState } from "react";

const FaqSection = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    fetch("/json/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqData(data));
  }, []);
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 bg-gray50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white  text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div className="collapse collapse-arrow bg-gray-800" key={index}>
              <input type="checkbox" />
              <div className="collapse-title  text-gray-100 text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content text-base text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
