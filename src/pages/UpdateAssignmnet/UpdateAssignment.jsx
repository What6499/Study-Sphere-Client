import { useState } from "react";
import axios from "axios";
import useAuth from "../../Context/AuthContext/useAuth";

const UpdateAssignment = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    marks: "",
    thumbnail: "",
    difficulty: "",
    dueDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((f) => ({ ...f, dueDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignment = {
      ...formData,
      creatorEmail: user.email,
      creatorName: user.displayName || "",
      dueDate: formData.dueDate.toString(),
    };

    axios.post("http://localhost:5000/assignments", assignment).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Success", res.message || "Assignment created!", "success");
      }

      setFormData({
        title: "",
        description: "",
        marks: "",
        thumbnail: "",
        difficulty: "",
        dueDate: new Date(),
      });
    });
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Create Assignment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded
+             bg-gray-50 dark:bg-gray-700
+             text-gray-900 dark:text-gray-100
+             placeholder-gray-500 dark:placeholder-gray-400
+             border border-gray-200 dark:border-gray-600
+             transition-colors"
            required
          />
          <input
            name="marks"
            type="number"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Marks"
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
            required
          />
          <input
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail Image URL"
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition-colors"
          >
            Submit Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;
