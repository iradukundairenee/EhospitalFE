import { Accordion, AccordionBody, AccordionHeader, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useGetConsultationsQuery } from "../features/api/apiSlice";
import ConsultationForm from "./forms/Consultation";
import { useSelector } from "react-redux";
import Pharmacist from '../components/forms/pharmacist';

const Consultations = () => {

  const [open, setOpen] = useState(false);
  const [openPharmacist, setOpenPharmacist] = useState(false);
  const { user ,token } = useSelector((state) => state.auth);
 const [openConsultation, setOpenConsultation] = useState();
const handleOpen = (value) => {
  setOpen(open === value ? 0 : value);
};

  const [dialogOpen, setDialogOpen] = useState(false);
  

  const handleDialogOpen = () => setDialogOpen((cur) => !cur);
  const { data , isSuccess } = useGetConsultationsQuery();
  const handleOpenConsultation=(index)=>{
    if(index===openConsultation) setOpenConsultation(-1)
    else{
      setOpenConsultation(index);
    }
   
  }

  return (
    <div className="w-full">
      {
      user.role=="patient" ?
      open && dialogOpen && 
      
      <ConsultationForm open={dialogOpen} handleOpen={handleDialogOpen} closeModal={setOpen}/>:
      openPharmacist && dialogOpen && <Pharmacist  open={dialogOpen} handleOpen={handleDialogOpen} closeModal={setOpenPharmacist}/>
    }
      <h3 className="text-lg font-semibold">How are you feeling today?</h3>
      <div className="">
        <div className="flex w-full justify-between items-center mt-2">
          <p>View updates about consultations you have submitted</p>
          <Button className="bg-primary py-2" onClick={()=>{handleDialogOpen();setOpen(true)}}>
          {user.role=="patient" ? 'Create new' : 'create medecine'}
          </Button>
        </div>
        <h2 className="font-semibold text-lg mt-5 mb-2">Consulations</h2>
        <div className="h-[400px] overflow-auto scrollbar scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-w-1 pr-2">
          {isSuccess && data.data.consultation.map((item,index)=>
            <Accordion open={openConsultation === index}>
            <AccordionHeader onClick={() => handleOpenConsultation(index)} className="py-2 hover:bg-[#F5F6F5] px-2">
              <div className="font-normal text-base flex flex-col items-start">
                <h2>{item.patientName}</h2>
                <div className="flex gap-14 text-xs items-center mt-[6px]">
                  <h3>Requested Dr. {item.doctorName}</h3>
                </div>
              </div>
            </AccordionHeader>
            <AccordionBody>
             {item.writtenConsultation}
            </AccordionBody>
          </Accordion>

          )}
          
        </div>
      </div>
    </div>
  );
};

export default Consultations;
