import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './redux/CartSlice';
import CartItem from './CartItem';
import plantsArray from './plantsData';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => dispatch(addItem(plant));

  const handleHomeClick = (e) => { e.preventDefault(); onHomeClick(); };
  const handlePlantsClick = (e) => { e.preventDefault(); setShowCart(false); };
  const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); };

  return (
    <div>
      <div className="navbar">
        <div className="brand">Paradise Nursery</div>
        <div className="nav-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" onClick={handleCartClick} aria-label="Cart">
            <span className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="34" height="34">
                <rect width="256" height="256" fill="none"></rect>
                <circle cx="80" cy="216" r="12" fill="#fff"></circle>
                <circle cx="184" cy="216" r="12" fill="#fff"></circle>
                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
              </svg>
              <span className="cart-count">{totalQuantity}</span>
            </span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h1 className="category-title">{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added' : ''}`}
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
