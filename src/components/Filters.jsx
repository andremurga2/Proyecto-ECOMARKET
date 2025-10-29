import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function Filters({ selectedCategory, setSelectedCategory }) {
  const categories = ['Todos', 'Alimentos', 'Cuidado Personal', 'Hogar'];

  return (
    <ButtonGroup className="mb-3">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={cat === selectedCategory ? 'success' : 'outline-success'}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default Filters;
