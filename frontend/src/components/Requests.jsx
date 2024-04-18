import ServiceSubTitle from "./ServiceSubTitle";
import ServiceTitle from "./ServiceTitle";
import "./Requests.scss";
import { useEffect, useState } from "react";
import { fetchRequests } from "../services/services";
import { Button } from "@mui/material";
import { DateToTime, formatDate } from "../utils/utilityFunctions";

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      title: "studentRequests",
      label: "Student Requests",
      list: [],
      isLoading: true,
    },
    {
      title: "facultyRequests",
      label: "Faculty Requests",
      list: [],
      isLoading: true,
    },
  ]);
  const getRequests = async () => {
    try {
      const res = await fetchRequests();
      setRequests([
        {
          title: "studentRequests",
          label: "Student Requests",
          list: res.studentRequests,
          isLoading: false,
        },
        {
          title: "facultyRequests",
          label: "Faculty Requests",
          list: res.facultyRequests,
          isLoading: false,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  return (
    <div className="requestsPage">
      <ServiceTitle serviceTitle="Incoming Requests" />
      <div className="resultWrapper">
        {requests.map((requestCategory) => (
          <div key={requestCategory.title} className="requestsWrapper">
            <ServiceSubTitle serviceSubTitle={"Faculty Requests"} />
            {requestCategory.isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="requestsContainer">
                {requestCategory.list.length > 0 ? (
                  requestCategory.list.map((requestDetails) => (
                    <div
                      key={requestDetails._id}
                      className="requestCardWrapper"
                    >
                      <div className="requestDetailsWrapper">
                        <p className="requesterFullName">
                          {requestDetails.student.fullName}
                        </p>
                        <p>
                          {formatDate(requestDetails.createdAt)}{" "}
                          {DateToTime(requestDetails.createdAt)}
                        </p>
                      </div>
                      <Button className="reviewButton" variant="contained">
                        Review Request
                      </Button>
                    </div>
                  ))
                ) : (
                  <h4>No Pending Requests</h4>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
