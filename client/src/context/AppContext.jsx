import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { assets, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [IsSeller, setIsSeller] = useState(false);
    const [showUserLogin, setshowUserLogin] = useState(false);
    const [Products, setProducts] = useState([]);
    const [cartItems, setcartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    // Add prodcuts to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setcartItems(cartData);
        toast.success("Added to Cart")
    }

    // Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setcartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product From Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        } 
        toast.success("Removed from Cart");
        setcartItems(cartData)
    }

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

     // Get Cart Total Amount
    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let Iteminfo = Products.find((product) => product._id === items);
            if(cartItems[items] > 0) {
                totalAmount += Iteminfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;

    }


    useEffect(() => {
      fetchProducts()
    }, [])
    

    const value = {navigate, user, setUser, setIsSeller, IsSeller, 
        showUserLogin, setshowUserLogin, Products, currency, addToCart, 
        updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartTotalAmount, getCartCount}
    return <AppContext.Provider value={value} >
            {children}
            </AppContext.Provider>
}


export const useAppContext = () => {
    return useContext(AppContext)
}