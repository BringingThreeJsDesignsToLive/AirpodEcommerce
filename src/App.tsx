import React from 'react';
import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import WebglCanvas from './components/WebglCanvas';
import Products from './components/Products';


function App() {
  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app">
          <HeaderNav />
          <main>
            <Products />
            {/* <ProductDetail /> */}
          </main>
          <WebglCanvas />
          <Footer />
        </div>
        <div role={'presentation'} className="gradient_background_outer" />
      </div>

    </BrowserRouter>
  );
}

export default App;
