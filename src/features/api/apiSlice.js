import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../auth/authSlice";
import toast from "react-hot-toast";

const { VITE_API_URL } = import.meta.env;

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({ url: "/authentication/login", method: "POST", body: loginData }),
    }),
    signup: builder.mutation({
      async queryFn(args, { dispatch }, _extraOptions, fetchWithBQ) {
        const { endpoint, userData } = args;
        const {name,email,phoneNumber,username,gender,age,userRole,password} = userData;
        const response = await fetchWithBQ({
          url: "/authentication/register",
          method: "POST",
          body: {name,email,phoneNumber,username,gender,age,userRole,password},
        });
        if (response.error) toast.error(response.error.data.user.message)
        
        delete userData.password; 
        await fetchWithBQ({ url: endpoint, method: "POST", body: userData });
        dispatch(setUser(response.data));
        return response.data;
      },
    }),
    grantAccess: builder.mutation({
      async queryFn(args, { dispatch }, _extraOptions, fetchWithBQ) {
        console.log(args,"ssss")
        const { pharmacistUsername, physicianUsername } = args;
        const physician = await fetchWithBQ({
          url: "/physicians",
          method: "POST",
          body: {username:physicianUsername},
        });

        if (physician.error) toast.error(physician.error.data.user.message)
  
        const pharmacist = await fetchWithBQ({
          url: "/pharmacists",
          method: "POST",
          body: {username:pharmacistUsername},
        });
        console.log(pharmacist,"pharmacy")
        if (pharmacist.error) toast.error(pharmacist.error.data.user.message)
        return {pharmacist,physician}

      },
    }),
    getPhysicians: builder.query({
      query: () => "/physicians",
    }),
    getPharmacists: builder.query({
      query: () => "/pharmacists",
    }),
    //consultation
    getConsultations: builder.query({
      query: () => "/consultation",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetPharmacistsQuery,
  useGetPhysiciansQuery,
  useGrantAccessMutation,
  useGetConsultationsQuery
} = apiSlice;

export default apiSlice;
