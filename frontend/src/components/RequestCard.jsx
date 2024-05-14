import React, { useState } from "react";
import { DateToTime, formatDate } from "../utils/utilityFunctions";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "./modal/modalStyle";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import "./RequestCard.scss";
import toast from "react-hot-toast";
import { approveRequest, reviewRequest } from "../services/services";

const RequestCard = ({ requestDetails, getRequests }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    _id,
    student = {},
    faculty = {},
    changes,
    status,
    createdAt,
    updatedAt,
    actionBy,
  } = requestDetails;
  const { fullName, email } =
    Object.keys(student).length === 0 ? faculty : student;

  const { fullName: fullNameOfUpdater } = actionBy || {};
  const changesArr = Object.keys(changes);

  // const handelApproveRequest = async (requestId) => {
  //   try {
  //     const res = await approveRequest(requestId);
  //     if (res) {
  //       toast.success("Request approved successfully");
  //       getRequests();
  //       handleClose();
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong while approving request");
  //     console.error(error);
  //   }
  // };

  const handleReviewRequest = async ({ requestId, updatedStatus }) => {
    try {
      const res = await reviewRequest({ requestId, updatedStatus });
      if (res) {
        toast.success(
          `Request ${
            updatedStatus === "approve" ? "approved" : "rejected"
          } successfully`
        );
        getRequests();
        handleClose();
      }
    } catch (error) {
      toast.error("Something went wrong while approving request");
      console.error(error);
    }
  };

  return (
    <>
      <div className="requestCardWrapper">
        <div className="requestDetailsWrapper">
          <p className="requesterFullName">{fullName}</p>
          <p>
            {formatDate(createdAt)} {DateToTime(createdAt)}
          </p>
        </div>

        <Button
          className="reviewButton"
          onClick={handleOpen}
          variant="contained"
        >
          {status === "PENDING" ? "Review Request" : "See Details"}
        </Button>
      </div>

      <Modal open={open} onClose={handleClose} className="requestReviewModal">
        <Box sx={modalStyle} className="dialogBox">
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>

          <p className="requesterName">{fullName}</p>
          <p className="requesterEmail">
            <span className="requestLabel">Email:</span>
            {email}
          </p>
          <p>
            <span className="requestLabel">Requested At:</span>
            {formatDate(createdAt)} {DateToTime(createdAt)}
          </p>
          {status === "APPROVED" && (
            <>
              <p>
                <span className="requestLabel">Updated At:</span>
                {formatDate(updatedAt)} {DateToTime(updatedAt)}
              </p>
              <p>
                <span className="requestLabel">Updated By:</span>
                {fullNameOfUpdater}
              </p>
              <p className="requestStatusWrapper">
                <span className="requestLabel">Status :</span>
                <span className="requestStatus">{status}</span>
              </p>
            </>
          )}
          <p className="changesTitle">Requested Changes</p>

          {changesArr.map((key, index) => (
            <p className="requesterChange" key={index}>
              <span className="requestLabel">{key}:</span>
              {key === "profilePicture" ? (
                <img
                  className="previewRequestImage"
                  src={changes[key]}
                  alt=""
                />
              ) : (
                <>
                  {student[key] || faculty[key]} <DoubleArrowIcon />{" "}
                  {changes[key]}
                </>
              )}
            </p>
          ))}
          {status === "PENDING" && (
            <div className="requestModalActionBtnWrapper">
              <Button
                className="approveBtn"
                onClick={() => {
                  handleReviewRequest({
                    requestId: _id,
                    updatedStatus: "approve",
                  });
                }}
                variant="contained"
              >
                Approve
              </Button>
              <Button
                className="rejectBtn"
                onClick={() => {
                  handleReviewRequest({
                    requestId: _id,
                    updatedStatus: "reject",
                  });
                }}
                variant="contained"
              >
                Reject
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RequestCard;
