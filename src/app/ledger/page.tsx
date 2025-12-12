"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { CustomerDetail } from "@/components/ledger/CustomerDetail";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Customer } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function LedgerPage() {
    const { customers, updateCustomerBalance } = useStore();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const handlePayment = (amount: number) => {
        // Logic for recording payment (simplified demo)
        if (selectedCustomer) {
            const id = selectedCustomer.id;
            // Deduct from balance
            updateCustomerBalance(id, -amount);

            // Update local selection to reflect change - wait store updates asynchronously usually but standard zustand is sync
            // We might need to fetch fresh customer from store, but let's just update local state or let reactivity handle it if we render from store.
            // Since "selectedCustomer" is a local copy, we should find it from "customers"
            // Better to store selectedCustomerId
        }
    };

    const activeCustomer = selectedCustomer ? customers.find(c => c.id === selectedCustomer.id) : null;

    if (activeCustomer) {
        return (
            <CustomerDetail
                customer={activeCustomer}
                onBack={() => setSelectedCustomer(null)}
                onPayment={(amount) => {
                    if (confirm("Record payment of ₹" + amount + "?")) {
                        updateCustomerBalance(activeCustomer.id, -amount);
                        alert("Payment recorded!");
                    }
                }}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Credit Ledger (Khatabook)</h1>
                <p className="text-muted-foreground">Track customer debts and credit scores.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>Select a customer to view details and record payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Credit Score</TableHead>
                                <TableHead className="text-right">Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => setSelectedCustomer(customer)}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {customer.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span>{customer.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <Badge variant={customer.creditScore > 75 ? "success" : customer.creditScore > 50 ? "warning" : "destructive"}>
                                            {customer.creditScore}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        ₹{customer.balance}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
