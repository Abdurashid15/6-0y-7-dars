import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css'

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://cars-pagination.onrender.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='details'>
      <h1>Details Page</h1>
      <div className="product-details">
        <img className='details-img' src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>New Price: {product.newPrice}</p>
        <p>Old Price: {product.oldPrice}</p>
        <p>Rating: {product.star}</p>
        <p>Is Exist: {product.isExist ? 'Yes' : 'No'}</p>
        <p>Comments: {product.comments}</p>
        <p>Category: {product.category}</p>
        <button className='back' onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default Details;