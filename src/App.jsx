import React, { useState, useEffect } from 'react';
import { getHotels } from './api/api.js';
import './styles/App.css';

function HotelCard({ item }) {
  return (
    <div className="hotel-card">
      <img src={item?.thumbnail} alt={item?.name} />
      <div className="info">
        <h3>{item?.name}</h3>
        <p className="location">📍 {item?.location}</p>
        <p className="desc">{item?.description}</p>
        <div className="bottom">
          <span className="price">₹{item?.price} <small>/ night</small></span>
          <span className="rating">⭐ {item?.rating}</span>
        </div>
        <button onClick={() => alert(`Booked ${item?.name}!`)}>Book Now</button>
      </div>
    </div>
  );
}

export default function App() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHotels();
        if (data) setList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const results = list.filter((item) =>
    (item?.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (item?.location || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <header className="main-header">
        <h1>Trivaldo Hotels</h1>
        <p>Find your perfect stay across India</p>
      </header>

      <div className="list-page">
        <div className="search">
          <input 
            type="text" 
            placeholder="Search by hotel name or city (e.g., Mumbai, Goa)..." 
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <h2 className="loading-text">Loading Hotels...</h2>
        ) : (
          <div className="grid">
            {results && results.length > 0 ? (
              results.map((item) => (
                <HotelCard key={item.id} item={item} />
              ))
            ) : (
              <p className="no-results">No hotels found. Try a different city!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}