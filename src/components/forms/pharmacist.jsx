import { useState, useEffect } from 'react';
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
import { Input } from 'postcss';
import { useGetPharmacistsQuery, useGetPhysiciansQuery,useGrantAccessMutation } from "../../features/api/apiSlice";
// import  toast  from '{ open, handleOpen,closeModal }react-hot-toast';

const Pharmacist = ({ open, handleOpen,closeModal }) => {
      const { data, isSuccess } = useGetPharmacistsQuery();
    //  const [pharmacistUsername, setPharmacistUsername] = useState();
    //  const [physicianUsername, setPhysicianUsername] = useState();


      const [grantAccess, { isLoading, isSuccess:isGranted, isError, error }] = useGrantAccessMutation();
      const handleGrantAccess=()=>{
       if(pharmacistUsername && physicianUsername) grantAccess({
        pharmacistUsername,physicianUsername
       })
      }

    //   const pharmacistUsernameHandle=(value)=>{
    //     setPharmacistUsername(value)
    //   }


    //   const physicianUsernameHandle=(value)=>{
    //     setPhysicianUsername(value)
    //   }

      if(isGranted) {
        closeModal(false);
      toast.success("granted success");
      }


    //   const { data: response, isSuccess: getPhysiciansSuccess } = useGetPhysiciansQuery();

    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-[26rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h6" className="text-lg">
                            create medecines
                        </Typography>

                        <div className="w-full">
                            <input type="text" placeholder="username"/>
                        </div>
                        <div className="w-full">
                        <input type="text" placeholder="name"/>
                        </div>
                        <div className="w-full">
                        <input type="text" placeholder="price"/>
                        </div>
                        <div className="w-full">
                        <input type="date" placeholder="expirationDate"/>
                        </div>
                        {/* <Textarea label="Describe symptoms" /> */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className="bg-primary"  fullWidth>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default Pharmacist;
