import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";

const RP_KEY = process.env.REACT_APP_RAZORPAY_KEY; //check env here

const loadScript = (src)=>{

    return new Promise((resolve)=>{

        const script = document.createElement("script")
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }
        script.onerror= ()=>{
            resolve(false)
        }

        document.body.appendChild(script)

    })

}


export async function buyCourse(token,courses,user,navigate,dispatch){

        const toastId = toast.loading("Loading...")

        try {
            
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if(!res) {
                toast.error("RazorPay SDK failed to load");
                return;
            }

            const orderCreate = await apiConnector("POST",studentEndpoints.COURSE_PAYMENT_API,
            {courses},{
                Authorisation: `Bearer ${token}`,
            });

            if(!orderCreate.data.success){
                throw new Error(orderCreate?.data?.message)
            }

            console.log("The payment Response from order api -> ", orderCreate?.data);

            const modalOptions ={

                key:RP_KEY,
                currency:orderCreate?.data?.data?.currency,
                amount:`${orderCreate.data?.data?.amount}`,
                order_id:orderCreate?.data?.data?.id,
                name:"StudyNotion",
                description:"Thank you for purchasing a course from StudyNotion",
                image:rzpLogo,
                prefill:{
                    name:`${user?.firstName}`,
                    email:`${user?.email}`,
                },
                handler: function(response){
                    //verify payment
                    verifyPayment({...response,courses},token,navigate,dispatch)

                    //send email
                    sendConfirmationMail(response,orderCreate?.data?.data?.amount , token)

                }

            }

            const paymentObject = new window.Razorpay(modalOptions);
            paymentObject.open();
            paymentObject.on("payment.failed", function(response) {
                toast.error("oops, payment failed");
                console.log(response.error);
            })
           
        } catch (error) {
            console.log("payment api buycourse API ERROR............", error)
            toast.error(`${error?.response?.data?.message}`)
        }finally{
            toast.dismiss(toastId)
        }

};


async function verifyPayment(bodyData,token,navigate,dispatch){

    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));

    try{ 

        const result = await apiConnector("POST",studentEndpoints.COURSE_VERIFY_API,bodyData,{
            Authorisation:`Bearer ${token}`,
        })

        if(!result?.data?.success){
            throw new Error(result?.data?.message);
        }

        toast.success("Payment successfull, Welcome aboard");
        const updatedUser = result?.data?.data;
        //updating user profile
        console.log("Updated User-> " , updatedUser);
        setUser(updatedUser)

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }catch(err){
        console.log("PAYMENT VERIFY ERROR....", err);
        toast.error("Could not verify Payment");

    }finally{
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }   


};

async function sendConfirmationMail(response,amount,token){

    try{

        const result = await apiConnector("POST",studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
            orderId: response?.razorpay_order_id,
            paymentId: response?.razorpay_payment_id,
            amount,
        },{
                Authorisation:`Bearer ${token}`,
            });

        if(!result?.data?.success){
            throw new Error(result?.data?.message)
        };

        toast.success(`${result?.data?.message}`)

    }catch(err){
        console.log("Err in sending payment confirmation email-> ",err);
    }

};