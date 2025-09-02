import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "../types";

interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateCart: (productId: string, newQuantity: number) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item,
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price * product.quantity!,
          }));
        }
      },
      removeFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.filter((item) => item.id !== product.id);
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price * product.quantity!,
          }));
        }
      },
      updateCart: (productId: string, newQuantity: number) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === productId);

        if (cartItem && newQuantity >= 0) {
          const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item,
          );

          const updatedTotalItems = updatedCart.reduce(
            (total, item) => total + item.quantity!,
            0,
          );
          const updatedTotalPrice = updatedCart.reduce(
            (total, item) => total + item.price * item.quantity!,
            0,
          );

          set({
            cart: updatedCart,
            totalItems: updatedTotalItems,
            totalPrice: updatedTotalPrice,
          });
        }
      },
    }),
    {
      name: "cart-storage",
      version: 2,
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
    },
  ),
);
