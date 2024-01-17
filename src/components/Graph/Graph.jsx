import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts"

import styles from "./Graph.module.css";



export function Graph({ options }){
    Highcharts.setOptions({
        rangeSelector: {
            enabled: false,
        },
        navigator: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
  
        lang: {
            shortMonths: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
            ],
            decimalPoint: ",",
            thousandsSep: ".",
        },
    });
    return (
    <HighchartsReact highcharts={Highcharts} options={options} />

    )
}

export default Graph;
