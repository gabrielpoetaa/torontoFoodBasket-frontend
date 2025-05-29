import React, { useEffect, useState, memo } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./Predata.module.css";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

const Predata = ({ number, content }) => {
  const [records, setRecords] = useState("");
  const API = "https://toronto-food-basket-backend.vercel.app";

  useEffect(() => {
    // console.log("Fetching data...");
    fetch(`${API}/record-count`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data received:", data);
        setRecords(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={styles.predata}>
      <span>
        <Number n={records.recordsOfData} />
      </span>
      <p>records count</p>
      <span>
        <Number n={records.daysCount} />
      </span>
      <p>days of scraped data</p>
    </div>
  );
};

export default memo(Predata);
