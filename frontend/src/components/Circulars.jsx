import "./Circulars.scss";
import ServiceTitle from "./ServiceTitle";
import YearMonthFilter from "./YearMonthFilter";
import {
  deleteCircular,
  downloadCircular,
  fetchCirculars,
} from "../services/services";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import UploadCircularButton from "./UploadCircularButton";
import { formatDate } from "../utils/utilityFunctions";
import { AuthContext } from "../context/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Circulars() {
  const { userType } = useContext(AuthContext);
  const [circulars, setCirculars] = useState({
    list: [],
    isLoading: true,
  });
  const { list: circularList, isLoading: isCircularsLoading } = circulars || {};

  const getCirculars = async () => {
    const response = await fetchCirculars();
    setCirculars({
      list: response.circulars,
      isLoading: false,
    });
  };

  const handleDownload = async ({ url, fileName }) => {
    const response = await downloadCircular({ url, fileName });
    if (response) {
      toast.success("Circular downloaded successfully");
    }
  };

  const handleDeleteCircular = async (circularId) => {
    try {
      const response = await deleteCircular(circularId);
      if (response) {
        toast.success("Circular deleted successfully");
        getCirculars();
      }
    } catch (error) {
      toast.error("Something went wrong while deleting circular");
    }
  };

  useEffect(() => {
    getCirculars();
  }, []);

  return (
    <div className="circularsService">
      <ServiceTitle serviceTitle="Important Circulars" />
      {isCircularsLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="circularsWrapper">
          {userType === "admin" && (
            <UploadCircularButton getCirculars={getCirculars} />
          )}
          <YearMonthFilter />
          <div className="circularsContainer">
            {circularList.map((circular) => (
              <div key={circular.id} className="circular">
                <p
                  className="circularLink"
                  onClick={() => {
                    handleDownload({
                      url: circular.link,
                      fileName: circular.title,
                    });
                  }}
                >
                  {circular.title}
                </p>
                <p className="circularDate">{formatDate(circular.createdAt)}</p>
                {userType === "admin" && (
                  <IconButton
                    className="deleteButton"
                    onClick={() => {
                      handleDeleteCircular(circular.id);
                    }}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
