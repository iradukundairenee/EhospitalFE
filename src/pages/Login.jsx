import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/apiSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const navigate = useNavigate();
  const loginUser = (formdata) => {
    login(formdata);
  };

  useEffect(() => {
    if (isSuccess) navigate("/account");
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (token) navigate("/account");
  }, [token, navigate]);

  if (isError) toast.error(error?.data.user || "Error occured");

  return (
    <div className="relative flex items-center justify-center flex-1 w-full bg-no-repeat bg-cover bg-landing">
      <div className="absolute w-full h-full glass"></div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your credentials to login.
        </Typography>
        <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96" onSubmit={handleSubmit(loginUser)}>
          <div className="flex flex-col gap-5 mb-4">
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
            <Input
              type="password"
              size="lg"
              label="Password"
              error={!!errors.password}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="ml-1 -mt-4 text-xs font-medium tracking-wide text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="mt-6 bg-primary flex justify-center" type="submit" fullWidth>
            {!isLoading ? (
              "Login"
            ) : (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white text-xl "
                strokeWidth="56px"
              />
            )}
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium transition-colors text-primary hover:text-green-900"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
