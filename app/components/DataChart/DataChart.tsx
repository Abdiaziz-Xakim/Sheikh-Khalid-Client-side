import React, { useEffect, useRef } from "react";
// import { Chart, ChartConfiguration, registerables } from "chart.js";
// import { darkOptions } from "@/components/DataChart/Themes";
import { months } from "@/app/helper/Util";
import { darkOptions } from "./Themes";
import { Chart, ChartConfiguration, registerables } from "chart.js";
// import { months } from "@/helper/Util";

const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  const labels = months({ count: 7 });
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          ...darkOptions,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data]);
  return <canvas ref={chartRef} />;
};
Chart.register(...registerables);

export default DataChart;