import ServiceTitle from "./ServiceTitle";
import "./Result.scss";
import updateCaptchImage from "../assets/retry.png";
import Button from "../UI/Button.jsx";
import { useEffect, useState } from "react";
import { fetchResults } from "../services/services.js";
import ResultCard from "./ResultCard.jsx";

export default function Result() {
  const [results, setResults] = useState({
    list: [],
    isLoading: true,
  });
  const { list: resultList, isLoading: isResultsLoading } = results;
  const getResults = async () => {
    try {
      const res = await fetchResults();
      console.log("results", res);
      const { results } = res;

      setResults({
        list: results,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getResults();
  }, []);
  return (
    <div className="resultService">
      <ServiceTitle serviceTitle="Result" />
      <div className="resultWrapper">
        {isResultsLoading ? (
          <h1>Loading...</h1>
        ) : (
          resultList.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))
        )}
      </div>
    </div>
  );
}
