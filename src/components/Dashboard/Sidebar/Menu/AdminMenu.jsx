import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { ImUsers } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="statistics" />
      <MenuItem icon={FaBoxes} label="All Parcels" address="all-parcels" />
      <MenuItem icon={ImUsers} label="All Users" address="all-users" />
      <MenuItem
        icon={MdDeliveryDining}
        label="All Delivery Men"
        address="all-deliverymen"
      />
    </>
  );
};

export default AdminMenu;
