import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Consultations from "../components/Consultations";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import CenterContent from "../components/layout/CenterContent";

const PatientAccount = () => {
  const { token, user } = useSelector((state) => state.auth);
  const data = [
    {
      label: "Dashboard",
      value: "dashboard",
      Desc: Dashboard,
    },
    {
      label: "Consultations",
      value: "consultation",
      Desc: Consultations,
    },
    {
      label: "Profile",
      value: "profile",
      Desc: Profile,
    },
  ];

  return (
    <div className="relative flex mt-[84px] justify-center flex-1 w-full">
      <div className="absolute w-full h-full glass"></div>
      <CenterContent>
        <Tabs value="dashboard" className="w-full">
          <TabsHeader className="w-full">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
            className="w-full"
          >
            {data.map(({ value, Desc }) => (
              <TabPanel key={value} value={value} className="w-full mt-2">
                {<Desc />}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </CenterContent>
    </div>
  );
};

export default PatientAccount;
