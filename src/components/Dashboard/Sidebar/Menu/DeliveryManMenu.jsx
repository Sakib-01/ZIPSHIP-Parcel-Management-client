import React from "react";
import MenuItem from "./MenuItem";
import { MdHomeWork } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";

const DeliveryManMenu = () => {
  return (
    <div>
      <MenuItem
        icon={FaListCheck}
        label=" My Delivery List"
        address="dashboard"
      />
      <MenuItem icon={VscFeedback} label="My Reviews" address="my-review" />
    </div>
  );
};

export default DeliveryManMenu;
