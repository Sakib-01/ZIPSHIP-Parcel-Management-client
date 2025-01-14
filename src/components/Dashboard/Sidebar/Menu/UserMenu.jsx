import React from "react";
import MenuItem from "./MenuItem";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaBoxes } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div>
      <MenuItem
        icon={CiBookmarkCheck}
        label="Book Parcel"
        address="book-parcel"
      />
      <MenuItem icon={FaBoxes} label="My Parcel" address="my-parcel" />
      <MenuItem icon={CgProfile} label="My Profile" address="my-profile" />
    </div>
  );
};

export default UserMenu;
