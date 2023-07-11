import { toast } from "react-hot-toast";
import { categories } from "../apis";
import { apiConnector } from "../apiConnector";



export async function getCategories(){

    //const toastId = toast.loading("Fetching categories...")
    try {

        const response = await apiConnector("GET", categories.CATEGORIES_API, {})

        console.log("category API RESPONSE............", response) 

        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

       // toast.success(`${response.data.message}`)
        return response;


    } catch (error) {
        console.log("get all categories API ERROR............", error)
        toast.error(`${error.response.data.message}`)
        return null;

        
    }finally{
        //toast.dismiss(toastId)
    }


};

export async function getCategoryPageDetails(data){

    //const toastId = toast.loading("Fetching category page...")
    try {

        const response = await apiConnector("POST", categories.CATEGORY_PAGE_API, data)

        console.log("category page API RESPONSE............", response) 

        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success(`${response.data.message}`);

        return response.data.data;


    } catch (error) {
        console.log("category page API ERROR............", error)
        toast.error(`${error.response.data.message}`)
        return null;

        
    }finally{
        //toast.dismiss(toastId)
    }


}