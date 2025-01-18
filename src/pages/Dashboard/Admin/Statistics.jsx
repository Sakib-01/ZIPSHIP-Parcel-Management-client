import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Calendar } from "react-date-range";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: cards = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-card");
      return res.data;
    },
  });

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
  if (isLoading) return <LoadingSpinner />;
  console.log(cards);
  return (
    <div>
      <h2 className="text-3xl flex mx-auto justify-center items-center text-primary underline mb-10 pt-2">
        Admin statistic
      </h2>
      <div className="stats shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat place-items-center">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${cards?.revinue}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title"> Total Users</div>
          <div className="stat-value ">{cards?.users}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Delivery Man</div>
          <div className="stat-value">{cards?.deliveryMan}</div>
        </div>
      </div>

      <div className="stats shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <div className="stat place-items-center">
          <div className="stat-title">Parcels</div>
          <div className="stat-value">{cards?.booking}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Parcel Delivered</div>
          <div className="stat-value">{cards?.parcelDelivered}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Parcel On Way</div>
          <div className="stat-value">{cards?.parcelOnWay}</div>
        </div>
      </div>

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
