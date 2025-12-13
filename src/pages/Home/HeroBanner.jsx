
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-[80vh] flex items-center bg-base-200  relative bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Premium Garments for <span className="text-yellow-400">Modern Style</span>
                    </h1>

                    <p className="text-gray-300 mb-8 max-w-lg">
                        Discover high-quality garments crafted for comfort, durability, and modern fashion. Perfect for everyday wear and professional use.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="btn btn-primary"
                    >
                        View Products
                    </button>

                    <button
                        onClick={() => navigate("/products")}
                        className="ml-5 border-2 p-2"
                    >
                        Get Started
                    </button>




                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <img
                        src="https://i.ibb.co/0fGzY5x/garments-banner.jpg"
                        alt="Garments"
                        className="rounded-xl shadow-lg"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroBanner;
