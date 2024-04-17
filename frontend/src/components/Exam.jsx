import ServiceTitle from "./ServiceTitle";
import ExamCard from "./exam/ExamCard";
import "./Exam.scss";
import ServiceSubTitle from "./ServiceSubTitle";
import { useEffect, useState } from "react";
import { fetchExams } from "../services/services";

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
              {examCategory.list.map((examDetails, idx) => (
                <ExamCard examDetails={examDetails} key={idx} />
              ))}
            </div>
          )}
        </div>
      ))}
      {/* <div className="examsWrapper">
        <ServiceSubTitle serviceSubTitle={"Exams"} />
        <div className="examsContainer">
          {Array(10)
            .fill()
            .map((ele, idx) => (
              <ExamCard key={idx} />
            ))}
        </div>
      </div>
      <div className="examsWrapper">
        <ServiceSubTitle serviceSubTitle={"Completed Exams"} />
        <div className="examsContainer">
          {Array(10)
            .fill()
            .map((ele, idx) => (
              <ExamCard key={idx} />
            ))}
        </div>
      </div> */}
    </div>
  );
}
