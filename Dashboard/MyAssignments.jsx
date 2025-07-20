import React from "react";
import AssignmentCard from "../src/pages/Shared/AssignmentCard";

const MyAssignments = ({ assignments }) => {
  if (assignments.length === 0) {
    return (
      <h1 className="text-gray-900 flex justify-center items-center h-full dark:text-gray-100">
        You have not Created an assignment yet.
      </h1>
    );
  }
  return assignments.map((assignment) => (
    <AssignmentCard
      key={assignment._id}
      assignment={assignment}
      bg={"dark:bg-gray-900"}
    ></AssignmentCard>
  ));
};

export default MyAssignments;
