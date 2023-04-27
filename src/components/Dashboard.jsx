import {useState,useEffect } from 'react';
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { user ,token } = useSelector((state) => state.auth);
  const [medicines, setMedicines] = useState([]);
  const [grantedPhysicians, setGrantedPhysicians] = useState([]);
  console.log(token,"kkkkkkkkkkkkkk")
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/medecine',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setMedicines(response.data.data.medicines);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMedicines();

    async function fetchGrantPhyisicians() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/physicians/granted',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setGrantedPhysicians(response.data.data.physicians);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGrantPhyisicians();
  }, []);

   console.log(medicines,"sssssssssssssssssssss")
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold">Welcome {user.name}!</h3>
      <div className="flex w-full justify-between items-center mt-2">
        <p>medecines updates</p>
      </div>
      <div className="flex gap-8 mt-5">
        
        {user.role==="patient" ? medicines.map((item)=>
        
        <Card className="w-1/2 border">
          <CardBody>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="paragraph" className="mt-2">
              {item.price}
            </Typography>
          </CardBody>
          <CardFooter className="-mt-6">
            <Typography>Click consultations to view more</Typography>
          </CardFooter>
        </Card>
        ):
        grantedPhysicians.map((item)=>
        
        <Card className="w-1/2 border">
          <CardBody>
            <Typography variant="h6">{item.username}</Typography>
            <Typography variant="paragraph" className="mt-2">
              {item.price}
            </Typography>
          </CardBody>
          <CardFooter className="-mt-6">
            <Typography>Click consultations to view more</Typography>
          </CardFooter>
        </Card>
        )
        }
      </div>
    </div>
  );
};
export default Dashboard;
