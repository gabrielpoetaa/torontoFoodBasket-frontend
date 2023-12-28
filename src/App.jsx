import "./global.css";
import styles from "./App.module.css";

import { Predata } from "./components/Predata";

import { Results } from "./components/Results";

import React, { useState } from "react";

import Dropdown from "./components/Dropdown";

function App() {
  const [receivedPrice, setReceivedPrice] = useState("-");
  const [receivedPricePer100g, setReceivedPricePer100g] = useState("-");
  const [receivedLowestPricePer100g, setreceivedLowestPricePer100g] =
    useState("-");
  const [receivedAveragePricePer100g, setReceivedAveragePricePer100g] =
    useState("-");

  const results = [
    {
      id: 1,
      title: "Highest price per 100g",
      price: 1.555,
    },
    {
      id: 2,
      title: "Lowest price per 100g",
      price: "-",
      background: "var(--sweetcorn-300)",
    },
    {
      id: 3,
      title: "Average price per 100g",
      price: "-",
      background: "var(--copperfield-400)",
    },
    {
      id: 4,
      title: "Last scraped total price",
      price: 1.455,
      background: "var(--chestnut-400)",
    },
  ];

  function handlePriceFromChild(price) {
    setReceivedPrice(price);
  }

  function handlePricePer100gFromChild(price) {
    setReceivedPricePer100g(price);
  }

  function handleLowestPricePer100gFromChild(price) {
    setreceivedLowestPricePer100g(price);
  }

  function handleAveragePricePer100gFromChild(price) {
    setReceivedAveragePricePer100g(price);
  }

  // Update the object with indicated index in the results array with the received price
  const updatedResults = results.map((result, index) => {
    if (index === 0) {
      return { ...result, price: receivedPricePer100g };
    }
    if (index === 1) {
      return { ...result, price: receivedLowestPricePer100g };
    }
    if (index === 2) {
      return { ...result, price: receivedAveragePricePer100g };
    }
    if (index === 3) {
      return { ...result, price: receivedPrice };
    }

    return result;
  });

  return (
    <div>
      <div className={styles.predataWrapper}>
        <div className={styles.predataContent}>
          <Predata />
        </div>
      </div>
      <div className={styles.scraperWrapper}>
        <Dropdown
          onPriceChange={handlePriceFromChild}
          onPricePer100gChange={handlePricePer100gFromChild}
          onLowestPricePer100gChange={handleLowestPricePer100gFromChild}
          onAveragePricePer100gChange={handleAveragePricePer100gFromChild}
        />
        {/* <button>
          <CaretDown />
          </button> */}

        <div>
          {updatedResults.map((result) => {
            console.log(result);
            return (
              <Results
                key={result.id}
                title={result.title}
                price={result.price}
                backgroundColor={result.background}
              />
            );
          })}
        </div>
        {/* <img src="./src/assets/images/Graph.jpg" alt="" /> */}
      </div>
      <div>
        {/* <Routes>
       <Route exact path="" element={<RecordList />} />
     </Routes> */}
      </div>
    </div>
  );
}

export default App;
