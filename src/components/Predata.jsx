import React, {useEffect, useState} from "react";
import { useSpring, animated } from "react-spring"; 

import styles from "./Predata.module.css";

export function Predata({ number, content }) {

  function Number({ n }){
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: {mass: 1, tension: 20, friction: 10},
    })
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
  }

  const [records, setRecords] = useState("")
  const [days, setDays] = useState("")

  useEffect(() => {
    console.log("Fetching data...");
    fetch(`http://localhost:5000/record-count`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setRecords(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  



  return (
    <div className={styles.predata}>
      <span><Number n={records.recordsOfData} /></span>
      <p>records count</p>
      <span><Number n={records.daysCount} /></span>
      <p>days of scraped data</p>

    </div>
  );
}
