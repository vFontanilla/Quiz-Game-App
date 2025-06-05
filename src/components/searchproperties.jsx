import { useEffect, useState } from 'react';

const PropertySearch = () => {
  const minPrice = 500000;
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const allProperties = [
      { id: 1, location: 'New York', price: 300000, size: '450sqft' },
      { id: 2, location: 'San Francisco', price: 850000, size: '300sqft' },
      { id: 3, location: 'Los Angeles', price: 600000, size: '500sqft' }
    ];

    const filtered = allProperties.filter(p => p.price > minPrice);
    setProperties(filtered);
  }, []);

  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>
          <h3>{property.location}</h3>
          <p>Price: ${property.price}</p>
          <p>Size: {property.size}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertySearch;
