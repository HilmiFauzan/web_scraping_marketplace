// import './App.css';
// import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from './sections';
// import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, SuperQuality } from './sections';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import ListProduct from './page/ListProduct';
import ProductDetail from './page/ProductDetail';
import { Footer } from './sections';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route index path='/' element={<Home />} />
        <Route path='/produk' element={<ListProduct />} />
        <Route path='/produk-detail/:productParams' element={<ProductDetail />} />
        
        <Route path="*" element={<p>Path not resolved</p>} />
        <Route path="/produk-detail/*" element={<p>Path not resolved</p>} />
      </Routes>
        <section className='bg-black padding-x padding-t pb-8'>
          <Footer />
        </section>
    </>
  );
}

export default App;
