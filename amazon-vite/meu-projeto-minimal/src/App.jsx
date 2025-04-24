import { useState } from 'react';
import './App.css';

function App() {
  // State management for the search functionality
  const [keyword, setKeyword] = useState(''); // Stores the current search input value
  const [products, setProducts] = useState([]); // Holds the array of scraped products
  const [loading, setLoading] = useState(false); // Tracks whether data is being fetched
  const [error, setError] = useState(null); // Stores any error messages

  // Main search handler function
  const handleSearch = async () => {
    // Validate input - ensure keyword isn't empty or just whitespace
    if (!keyword.trim()) {
      setError('Por favor, digite uma palavra-chave para buscar');
      return; // Exit early if validation fails
    }

    // Set loading state and clear any previous errors
    setLoading(true);
    setError(null);

    try {
      // Make API request to our scraping endpoint
      const response = await fetch(
        `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
      );
      
      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }

      // Parse JSON response and update products state
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(err.message);
      setProducts([]); // Clear any previous products
    } finally {
      // This runs regardless of success/failure
      setLoading(false); // Turn off loading indicator
    }
  };

  // Component rendering
  return (
    <div className="app">
      {/* Main title */}
      <h1>Amazon Product Scraper</h1>
      
      {/* Search input section */}
      <div className="search-container">
        {/* Controlled input field */}
        <input
          type="text"
          value={keyword} // Bound to keyword state
          onChange={(e) => setKeyword(e.target.value)} // Update state on change
          placeholder="Digite o produto que deseja buscar..."
          // Allow search on Enter key press
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        {/* Search button - disabled during loading */}
        <button 
          onClick={handleSearch} 
          disabled={loading} // Disable during API call
        >
          {/* Conditional button text */}
          {loading ? 'Buscando...' : 'Buscar Produtos'}
        </button>
      </div>

      {/* Error display - only shows when error exists */}
      {error && <div className="error-message">{error}</div>}

      {/* Products grid - maps through products array */}
      <div className="products-grid">
        {products.map((product, index) => (
          // Product card for each item
          <div key={index} className="product-card">
            {/* Product image with error fallback */}
            <img 
              src={product.image} 
              alt={product.title} 
              onError={(e) => {
                // Replace broken images with placeholder
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }} 
            />
            {/* Product title */}
            <h3>{product.title}</h3>
            {/* Product metadata (rating and reviews) */}
            <div className="product-info">
              <span className="rating">{product.rating}</span>
              <span className="reviews">{product.reviews}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state message - shows when no products, not loading, and no errors */}
      {products.length === 0 && !loading && !error && (
        <div className="no-results">
          Nenhum produto encontrado. Tente outra busca.
        </div>
      )}
    </div>
  );
}

export default App;