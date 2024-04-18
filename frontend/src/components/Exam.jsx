import ServiceTitle from "./ServiceTitle";
import ExamCard from "./exam/ExamCard";
import "./Exam.scss";
import ServiceSubTitle from "./ServiceSubTitle";
import { useEffect, useState } from "react";
import { fetchExams } from "../services/services";
import toast from "react-hot-toast";

export default function Exam() {
  const [exam, setExam] = useState([
    {
      category: "exams",
      label: "Exams",
      list: [],
      isLoading: true,
    },
    {
      category: "exams",
      label: "Exams",
      list: [],
      isLoading: true,
    },
  ]);

  const getExams = async () => {
    try {
      const res = await fetchExams();
      setExam([
        {
          title: "exams",
          label: "Exams",
          list: res.exams,
          isLoading: false,
        },
        {
          title: "completedExams",
          label: "Completed Exams",
          list: res.completedExams,
          isLoading: false,
        },
      ]);
    } catch (error) {
      toast.error("Something went wrong while fetching exams");
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div className="examsService">
      <ServiceTitle serviceTitle="Exam" />
      {exam.map((examCategory) => (
        <div key={examCategory.title} className="examsWrapper">
          <ServiceSubTitle serviceSubTitle={examCategory.label} />
          {examCategory.isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="examsContainer">
              {examCategory.list.length > 0 ? (
                examCategory.list.map((examDetails) => (
                  <ExamCard examDetails={examDetails} key={examDetails.id} />
                ))
              ) : (
                <h4>No exams to show</h4>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
