import { Button } from "@mui/material";
import AddNewEventModal from "./AddNewEventModal";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";

const AddNewEventButton = ({ getEvents }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<EventIcon />}
        sx={{ marginBottom: "20px" }}
        onClick={handleOpen}
      >
        Add New Event
      </Button>
      <AddNewEventModal
        getEvents={getEvents}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default AddNewEventButton;
