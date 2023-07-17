import { endpoints } from "../apis";
import { setLoading, setSignupData, setToken } from "../../slices/authSlice";
import {resetCart} from "../../slices/cartSlice";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";


export function login(email,password,navigate){

    return async(dispatch)=>{

        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")

        try{

            const result = await apiConnector("POST" , endpoints.LOGIN_API , {email,password});
            console.log("response from login api BE-> " , result.data);

            if(!result.data.success){
                throw new Error(result.data.message);
            }

            toast.success("Login Successfull");

            dispatch(setToken(result.data.token));
            dispatch(setUser(result.data.data));

            localStorage.setItem("token" , JSON.stringify(result.data.token))
            localStorage.setItem("user",  JSON.stringify(result.data.data));
            dispatch(setLoading(false));
            toast.dismiss(toastId)
            navigate("/dashboard/my-profile");

            
        }catch(err){
            console.log("Err in login op -> " ,err);
            toast.error(`${err.response.data.message}`);
        }finally{
            toast.dismiss(toastId)
            dispatch(setLoading(false));

        }
    }

};

export function googlelogin(tokenResponse,navigate){

    return async(dispatch)=>{

        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...") 

        try{

            const result = await apiConnector("POST" , endpoints.LOGIN_API , tokenResponse);

            console.log("response from login api BE-> " , result.data);

            if(!result.data.success){
                throw new Error(result?.data?.message);
            }

            toast.success("Login Successfull");

            dispatch(setToken(result.data.token));
            dispatch(setUser(result.data.data));

            localStorage.setItem("token" , JSON.stringify(result.data.token))
            localStorage.setItem("user",  JSON.stringify(result.data.data));

            navigate("/dashboard/my-profile");

            
        }catch(err){
            console.log("Err in login op -> " ,err);
            toast.error(`${err?.response?.data?.message}`);
        }finally{
            toast.dismiss(toastId)
            dispatch(setLoading(false));

        }
    }

};

export function logout(navigate){
    return(dispatch)=>{
        
        navigate("/");
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out!");
    }
}

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastID  = toast.loading("Sending otp...");

        try{

            const result = await apiConnector("POST",endpoints.SENDOTP_API ,{email});
            console.log(result);
            if(!result.data.success){
                throw new Error(result.data.message)
            }
            dispatch(setLoading(false));
            toast.success("Otp sent to email!");
            toast.dismiss(toastID);
             
            navigate("/verify-email");


        }catch(err){
            console.log("Error in sending otp",err);
            toast.dismiss(toastID);
            toast.error(`${err.response.data.message}`);

        }finally{
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }

    }
};

export function signupGoogle( signupData,
    navigate){

        return async(dispatch)=>{
            dispatch(setLoading(true));
            const toastId = toast.loading("Signing you up...");

            try{
                
                const result = await apiConnector("POST",endpoints.SIGNUP_API , signupData);

                if(!result.data.success){
                    throw new Error(result.data.message)
                }
                console.log("Response from signup api -> ",result.data);

                toast.success("You are signed up!");
                dispatch(setSignupData(null))
                navigate("/login");

            }catch(err){
                console.log("Error in signup of user",err);
                toast.error(`${err.response.data.message}`);
                navigate("/signup")
    
            }finally{
                dispatch(setLoading(false));
                toast.dismiss(toastId);

            }


        }
};

export function signup( firstName ,
        lastName ,
        email ,
        password ,
        confirmPassword ,
        contactNumber ,
        accountType ,
        otp,navigate){

            return async(dispatch)=>{
                dispatch(setLoading(true));
                const toastId = toast.loading("Signing you up...");

                try{
                    
                    const result = await apiConnector("POST",endpoints.SIGNUP_API , {
                        firstName ,
                        lastName ,
                        email ,
                        password ,
                        confirmPassword ,
                        contactNumber ,
                        accountType ,
                        otp  
                    });

                    if(!result.data.success){
                        throw new Error(result.data.message)
                    }
                    console.log("Response from signup api -> ",result.data);
                    toast.success("You are signed up!");
                    dispatch(setSignupData(null))
                    dispatch(setLoading(false));
                    console.log("Line before navigate to login");
                    navigate("/login");


                }catch(err){
                    console.log("Error in signup of user",err);
                    toast.dismiss(toastId);
                    toast.error(`${err.response.data.message}`);
                    console.log("Line before signup");
                    navigate("/signup")
        
                }finally{
                    dispatch(setLoading(false));
                    toast.dismiss(toastId);

                }


            }
};

export function resetPassword(email){

    return async(dispatch)=>{

        dispatch(setLoading(true));
        const toastId = toast.loading("Sending reset Link");

        try{

            const result = await apiConnector("POST" , endpoints.RESETPASSTOKEN_API , {email})

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            toast.dismiss(toastId);
            toast.success("Reset Link sent to your email");

            dispatch(setLoading(false));


        }catch(err){
            console.log("Error in resendPass email token call",err)
            toast.error(`${err.response.data.message}`);
            toast.dismiss(toastId);

        }finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));

        }



    }


};

export function updatePassword(newPassword,token,navigate){
    return async (dispatch)=>{

        dispatch(setLoading(true));
        const toastId = toast.loading("Updating Password");

        try{

            const result = await apiConnector("POST" ,
             endpoints.RESETPASSWORD_API , {newPassword,token});

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            toast.dismiss(toastId);
            toast.success( `${result.data.message}`);

            dispatch(setLoading(false));


        }catch(err){
            console.log("Error in updating password",err)
            toast.error(`${err.response.data.message}`);
            navigate("/forgot-password")

        }finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));

        }

    }
}