import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  return (
    <div>
      <h2>Lista de Productos</h2>
      <div className="d-flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
