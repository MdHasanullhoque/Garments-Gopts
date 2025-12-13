import React, { useEffect, useState } from "react";

const reviews = [
    {
        name: "Rahim Uddin",
        comment: "Excellent quality garments. Very satisfied!",
        role: "Retail Buyer"
    },
    {
        name: "Karim Ahmed",
        comment: "Fast delivery and premium fabric quality.",
        role: "Wholesaler"
    },
    {
        name: "Sadia Islam",
        comment: "Professional service and modern designs.",
        role: "Boutique Owner"
    }
];

const CustomerFeedback = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 bg-base-200 ">
            <div className="max-w-[1200px] mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">
                    Customer Feedback
                </h2>

                <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow bg-gradient-to-r from-slate-900 to-slate-800">
                    <p className="italic mb-4 text-white">
                        "{reviews[index].comment}"
                    </p>
                    <h4 className="font-semibold text-yellow-400 text-2xl">
                        {reviews[index].name}
                    </h4>
                    <span className="text-sm text-gray-600 font-semibold">
                        {reviews[index].role}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
