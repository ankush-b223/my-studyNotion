import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";

import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
import { setToken } from "../../slices/authSlice";




export function updateDP(token,formData){

    return async (dispatch)=>{
         
        const toastId = toast.loading("Loading");

        try{

            const result = await apiConnector("PUT",
                settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type":"multipart/form-data",
                    Authorisation: `Bearer ${token}`,
                }
            );

            console.log("Response from dp call -> ", result.data);

            if(!result.data.success){
                throw new Error(result.data.message);
            }

            toast.success("Dp Updated successfully!");
            dispatch(setUser(result.data.data));
            localStorage.setItem("user",  JSON.stringify(result.data.data));




        }catch(err){
            console.log("Something went wrong in dp updation call-> ",err);
            toast.error(`${err.response.data.message}`)

        }finally{
            toast.dismiss(toastId);
        }



    }
};

export function editProfile(token,formData){

    return async (dispatch)=>{
         
        const toastId = toast.loading("Loading");

        try{

            const result = await apiConnector("PUT",
                settingsEndpoints.UPDATE_PROFILE_API,
                formData,
                {
                    "Content-Type":"multipart/form-data",
                    Authorisation: `Bearer ${token}`,
                }
            );

            console.log("Response from dp call -> ", result.data);

            if(!result.data.success){
                throw new Error(result.data.message);
            }

            toast.success("Profile Updated successfully!");
            dispatch(setUser(result.data.data));

            localStorage.setItem("user",  JSON.stringify(result.data.data));




        }catch(err){
            console.log("Something went wrong in profile updation call-> ",err);
            toast.error(`${err.response.data.message}`)

        }finally{
            toast.dismiss(toastId);
        }



    }
};

export function deleteProfile(token,navigate){

    return async (dispatch)=>{
         
        const toastId = toast.loading("Loading");

        try{

            const result = await apiConnector("DELETE",
                settingsEndpoints.DELETE_PROFILE_API,
                {},
                {
                    "Content-Type":"multipart/form-data",
                    Authorisation: `Bearer ${token}`,
                }
            );

            console.log("Response from dp call -> ", result.data);

            if(!result.data.success){
                throw new Error(result.data.message);
            }

            
            dispatch(setUser(null));
            dispatch(setToken(null));

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            dispatch(resetCart())


            toast.success("Account Deleted :)");

            navigate("/");



        }catch(err){
            console.log("Something went wrong in profile deletion call-> ",err);
            toast.error(`${err.response.data.message}`)

        }finally{
            toast.dismiss(toastId);
        }



    }
};