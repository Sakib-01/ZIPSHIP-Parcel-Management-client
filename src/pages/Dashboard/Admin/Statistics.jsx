import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Calendar } from "react-date-range";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/admin-state");
        const data = response.data;

        const categories = data.map((item) => item._id); // Dates
        const series = data.map((item) => item.count); // Counts

        setChartData({
          categories,
          series: [{ name: "Bookings", data: series }],
        });
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
    title: {
      text: "Bookings by Date",
      align: "center",
    },
  };
  return (
    <div>
      <h2 className="text-3xl flex mx-auto justify-center items-center text-primary underline mb-10 pt-2">
        Admin statistic
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="w-8/12 text-text bg-slate-100 p-10">
          <Chart
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div className="border-2 border-secondary p-5">
          <Calendar color="#4cc718"></Calendar>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
