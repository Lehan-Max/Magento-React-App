import './App.css';
import { Routes, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Home from './components/home';
import Register from './components/register';
import Cart from './components/cart';
import AccountPage from './components/accountpage';
import ProductListPage from './components/productListPage';
import SearchResultPage from './components/searchResultPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/category/:id" element={<ProductListPage/>} />
        <Route path="/search/search-result-for/:searchterm" element={<SearchResultPage/>} />
      </Routes>
    </div>
  );
}

export default App;
