import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoMdPower } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user-icon.svg";
import { logout } from "../features/auth/authSlice";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 pr-2 rounded-full py-0.5 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="border border-primary p-0.5 text-gray-400"
            src={userIcon}
          />
          <FaChevronDown
            strokeWidth={2.5}
            className={`w-3 h-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={closeMenu}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <IoMdPower className="w-4 h-4 text-red-500" />
          <Typography as="span" variant="small" className="font-normal" color="red">
            Logout
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
