import React from "react";

const steps = [
    {
        id: 1,
        title: "Choose Product",
        desc: "Browse our collection and select your desired garment."
    },
    {
        id: 2,
        title: "Place Order",
        desc: "Add to cart and place your order easily."
    },
    {
        id: 3,
        title: "Fast Delivery",
        desc: "We deliver your product quickly and safely."
    },
    {
        id: 4,
        title: "Enjoy Product",
        desc: "Receive your garment and enjoy premium quality."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-[1200px] mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {steps.map(step => (
                        <div
                            key={step.id}
                            className="p-6 text-center border rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {step.id}
                            </div>
                            <h4 className="font-semibold mb-2">{step.title}</h4>
                            <p className="text-sm text-gray-600">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
