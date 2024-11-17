import { createContext, useState } from "react";

export const StoreContext = createContext();

export function StoreProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) => item.id === product.id ? {
                    ...item, quantity: item.quantity + 1
                } : item)
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        })
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    }

    const clearCart = () => {
        setCart([]);
    }

    const incrementQuantity = (productId) => {
        setCart((prevCart) => prevCart.map((item) => item.id === productId ? {
            ...item, quantity: item.quantity + 1
        } : item))
    }

    const decrementQuantity = (productId) => {
        setCart((prevCart) => prevCart.map((item) => item.id === productId && item.quantity > 1 ? {
            ...item, quantity: item.quantity - 1
        } : item))
    }

    //wishlist
    const addToWishlist = (product) => {
        setWishlist([...wishlist, product]);
    }

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item.id !== productId));
    }


    return (
        <StoreContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </StoreContext.Provider>
    )

}