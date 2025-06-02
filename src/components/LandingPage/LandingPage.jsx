import React, { useState } from "react";
import styles from "../../App.module.css";
import { Results } from "../Results";
import Predata from "../Predata";
import Dropdown from "../Dropdown";
import Header from "../Header";
import { Monthly100g } from "../Graph/monthly100g/Monthly100g";
import { Slides } from "../Slides";

function LandingPage() {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [receivedPrice, setReceivedPrice] = useState("-");
  const [receivedPricePer100g, setReceivedPricePer100g] = useState("-");
  const [receivedLowestPricePer100g, setreceivedLowestPricePer100g] =
    useState("-");
  const [receivedAveragePricePer100g, setReceivedAveragePricePer100g] =
    useState("-");

  function handleSelectedDocumentChange(documentId) {
    setSelectedDocument(documentId);
  }

  const results = [
    {
      id: 1,
      title: "Highest price per 100g",
      price: 1.555,
      background: "var(--chestnut-400)",
    },
    {
      id: 2,
      title: "Lowest price per 100g",
      price: "-",
      background: "var(--sweetcorn-200)",
    },
    {
      id: 3,
      title: "Average price per 100g",
      price: "-",
      background: "var(--woodsmoke-100)",
    },
    {
      id: 4,
      title: "Last scraped total price",
      price: 1.455,
      background: "var(--woodsmoke-100)",
      color1: "var(--sweetcorn-600)",
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
      <div>
        <Header />
      </div>
      <div className={styles.slidesWrapper}>
        <Slides />
      </div>
      <div className={styles.predataWrapper}>
        <div className={styles.predataContent}>
          <Predata />
        </div>
      </div>
      <div className={styles.scraperAndGraph}>
        <div className={styles.scraperWrapper}>
          <Dropdown
            selectedDocument={selectedDocument}
            onSelectedDocumentChange={handleSelectedDocumentChange}
            onPriceChange={handlePriceFromChild}
            onPricePer100gChange={handlePricePer100gFromChild}
            onLowestPricePer100gChange={handleLowestPricePer100gFromChild}
            onAveragePricePer100gChange={handleAveragePricePer100gFromChild}
          />

          {updatedResults.map((result) => (
            <Results
              key={result.id}
              title={result.title}
              price={result.price}
              backgroundColor={result.background}
            />
          ))}
        </div>
        <div className={styles.graph}>
          <Monthly100g
            selectedDocument={selectedDocument}
            onSelectedDocumentChange={handleSelectedDocumentChange}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
