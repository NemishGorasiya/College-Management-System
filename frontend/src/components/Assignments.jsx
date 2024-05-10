import ServiceTitle from "./ServiceTitle";
import "./Assignments.scss";
import AssignmentCard from "./assignments/AssignmentCard";
import { useEffect, useState } from "react";
import { fetchAssignments } from "../services/services";

export default function Assignments() {
  const [assignments, setAssignments] = useState({
    list: [],
    isLoading: true,
  });

  const { list, isLoading } = assignments;

  const getAssignments = async () => {
    try {
      const response = await fetchAssignments();
      if (response) {
        setAssignments({
          list: response,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <div className="assignments">
      <ServiceTitle serviceTitle="Assignments" />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="assignmentsContentWrapper">
          <div className="assignmentsContainer">
            {list.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
