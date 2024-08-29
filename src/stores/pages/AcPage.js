import React, { useState } from 'react';
import { acData } from '../data/ac'; // Import AC data
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch, FaEye } from 'react-icons/fa'; // Importing icons

const AcPage = () => {
    const [selectedProduct, setSelectedProduct] = useState([]);

    const companyHandler = (company) => {
        if (selectedProduct.includes(company)) {
            setSelectedProduct(selectedProduct.filter(item => item !== company));
        } else {
            setSelectedProduct([...selectedProduct, company]);
        }
    };

    const generateRandomPrice = () => {
        // Generate a random price between 1000 and 20000 INR
        return Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000;
    };

    const generateRandomDiscount = () => {
        // Generate a random discount percentage between 20% and 70%
        return Math.floor(Math.random() * 51) + 20;
    };

    const filteredProduct = selectedProduct.length === 0 ?
        acData : acData.filter((item) => selectedProduct.includes(item.company));

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {acData.map((item) => (
                        <div className='pro-input' key={item.company}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedProduct.includes(item.company)}
                                    onChange={() => companyHandler(item.company)}
                                />
                                {item.company}
                            </label>
                        </div>
                    ))}
                </div>

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        const price = generateRandomPrice();
                        const discount = generateRandomDiscount();
                        const imageUrl = process.env.PUBLIC_URL + item.image; // Handle image path

                        return (
                            <div className="itemBox" key={item.id}>
                                <Link to={`/ac/${item.id}`}>
                                    <div className="pageImg">
                                        <img src={imageUrl} alt={item.model} />
                                        <div className="iconsOverlay">
                                            <FaHeart className="icon" title="Add to Favorites" />
                                            <FaSearch className="icon" title="View Details" />
                                            <FaEye className="icon" title="Quick View" />
                                        </div>
                                    </div>
                                </Link>
                                <div className="proModel">
                                    {item.company}, {item.model}
                                </div>
                                <div className="priceAndDiscount">
                                    <span className="price">₹{price}</span>
                                    <span className="discount">{discount}% OFF</span>
                                </div>
                                <div className="rating">
                                    {'⭐'.repeat(Math.floor(Math.random() * 5) + 1)} {/* Random star rating */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AcPage;
