import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

import { CaretDown } from "@phosphor-icons/react";

export function Dropdown({
  selectedDocument,
  onSelectedDocumentChange,
  onPriceChange,
  onPricePer100gChange,
  onLowestPricePer100gChange,
  onAveragePricePer100gChange,
}) {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentDetails, setSelectedDocumentDetails] = useState(null);

  const API_URI = process.env.REACT_APP_API_URI;

  useEffect(() => {
    fetch(`${API_URI}`)
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch details for the selected document when it changes
    if (selectedDocument) {
      fetch(`${API_URI}/details/${selectedDocument}`)
        .then((response) => response.json())
        .then((details) => {
          onPriceChange(details.price);
          onPricePer100gChange(details.pricePer100g);
          onLowestPricePer100gChange(details.lowestPricePer100g);
          onAveragePricePer100gChange(details.averagePricePer100g);
        })
        .catch((error) =>
          console.error("Error fetching document details:", error)
        );
    } else {
      // Reset details if no document is selected
      setSelectedDocumentDetails(null);
    }
  }, [selectedDocument]);

  const handleDropdownChange = (event) => {
    const selectedDocumentId = event.target.value;
    onSelectedDocumentChange(selectedDocumentId);
  };

  return (
    <div>
      {/* <label>Select a document:</label> */}
      {/* <CaretDown
        
      /> */}

      <select
        className={styles.dropDown}
        value={selectedDocument}
        onChange={handleDropdownChange}
      >
        <option value="" disabled>
          Select a product
        </option>
        {documents.map((document) => (
          <option value={document.title} key={document._id}>
            {document.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
