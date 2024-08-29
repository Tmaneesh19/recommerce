import React from 'react';
import { furnitureData } from '../data/furniture';
import { Link } from 'react-router-dom';

const Furniture = () => {
  const firstFiveImages = furnitureData.slice(0, 5);

  return (
    <>
      <div className="propage">
        <div className="proTitle">
          <h2>Furniture</h2>
        </div>
        <div className="proSection">
          {firstFiveImages.map((item, index) => {
            const imageUrl = process.env.PUBLIC_URL + item.image;

            return (
              <div className="imgBox" key={index}>
                <Link to={`/furniture/${item.id}`} className="noDecoration">
                  <img
                    className="proImage"
                    src={imageUrl}
                    alt={`${item.brand} ${item.model}`}
                  />
                  <h2 className="company model">{item.brand} {item.model}</h2>
                  <h2 className="price">₹{item.price}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Furniture;
