import "../../../global.css";
import styles from "./Monthly100g.module.css"
import { Graph } from "../Graph";


export function Monthly100g() {
//   const { analyticsDataState } = useAnalyticsData();
const data ={
  "ignite": [
      5000, 5000, 7000, 1000, 3000, 4000, 7000, 20008, 10009, 30000,
      40001, 60002, 10003, 50004, 100550, 500106, 100017, 100308,
      400109, 202000, 205001, 200022, 10003, 2004
  ],
  "expertsClub": [
      3000, 5000, 4000, 1000, 2000, 4000, 10007, 20003, 10006, 30030,
      400011, 60002, 10003, 500034, 100055, 10006, 100017, 30008,
      10009, 400200, 300051, 40022, 10008, 20003
  ]
};

const options = {
  
    title: {
      text: "",
      useHTML: true,
      align: "left",
      style: {
        padding: "30px",
        fontSize: "20px",
        color: "",
        fontWeight: "bold",
        fontStyle: "Normal",
        fontFamily: "Inter",
      },
    },

    chart: {
      backgroundColor: 'var(--woodsmoke-50)',
      type: 'line'
  },

    series: [
      {
        name: "Ignite",
        type: "spline",
        data: data.ignite,
        color: "",
      },
      {
        name: "Experts Club",
        type: "spline",
        data: data.expertsClub,
        color: "",
      },
    ],

    tooltip: {
      enabled: false,
    },

    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    // plotOptions: {
    //   column: {
    //     dataLabels: {
    //       useHTML: true,
    //       enabled: true,
    //       color: "",
    //       inside: true,
    //       verticalAlign: "bottom",
    //       borderWidth: 3,
    //       shadow: false,
    //       style: {
    //         fontSize: "36px",
    //         fontWeight: "bold",
    //         fontStyle: "Normal",
    //         lineHeight: "44px",
    //         fontFamily: "Inter",
    //         textOutline: "0",
    //         padding: "14px",
    //       },
    //     },
    //   },
    // },
  };

  return (
    <div>
      <Graph options={options} />
    </div>
  );
};

// export default Monthly100g;
