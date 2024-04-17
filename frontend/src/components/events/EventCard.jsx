import { Box, IconButton, Modal } from "@mui/material";
import "./EventCard.scss";
import { useState } from "react";
import { modalStyle } from "../modal/modalStyle";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../../utils/utilityFunctions";

export default function EventCard({ eventDetails }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { description, endDate, name, poster, startDate } = eventDetails;
  return (
    <>
      <div className="eventCardWrapper" onClick={handleOpen}>
        <img className="eventImage" src={poster} alt="Event Poster" />
        <div className="eventDetailsWrapper">
          <p className="eventTitle">{name}</p>
          <p href="">Know More</p>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className="eventDetailsModal">
        <Box className="dialogBox" sx={modalStyle}>
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
          <img className="eventImage" src={poster} alt="Event Poster" />
          <div className="eventDetailsWrapper">
            <p className="eventTitle">{name}</p>
            <p className="eventTiming">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
            <p className="eventDescription">{description}</p>
          </div>
        </Box>
      </Modal>
    </>
  );
}
