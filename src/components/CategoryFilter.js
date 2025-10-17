import React from 'react';

const CategoryFilter = ({ categories = [], onSelect }) => {
  return (
    <div>
      <h4>Categorías</h4>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button onClick={() => onSelect(cat.id)}>{cat.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
