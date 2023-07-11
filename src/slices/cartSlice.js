import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";



const initialState = {
    //state attributes/values
    totalItems: 
        localStorage.getItem("totalItems") ?
        ( JSON.parse(localStorage.getItem("totalItems")) )
        :
        0,

    total:
        localStorage.getItem("total") ?
        ( JSON.parse(localStorage.getItem("total")) )
        :
        0,

    cart:
        localStorage.getItem("cart") ?
        ( JSON.parse(localStorage.getItem("cart")) )
        :
        [],
   
};


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        
        addToCart: (state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex(
                (item)=> item._id === course._id);

            if(index !== -1){
                toast.error("Course is already in cart!");
                return;
            };

            //update State
            state.cart.push(course);
            state.totalItems++;
            state.total += course.price

            //update localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));

            toast.success("Course added to Cart!");
            
        },
        removeFromCart: (state,action)=>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item)=> item._id === courseId);

            if(index === -1){
                toast.error("Course to be removed is not found in cart");
                return;
            }

            //update state values

            state.total -= state.cart[index].price;
            state.cart.splice(index, 1)
            console.log("cart state after removal-> ", state.cart);
            state.totalItems--;

            //update localStorage
             //update localStorage
             localStorage.setItem("cart", JSON.stringify(state.cart));
             localStorage.setItem("total",JSON.stringify(state.total));
             localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));

            toast.success("Course removed from cart");

        },
        resetCart: (state,action)=>{
            //flag for zero cart items
            //let flag=false;

            state.cart = [];
            state.total = 0;
            // if(state.totalItems === 0){
            //     flag = true;
            // }
            state.totalItems = 0;

             //update localStorage
             localStorage.setItem("cart", JSON.stringify(state.cart));
             localStorage.setItem("total",JSON.stringify(state.total));
             localStorage.setItem("totalItems" , JSON.stringify(state.totalItems));

            // flag ? toast.success("Come back soon!")
            // :
            // toast.success("Cart Emptied!");
        }

    }
});


export const {addToCart,removeFromCart,resetCart} = cartSlice.actions
export default cartSlice.reducer;