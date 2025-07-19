import axios from "axios";

import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../src/Context/AuthContext/AuthContext";
import { getAuth } from "firebase/auth";

const MyAssignments = () => {
  const [mySubmissions, setMySubmissions] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.warn("User not logged in");
          return;
        }

        const token = await user.getIdToken();

        // ✅ Get user's submissions
        const { data: mySubs } = await axios.get(
          "http://localhost:5000/submissions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMySubmissions(mySubs);
      } catch (err) {
        console.error("Error fetching submission data", err);
      }
    };

    fetchData();
  }, []);
  console.log(mySubmissions);
  return (
    <div className="bg-gray-100 ">
      <div className="container">
        <div className=" bg-white darkshadow-md">
          <button></button>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MyAssignments;
