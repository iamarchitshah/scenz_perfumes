import { useSyncExternalStore } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  volume: string;
};

type Listener = () => void;

let cartItems: CartItem[] = [];
let listeners: Listener[] = [];
let isCartOpen = false;

let snapshot = { items: cartItems, isOpen: isCartOpen };

const emitChange = () => {
  snapshot = { items: cartItems, isOpen: isCartOpen };
  for (const listener of listeners) {
    listener();
  }
};

export const CartStore = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return snapshot;
  },
  addItem(item: Omit<CartItem, 'quantity' | 'volume'>) {
    const existingIndex = cartItems.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      const newItems = [...cartItems];
      newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + 1 };
      cartItems = newItems;
    } else {
      cartItems = [...cartItems, { ...item, quantity: 1, volume: '35ml / 1.01 fl.oz' }];
    }
    isCartOpen = true; // Auto open cart when item added
    emitChange();
  },
  updateQuantity(id: number, delta: number) {
    cartItems = cartItems.map((i) =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    );
    emitChange();
  },
  removeItem(id: number) {
    cartItems = cartItems.filter((i) => i.id !== id);
    emitChange();
  },
  setIsOpen(open: boolean) {
    isCartOpen = open;
    emitChange();
  },
};

export function useCart() {
  return useSyncExternalStore(CartStore.subscribe, CartStore.getSnapshot, CartStore.getSnapshot);
}
