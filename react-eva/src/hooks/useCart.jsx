import { useContext } from "react"
import { AppContext } from "../App"

export const useCart= ()=>{
    const {cartItems, setCartItems}=useContext(AppContext);
    const totalPrice=cartItems.reduce((sum, obj)=> Number(obj.price) + sum, 0 );
    const tax=Math.round(totalPrice * 0.05);
    const resultTotalPrice=new Intl.NumberFormat("ru-RU").format(totalPrice);
    return { cartItems, setCartItems, resultTotalPrice, tax }
}