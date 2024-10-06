export const barChartDataDailyTraffic = [
    {
      name: "Daily CHS",
      data: [34, 23, 56, 44, 32, 31, 42],
    },
  ];

const data = barChartDataDailyTraffic[0].data;
const lastValue = data[data.length - 1];
const secondLastValue = data[data.length - 2];

// Calculate the difference
const isPositive = lastValue <= 6.0;

const weekdayPos = [7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6];
const weekday = ["Sun", "Mon", "Tue", "Wed", "Tue", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Tue", "Fri", "Sat", "Sun"];

const d = new Date();
let day = weekdayPos[d.getDay()];

  
  export const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: [weekday[day+1], weekday[day+2], weekday[day+3], weekday[day+4], weekday[day+5], weekday[day+6], weekday[day]],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color:  isPositive ? "#03C46B" : "#C40303", 
            opacity: 1,        // Full opacity at the start
          },
          {
            offset: 100,
            color: "#FFFFFF",  // End with white
            opacity: 1,        // Full opacity at the end
          },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
  };