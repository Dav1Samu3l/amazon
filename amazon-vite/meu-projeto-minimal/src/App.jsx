import { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('Por favor, digite uma palavra-chave para buscar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Amazon Product Scraper</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Digite o produto que deseja buscar..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Produtos'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img 
              src={product.image} 
              alt={product.title} 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }} 
            />
            <h3>{product.title}</h3>
            <div className="product-info">
              <span className="rating">{product.rating}</span>
              <span className="reviews">{product.reviews}</span>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && !error && (
        <div className="no-results">
          Nenhum produto encontrado. Tente outra busca.
        </div>
      )}
    </div>
  );
}

export default App;