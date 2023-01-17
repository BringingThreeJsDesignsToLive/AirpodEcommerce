import React from 'react';
import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import { Link } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderNav />
        <main>
          <ProductDetail />
          <div role={'presentation'}>
            <div className='gradient-background' />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
