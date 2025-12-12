import { ProductGrid } from "@/components/billing/ProductGrid";
import { CartSummary } from "@/components/billing/CartSummary";

export default function BillingPage() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
            <div className="w-full lg:w-[60%] flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Billing & POS</h1>
                <ProductGrid />
            </div>
            <div className="w-full lg:w-[40%] h-full">
                <CartSummary />
            </div>
        </div>
    );
}
