import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CenterContent from "../components/layout/CenterContent";

const Landing = () => {
  return (
    <div className="relative flex-1 w-full bg-no-repeat bg-cover bg-landing">
      <div className="absolute w-full h-full glass"></div>
      <div className="relative z-50 flex justify-center mt-44">
        <CenterContent>
          <div className="text-center max-w-[670px] mx-auto">
            <h1 className="font-semibold text-[42px] leading-[50px]">
              A revolutionary way to get your prescriptions
            </h1>
            <p className="mt-4">
              Med-Connect connects patients with pharmacists for fast diagnosis and prescription of
              medication from the comfort of their own homes. It allows patients to describe their
              symptoms and receive a diagnosis, without an in-person visit.
            </p>
            <Link to="/login">
              <Button className="mt-8 text-lg font-semibold normal-case bg-primary hover:shadow-md px-9">
                Get started
              </Button>
            </Link>
          </div>
        </CenterContent>
      </div>
    </div>
  );
};

export default Landing;
