import { useState,useEffect} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useGetPharmacistsQuery, useGetPhysiciansQuery,useGrantAccessMutation } from "../../features/api/apiSlice";
import  toast  from 'react-hot-toast';

const Consultation = ({ open, handleOpen,closeModal }) => {
  const { data, isSuccess } = useGetPharmacistsQuery();
 const [pharmacistUsername, setPharmacistUsername] = useState();
 const [physicianUsername, setPhysicianUsername] = useState();


  const [grantAccess, { isLoading, isSuccess:isGranted, isError, error }] = useGrantAccessMutation();
  const handleGrantAccess=()=>{
   if(pharmacistUsername && physicianUsername) grantAccess({
    pharmacistUsername,physicianUsername
   })
  }

  const pharmacistUsernameHandle=(value)=>{
    setPharmacistUsername(value)
  }


  const physicianUsernameHandle=(value)=>{
    setPhysicianUsername(value)
  }

  if(isGranted) {
    closeModal(false);
  toast.success("granted success");
  }


  const { data: response, isSuccess: getPhysiciansSuccess } = useGetPhysiciansQuery();

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
        <Card className="mx-auto w-[26rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h6" className="text-lg">
              Grant access
            </Typography>
            <div className="w-full">
              {getPhysiciansSuccess && (
                <Select label="Choose a physician" onChange={physicianUsernameHandle}>
                  {response.data.physicians.map((physician) => (
                    <Option key={physician.email} value={physician.username}>
                      {physician.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <div className="w-full">
              {isSuccess && (
                <Select label="Choose a pharmacist" onChange={pharmacistUsernameHandle}>
                  {data.data.pharmacist.map((pharmacist) => (
                    <Option key={pharmacist.email} value={pharmacist.username}>
                      {pharmacist.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            {/* <Textarea label="Describe symptoms" /> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-primary" onClick={handleGrantAccess} fullWidth>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default Consultation;
