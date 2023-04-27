import { Button, Card, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../features/api/apiSlice";

const Signup = () => {
  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [userRole, setRole] = useState();
  const [gender,setGender]=useState();

  const handleRoleSelect = (value) => {
    setRole(value);
  };
  const handleGender=(value)=>{
    setGender(value)
  }

  const handleSignup = async (formdata) => {
    delete formdata.confirmPassword;
    const endpoint = `${userRole}s`;
    signup({ endpoint, userData: { ...formdata, userRole } });
  };

  useEffect(() => {
    if (isSuccess){
      toast.success("success");
      return navigate("/account");
    }
     if(isError){
      navigate("/");
      return toast.error(error?.data.user.message || "Error occured");
     }
    
  }, [isSuccess, navigate]);

  return (
    <div className="relative flex items-center justify-center flex-1 w-full bg-no-repeat bg-cover bg-landing">
      <div className="absolute w-full h-full glass"></div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
          onSubmit={handleSubmit(handleSignup)}
        >
          <div className="flex flex-col gap-4 mb-4">
            <div className="w-full">
              <Select
                label="Select your role"
                {...register("userRole", {
                  validate: () => Boolean(userRole) || "Role is required",
                })}
                error={!!errors.userRole && !userRole}
                onChange={handleRoleSelect}
              >
                <Option value="patient">Patient</Option>
                <Option value="pharmacist">Pharmacist</Option>
                <Option value="physician">Physician</Option>
              </Select>
            </div>
            {errors.role && !role && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.role.message}
              </p>
            )}
            <Input
              size="lg"
              label="Name"
              error={!!errors.name}
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.name.message}
              </p>
            )}
            <Input
              size="lg"
              label="Phone Number"
              error={!!errors.phoneNumber}
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
              <Input
              size="lg"
              label="Username"
              error={!!errors.username}
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.username.message}
              </p>
            )}
                <div className="w-full">
              <Select
                label="Select your gender"
                {...register("gender", {
                  validate: () => Boolean(gender) || "gender is required",
                })}
                error={!!errors.gender && !gender}
                onChange={handleGender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>
            {errors.gender&& ! gender && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.gender.message}
              </p>
            )}
            
              <Input
              size="lg"
              label="Age"
              error={!!errors.age}
              {...register("age", {
                required: "age is required",
              })}
            />
            {errors.age && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.age.message}
              </p>
            )}
            <Input
              size="lg"
              label="Email"
              error={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.email.message}
              </p>
            )}
            <Input
              type="password"
              size="lg"
              label="Password"
              error={!!errors.password}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=[^ ]).{5,}/,
                  message: "Password should be at least 5 characters",
                },
              })}
            />
            {errors.password && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.password.message}
              </p>
            )}
            <Input
              type="password"
              size="lg"
              label="Confirm password"
              {...register("confirmPassword", {
                validate: (value) => {
                  const { password } = getValues();
                  return (value && password === value) || "Passwords should match";
                },
              })}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button className="mt-6 bg-primary flex justify-center" fullWidth type="submit">
            {!isLoading ? (
              "Signup"
            ) : (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white text-xl "
                strokeWidth="56px"
              />
            )}
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium transition-colors text-primary hover:text-green-900"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
