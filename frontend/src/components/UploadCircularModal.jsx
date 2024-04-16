import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { handleLogin, uploadCircular, uploadFile } from "../services/services";
import CloseIcon from "@mui/icons-material/Close";
import "./UploadCircularModal.scss";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UploadCircularModal = ({ open, handleClose }) => {
  const handleCircularChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const response = await uploadFile(formData);
    const {
      response: { secure_url },
    } = response;
    const res = await uploadCircular({
      title: "latest circular 1",
      link: secure_url,
    });
    if (res) {
      toast.success("Circular uploaded successfully");
    }
    console.log("response in circular", response);
  };

  return (
    <Modal open={open} className="uploadCircularModal">
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <FormControl variant="outlined" className="formControl">
          <InputLabel htmlFor="enrollmentNumber">Circular Name</InputLabel>
          <OutlinedInput id="title" name="title" label="Circular Name" />
        </FormControl>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ marginBottom: "20px" }}
        >
          Upload
          <VisuallyHiddenInput type="file" onChange={handleCircularChange} />
        </Button>
      </Box>
    </Modal>
  );
};

export default UploadCircularModal;
