import React, { useEffect, useState } from 'react';
import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import Products from './components/Products';
import WebglCanvas from './components/WebglCanvas';
import Footer from './components/Footer';
import GsapAnimations from './utils/gsapAnimations'
import ProductDetail from './components/ProductDetail';
import ProductCompactments from './components/ProductCompactments';


function App() {
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);

  useEffect(() => {
    const animation = new GsapAnimations();

    const getIndex = () => {
      const indexDetails = animation.products.getActiveProductIndex();
      if (indexDetails.animateDirection === 'Forward') setActiveProductIndex(indexDetails.index + 1);
      if (indexDetails.animateDirection === 'Backward') setActiveProductIndex(indexDetails.index - 1);
      if (indexDetails.animateDirection === 'None') setActiveProductIndex(indexDetails.index);

    }

    window.addEventListener('click', getIndex);

    return () => {
      window.removeEventListener('click', getIndex);
      animation?.dispose();
    }
  }, [])



  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app_outer">
          <div className="app">
            <HeaderNav />
            <main>
              <Products activeProductIndex={activeProductIndex} />
              <ProductDetail activeProductIndex={activeProductIndex} />
              <ProductCompactments activeProductIndex={activeProductIndex} />
            </main>
            <WebglCanvas />
            <Footer />
          </div>
        </div>
        <div role={'presentation'} className="gradient_background_outer" />
      </div>

    </BrowserRouter>
  );
}

export default App;
