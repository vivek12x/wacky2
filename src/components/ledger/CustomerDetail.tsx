"use client";

import { Customer } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CustomerDetailProps {
    customer: Customer;
    onBack: () => void;
    onPayment: (amount: number) => void;
}

export function CustomerDetail({ customer, onBack, onPayment }: CustomerDetailProps) {
    // Gauge Data
    const score = customer.creditScore;
    const data = [
        { name: "Score", value: score },
        { name: "Remaining", value: 100 - score },
    ];

    // Color based on score
    let color = "#ef4444"; // Red (Bad)
    if (score > 50) color = "#eab308"; // Yellow (Average)
    if (score > 75) color = "#22c55e"; // Green (Good)

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <Button variant="ghost" onClick={onBack} className="mb-2 pl-0 hover:bg-transparent hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{customer.name}</CardTitle>
                        <CardDescription>Phone: {customer.phone}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center p-6">
                            <div className="text-4xl font-bold mb-2">₹{customer.balance}</div>
                            <div className="text-muted-foreground uppercase text-xs tracking-wider">Outstanding Balance</div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => onPayment(500)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Record Payment
                            </Button>
                            <Button className="flex-1" variant="outline" onClick={() => alert(`Reminder sent to ${customer.phone}`)}>
                                <Send className="mr-2 h-4 w-4" /> Send Reminder
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Credit Score</CardTitle>
                        <CardDescription>Customer trustworthiness rating (0-100)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] flex flex-col items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="70%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell key="cell-0" fill={color} />
                                    <Cell key="cell-1" fill="#e2e8f0" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <div className="text-4xl font-bold" style={{ color }}>{score}</div>
                            <div className="text-xs text-muted-foreground">Credit Score</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
