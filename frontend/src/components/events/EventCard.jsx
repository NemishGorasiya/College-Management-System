import { Box, IconButton, Modal } from "@mui/material";
import "./EventCard.scss";
import { useState } from "react";
import { modalStyle } from "../modal/modalStyle";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../../utils/utilityFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteEvent } from "../../services/services";
import toast from "react-hot-toast";
import AddNewEventModal from "./AddNewEventModal";
import EditEventModal from "./EditEventModal";

export default function EventCard({ eventDetails, getEvents, userType }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const handleOpenEditModal = () => setOpenEditModal(true);
	const handleCloseEditModal = () => setOpenEditModal(false);

	const handleDeleteEvent = async (eventId) => {
		try {
			const res = await deleteEvent(eventId);
			if (res) {
				toast.success("Event deleted successfully");
				getEvents();
			}
		} catch (error) {
			toast.error("Something went wrong while deleting event");
			console.error(error);
		}
	};

	const { _id, description, endDate, name, poster, startDate } = eventDetails;
	return (
		<>
			<div className="eventCardWrapper">
				<img className="eventImage" src={poster} alt="Event Poster" />
				<div className="eventDetailsWrapper">
					<p className="eventTitle">{name}</p>
					<p style={{ cursor: "pointer" }} onClick={handleOpen}>
						Know More
					</p>
				</div>
				{userType === "admin" && (
					<div className="crudButtonWrapper">
						<IconButton
							onClick={handleOpenEditModal}
							className="crudButton"
							size="large"
						>
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={() => {
								handleDeleteEvent(_id);
							}}
							className="crudButton"
							size="large"
						>
							<DeleteIcon />
						</IconButton>
					</div>
				)}
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
			<EditEventModal
				eventDetails={eventDetails}
				open={openEditModal}
				getEvents={getEvents}
				handleClose={handleCloseEditModal}
			/>
		</>
	);
}
