import "../../../global.css";
import styles from "./Monthly100g.module.css"
import { Graph } from "../Graph";
import React, { useState, useEffect } from "react";



export function Monthly100g({ selectedDocument, onSelectedDocumentChange, }) {
//   const { analyticsDataState } = useAnalyticsData();

const [chartData, setChartData] = useState({
  ignite: [],
  expertsClub: [],
});


useEffect(() => {
  // Fetch details for the selected document when it changes
  if (selectedDocument) {
    fetch(`http://localhost:5000/price/${selectedDocument}`)
      .then((response) => response.json())
      .then((details) => {
        console.log(details[0].avgPricePerMonth);

        const avgPricePerMonth = details[0].avgPricePerMonth;

        // Separate keys and values into two arrays
        const pricePer100gValues = Object.values(avgPricePerMonth);
        const numericIgniteValues = pricePer100gValues.map(value => parseFloat(value));

        const expertsClubKeys = Object.keys(avgPricePerMonth);
        const numericExpertClubKeys = expertsClubKeys.map(value => parseFloat(value))

        setChartData({
         pricePer100g: numericIgniteValues,
          expertsClub: expertsClubKeys,
        });
      })
        .catch((error) => console.error("Error fetching document details:", error));
      } else {
        // Reset details if no document is selected
        setChartData({
          ignite: [],
          expertsClub: [],
        });
      }
    }, [selectedDocument]);


  const handleDropdownChange = (event) => {
    const selectedDocumentId = event.target.value;
    onSelectedDocumentChange(selectedDocumentId);
  };

  const lastExpertsClubValue = chartData.expertsClub[chartData.expertsClub.length - 1];
  

  const options= {
    title: {
        text: "",
    },

    chart:{
      backgroundColor: "var(--woodsmoke-50)",
      // width: 1000, // Set the width to 100%

    },

    series: [
        // {
        //     type: "column",
        //     name: "",
        //     color: "var(--chestnut-500)",
        //     data: chartData.pricePer100g,
        // },
        {
            type: "spline",
            name: "Average Price Per 100g",
            color: "var(--sweetcorn-600)",
            data: chartData.pricePer100g,
            
            


        },
    ],

    xAxis: {
      categories: chartData.expertsClub, // Set categories from expertsClubKeys
        min: 0,
        max: chartData.expertsClub.length -1,
        tickInterval: 1,
        labels: {
          style: {
            fontFamily: "Geist", // Set your desired font family
            fontSize: "18px", // Set your desired font size
            fontWeight: "600",
            color: "var(--woodsmoke-600)", // Set your desired label color
          },
        },
    },

    yAxis: {
        title: {
            text: "",
        },
        labels: {
          style: {
            fontFamily: "Geist", // Set your desired font family
            fontSize: "18px", // Set your desired font size
            fontWeight: "600",
            color: "var(--woodsmoke-600)", // Set your desired label color
          },
        },
    },

    legend: {
        align: "left",
        verticalAlign: "top",
        margin: 40,
        
    },

    // tooltip: {
    //     useHTML: true,
    //     formatter() {
    //         const self: TooltipFormatterContextObject = this;
    //         return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; z-index: 1">
    //         <h1 style="font-size: 30px; font-family: Inter; color: ${AnalyticsColors.black}; margin: 0px;"> ${self.point.y}</h1>
    //         <span style="font-size: 16px; font-weight: 500; font-style: normal; color: ${AnalyticsColors.darkGray}"> Acessos </span>
    //         </div>`;
    //     },
    // },
};
  return (
    <div>
      <Graph options={options} />
    </div>
  );
};

// export default Monthly100g;
