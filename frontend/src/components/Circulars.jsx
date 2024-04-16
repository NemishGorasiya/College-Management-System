import "./Circulars.scss";
import ServiceTitle from "./ServiceTitle";
import YearMonthFilter from "./YearMonthFilter";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../services/services";
import { useRef } from "react";
import axios from "axios";

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

export default function Circulars() {
  const uploadCircularFormRef = useRef(null);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;
    console.log("data using form", data);
    // registerStudent({ data });
  };
  const BASE_URL = "http://localhost:3000/api";

  const handleCircularChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const response = await uploadFile(formData);
    console.log("response in circular", response);
  };
  return (
    <div className="circularsService">
      <ServiceTitle serviceTitle="Important Circulars" />
      <div className="circularsWrapper">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ marginBottom: "20px" }}
        >
          Upload New Circular
          <form
            action=""
            ref={uploadCircularFormRef}
            onSubmit={handleFormSubmit}
          >
            <VisuallyHiddenInput type="file" onChange={handleCircularChange} />
          </form>
        </Button>
        <YearMonthFilter />
        <div className="circularsContainer">
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
          <div className="circular">
            <a className="circularLink" href="">
              INSTRUCTIONS FOR FILLING THE EXAM FORMS OF SUMMER-2024 EXAMINATION
              B.PHARM SEM - 6 & 8 (REGULAR STUDENTS)
            </a>
            <p className="circularDate">01 Apr 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
