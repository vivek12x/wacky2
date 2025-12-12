import { create } from 'zustand';
import { Product, Customer, CartItem, SalesData } from '@/types';
import { initialProducts, initialCustomers, initialSales } from '@/lib/mockData';

interface StoreState {
    products: Product[];
    customers: Customer[];
    cart: CartItem[];
    sales: SalesData[];

    // Inventory Actions
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;

    // Cart Actions
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    checkout: () => void;

    // Customer Actions
    updateCustomerBalance: (customerId: string, amount: number) => void;
    updateCustomer: (customerId: string, updates: Partial<Customer>) => void;
}

export const useStore = create<StoreState>((set) => ({
    products: initialProducts,
    customers: initialCustomers,
    cart: [],
    sales: initialSales,

    setProducts: (products) => set({ products }),

    addProduct: (product) => set((state) => ({
        products: [...state.products, product]
    })),

    updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
    })),

    addToCart: (product) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        return {
            cart: [...state.cart, { id: product.id, name: product.name, price: product.sellingPrice, quantity: 1 }]
        };
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId)
    })),

    updateCartQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
            return { cart: state.cart.filter((item) => item.id !== productId) };
        }
        return {
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        };
    }),

    clearCart: () => set({ cart: [] }),

    checkout: () => set((state) => {
        // 1. Deduct stock
        const newProducts = state.products.map((p) => {
            const cartItem = state.cart.find((c) => c.id === p.id);
            if (cartItem) {
                return { ...p, quantity: Math.max(0, p.quantity - cartItem.quantity) };
            }
            return p;
        });

        // 2. Add to sales (Simplified: just add transaction total to a new "Today" entry or update last entry)
        // For demo, we won't strictly update the chart data unless asked, but we update inventory which is critical.

        return {
            products: newProducts,
            cart: []
        };
    }),

    updateCustomerBalance: (customerId, amount) => set((state) => ({
        customers: state.customers.map((c) =>
            c.id === customerId ? { ...c, balance: c.balance + amount } : c
        )
    })),

    updateCustomer: (customerId, updates) => set((state) => ({
        customers: state.customers.map((c) =>
            c.id === customerId ? { ...c, ...updates } : c
        )
    }))

}));
