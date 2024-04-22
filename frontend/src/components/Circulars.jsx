import "./Circulars.scss";
import ServiceTitle from "./ServiceTitle";
import YearMonthFilter from "./YearMonthFilter";
import { downloadCircular, fetchCirculars } from "../services/services";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import UploadCircularButton from "./UploadCircularButton";
import { formatDate } from "../utils/utilityFunctions";
import { AuthContext } from "../context/AuthContext";

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
    console.log(response);
  };

  const handleDownload = async ({ url, fileName }) => {
    const response = await downloadCircular({ url, fileName });
    if (response) {
      toast.success("Circular downloaded successfully");
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
