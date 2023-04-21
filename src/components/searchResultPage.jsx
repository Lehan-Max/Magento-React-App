import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import * as Constants from '../query/constants';
import '../App.css';
import Categories from "./categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";

const SearchResultPage = () => {

    const [searchProducts, setSearchProducts] = useState({searchProducts: {}});

    let { searchterm } = useParams();

    useEffect(() => {
        const fetchSearchResult = async () => {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.PRODUCT_SEARCH_QUERY,
                    variables: { searchTerm : `${searchterm}` }
                }
            )
            const {items} = queryResult.data.data.products;
            setSearchProducts({items})
        }
        fetchSearchResult();
    },[searchterm])

    if (searchProducts === undefined) {
        return;
    }

    if (searchProducts.items?.length === 0 ) return <p>There are no products matching your search term!!</p>

    return (
        <>
            <Categories />
            <h1>Search Results For: {searchterm}</h1>
            <div className="product-list-container">
                {searchProducts.items?.map(product => (
                        <div key={product.sku} className="product">
                            <img className="product-image" src={product.image.url} alt="product_image" />
                            <div className="product-container">
                                <div className="item-details">
                                    <p className="item-description">{product.name}</p>
                                    <p className="item-description">Price: {product.price.regularPrice.amount.currency + ' ' + product.price.regularPrice.amount.value}</p>
                                    <p className="item-description">{product.__typename}</p>
                                </div>
                                <div className="cart-wishlist">
                                    <p className="cart-wishlist-item"><FontAwesomeIcon icon={faBagShopping} /></p>
                                    <p className="cart-wishlist-item"><FontAwesomeIcon icon={faHeart} /></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </>
    );
}

export default SearchResultPage;