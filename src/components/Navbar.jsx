import { GiHealthNormal } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import CenterContent from "./layout/CenterContent";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <header className="absolute w-full z-50 top-0 text-[#0f1713] py-5 shadow">
      <CenterContent>
        <div className="flex justify-between">
          <div className="flex items-center text-xl text-primary font-semibold gap-1">
            <Link to="/">Med-Connect</Link>
            <GiHealthNormal />
          </div>
          {token && <ProfileMenu />}
        </div>
      </CenterContent>
    </header>
  );
};

export default Navbar;
