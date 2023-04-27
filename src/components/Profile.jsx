import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold">Your profile</h3>
      <div className="flex items-center justify-between w-full mt-2">
        <p>Your profile will be shared when you request consultation</p>
      </div>
      <div className="flex justify-center gap-8 mt-10">
        <Card className="relative w-1/2 overflow-hidden border">
          <CardBody>
            <div className="absolute top-0 left-0 w-full h-20 bg-blue-gray-300">
              <div className="relative w-full h-full bg-[#c2cac9]">
                <div className="absolute bottom-0 px-4 py-4 -translate-x-1/2 translate-y-1/2 border-4 border-white rounded-full left-1/2 bg-[#c2cac9]">
                  <FaUserAlt className="text-4xl text-white" />
                </div>
              </div>
            </div>
            <div className="mt-24">
              <Typography variant="h6" className="text-center">
                {user.username}
              </Typography>
              <Typography variant="small" className="text-center">
                {user.role}
              </Typography>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div>
                <h6 className="font-semibold">Age</h6>
                <p>{user.age || 'No age set'}</p>
              </div>
              <div>
                <h6 className="font-semibold">Mass(kg)</h6>
                <p>{user.mass || 'No mass set'}</p>
              </div>
              <div>
                <h6 className="font-semibold">Mobile</h6>
                <p>{user.phoneNumber || "No mobile set"}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end -mt-10">
            <Button variant="text" className="py-2 text-primary">
              Edit profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
