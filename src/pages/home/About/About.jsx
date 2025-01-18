import React from "react";
import image from "../../../assets/img/delivery.jpg";

const About = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between  gap-10 py-10">
      <div className="flex-grow w-10/12  space-y-5">
        <h1 className="text-primary text-5xl font-semibold text-start ">
          Merchant and Customer Satisfaction is Our First Priority
        </h1>
        <p className="text-text text-xl text-start">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <table className="border-collapse border border-gray-300 w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-lg font-medium text-gray-900">
                Parcel Weight
              </th>
              <th className="border border-gray-300 px-4 py-2 text-lg font-medium text-gray-900">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                Less than 1 kg
              </td>
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                50 Taka
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                Less than 2 kg
              </td>
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                100 Taka
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                More than 2 kg
              </td>
              <td className="border border-gray-300 px-4 py-2 text-md  text-gray-800">
                150 Taka
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex-grow flex md:justify-end ">
        <img className="p-5 w-10/12 " src={image} alt="" />
      </div>
    </div>
  );
};

export default About;
