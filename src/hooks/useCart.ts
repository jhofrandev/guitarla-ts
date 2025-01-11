import { useState, useEffect, useMemo } from "react";

import { db } from "../data/db";


export const useCart = () => {
    const initialCart = () => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    };

    const [data, setData] = useState([]);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        setData(db);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function handleAddToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }

    function incrementQuantity(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function decrementQuantity(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    return {
        data,
        cart,
        handleAddToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    };

}

