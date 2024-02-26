import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

import { CaretDown } from "@phosphor-icons/react"



export function Dropdown ({ selectedDocument, onSelectedDocumentChange, onPriceChange, onPricePer100gChange, onLowestPricePer100gChange, onAveragePricePer100gChange }) {

  const [documents, setDocuments] = useState([]);
  const [selectedDocumentDetails, setSelectedDocumentDetails] = useState(null);

  const API = "https://toronto-food-basket-backend.vercel.app"
  // const API = "http://localhost:5000/"


 
  useEffect(() => {
    console.log("Fetching data...");
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data received:", data);
        setDocuments(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  
  useEffect(() => {
    
    // Fetch details for the selected document when it changes
    if (selectedDocument) {
      fetch(`${API}/details/${selectedDocument}`)
        .then((response) => response.json())
        .then((details) =>  {
            // console.log("Price: " + details.price);
            // console.log("Price per 100g: " + details.pricePer100g);
            console.log(`${API}/details/${selectedDocument}`)

            onPriceChange(details.price)
            onPricePer100gChange(details.pricePer100g)
            onLowestPricePer100gChange(details.lowestPricePer100g)
            onAveragePricePer100gChange(details.averagePricePer100g)

           
        })        
        .catch((error) => console.error("Error fetching document details:", error));
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
      <CaretDown
        
      />

      <select className={styles.dropDown} value={selectedDocument} onChange={handleDropdownChange}>
        <option value="" disabled>
          Select a product
        </option>
        {documents.map((document) => (
          <option 
            value={document.id}
            key={document._id}>
            {document.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown