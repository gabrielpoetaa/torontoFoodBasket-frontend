import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";


export function Dropdown ({ onPriceChange, onPricePer100gChange, onLowestPricePer100gChange, onAveragePricePer100gChange }) {

  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedDocumentDetails, setSelectedDocumentDetails] = useState(null);

  useEffect(() => {
    // Fetch data from your API endpoint or route
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/list`)
      .then((response) => response.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  useEffect(() => {
    
    // Fetch details for the selected document when it changes
    if (selectedDocument) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/details/${selectedDocument}`)
        .then((response) => response.json())
        .then((details) =>  {
            console.log("Price: " + details.price);
            console.log("Price per 100g: " + details.pricePer100g);

            setSelectedDocumentDetails(details);

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
    setSelectedDocument(event.target.value);
  };


  return (
    <div>
      {/* <label>Select a document:</label> */}
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

      {/* <div>
        {selectedDocument && (
          <div>
            {selectedDocumentDetails && (
              <p>{selectedDocumentDetails.price}</p>
              // Add more details as needed
            )}
          </div>
        )}
      
      </div> */}
    </div>
  );
};

export default Dropdown