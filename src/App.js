import './App.css';
import { Navbar } from './components/Navbar'
import React from 'react';
import { Sitemap } from './components/Sitemap';
import { StockPriceLineChart } from './components/Charts/StockPriceLineChart';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Sitemap /> */}
      <StockPriceLineChart />
    </div>
  );
}

export default App;
