import React, { useState } from 'react';
import { mobileData } from '../data/mobiles'; // Import mobile data
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch, FaEye } from 'react-icons/fa'; // Importing icons

const MobilePage = () => {
    const [selectedProduct, setSelectedProduct] = useState([]);

    const companyHandler = (company) => {
        if (selectedProduct.includes(company)) {
            setSelectedProduct(selectedProduct.filter(item => item !== company));
        } else {
            setSelectedProduct([...selectedProduct, company]);
        }
    };

    const generateRandomPrice = () => {
        // Generate a random price between 10000 and 200000 INR
        return Math.floor(Math.random() * (200000 - 10000 + 1)) + 10000;
    };

    const generateRandomDiscount = () => {
        // Generate a random discount percentage between 20% and 70%
        return Math.floor(Math.random() * 51) + 20;
    };

    const filteredProduct = selectedProduct.length === 0 ?
        mobileData : mobileData.filter((item) => selectedProduct.includes(item.company));

    return (
        <>
            <Navbar />
            <div className="fullpage">
                <div className="pro-selected">
                    {mobileData.map((phone) => (
                        <div className='pro-input' key={phone.company}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedProduct.includes(phone.company)}
                                    onChange={() => companyHandler(phone.company)}
                                />
                                {phone.company}
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
                                <Link to={`/mobiles/${item.id}`}>
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

export default MobilePage;
