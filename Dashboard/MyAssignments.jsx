import React from "react";
import AssignmentCard from "../src/pages/Shared/AssignmentCard";

const MyAssignments = ({ assignments }) => {
  return assignments.map((assignment) => (
    <AssignmentCard
      key={assignment._id}
      assignment={assignment}
      bg={"dark:bg-gray-900"}
    ></AssignmentCard>
  ));
};

export default MyAssignments;
