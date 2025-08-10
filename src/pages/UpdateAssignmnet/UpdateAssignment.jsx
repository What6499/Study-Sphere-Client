import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Context/AuthContext/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    marks: "",
    thumbnail: "",
    difficulty: "",
    dueDate: new Date(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await axios.get(
          `https://study-sphere-server-ten.vercel.app/assignments/${id}`
        );

        setFormData({
          title: data.title || "",
          description: data.description || "",
          marks: data.marks || "",
          thumbnail: data.thumbnail || "",
          difficulty: data.difficulty || "",
          dueDate: new Date(data.dueDate),
        });
      } catch (err) {
        console.error("Failed to load assignment:", err);
        Swal.fire("Error", "Could not load assignment", "error");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id, navigate]);

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
      dueDate: formData.dueDate.toISOString(),
    };

    const { data } = await axios.put(
      `https://study-sphere-server-ten.vercel.app/update-assignment/${id}`,
      assignment
    );

    if (data.modifiedCount || data.matchedCount) {
      Swal.fire("Success", "Assignment updated!", "success");
      navigate("/dashboard");
    }
  };

  if (loading) {
    return <p className=" text-center">Loading assignment…</p>;
  }

  return (
    <div className="min-h-screen  px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Update Assignment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
          />

          <input
            name="marks"
            type="number"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Marks"
            required
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
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
            required
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
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
            className="w-full p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-colors"
          >
            Update Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;
