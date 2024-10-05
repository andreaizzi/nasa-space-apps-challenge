export const barChartDataDailyTraffic = [
    {
      name: "Daily CHS",
      data: [7, 6, 5, 5.2, 4, 4.2, 5.7],
    },
  ];
  
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
      categories: ["M", "T", "W", "T", "F", "S", "S"],
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
            color: "#03C46B",  // Start with green
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