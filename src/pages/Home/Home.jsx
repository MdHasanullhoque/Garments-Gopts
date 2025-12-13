// import React from 'react';
// import HeroBanner from './HeroBanner';
// import HomeProducts from './HomeProducts';

// const Home = () => {
//     return (
//         <div>
//             <h2>This is Home</h2>
//             <HeroBanner />
//             <HomeProducts />
//         </div>
//     );
// };

// export default Home;

import React from 'react';
import HeroBanner from './HeroBanner';
import HomeProducts from './HomeProducts';

const Home = () => {
    return (
        <div className="w-full">
            {/* Optional: Page Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-6">
                Welcome to Our Store
            </h2>

            {/* Hero Banner */}
            <div className="w-full">
                <HeroBanner />
            </div>

            {/* Products Section */}
            <section className="max-w-[1200px] mx-auto px-4 py-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
                    Our Products
                </h3>
                <HomeProducts />
            </section>
        </div>
    );
};

export default Home;
