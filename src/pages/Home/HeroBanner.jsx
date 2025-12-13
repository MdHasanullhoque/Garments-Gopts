import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
    const navigate = useNavigate();

    return (
        <section className=" max-w-[1200px] mx-auto min-h-[50vh] flex items-center bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
            <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 mt-5">
                        Premium Garments for <span className="text-yellow-400">Modern Style</span>
                    </h1>

                    <p className="text-gray-300 mb-6 sm:mb-8 max-w-full md:max-w-lg">
                        Discover high-quality garments crafted for comfort, durability, and modern fashion. Perfect for everyday wear and professional use.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full md:w-auto">
                        <button
                            onClick={() => navigate("/products")}
                            className="btn btn-primary w-full sm:w-auto"
                        >
                            View Products
                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="border-2 border-white text-white p-2 rounded w-full 
                            sm:w-auto hover:bg-white hover:text-slate-900 transition"
                        >
                            Get Started
                        </button>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center md:justify-end mt-6 md:mt-0"
                >
                    <img
                        src="https://i.ibb.co/0fGzY5x/garments-banner.jpg"
                        alt="Garments"
                        className="rounded-xl shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md object-cover mb-2"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroBanner;
