import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://cars-pagination.onrender.com/products/category?category=средний');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://cars-pagination.onrender.com/products/category?category=all');
      const data = await response.json();
      setCategories(['all', ...new Set(data.map(product => product.category))]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductClick = (id) => {
    navigate(`/details/${id}`);
  };

  const filterProductsByRating = () => {
    if (selectedCategory === 'all') {
      return products;
    } else {
      return products.filter(product => {
        if (selectedCategory === '5-4 stars') {
          return product.star >= 4 && product.star <= 5;
        } else if (selectedCategory === '3-2 stars') {
          return product.star >= 2 && product.star < 4;
        } else {
          return product.star === 1;
        }
      });
    }
  };

  return (
    <div className='wrap'>
      <h1>Home Page</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="5-4 stars">5-4 stars</option>
        <option value="3-2 stars">3-2 stars</option>
        <option value="1 star">1 star</option>
      </select>
      <div class="product-grid">
        {filterProductsByRating().map(product => (
          <div className="product-card" key={product.id} onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <div className="product-card-content">
              <h3>{product.name}</h3>
              <p>New Price: {product.newPrice}</p>
              <p>Old Price: {product.oldPrice}</p>
              <p>Rating: {product.star}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;