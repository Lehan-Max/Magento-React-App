import React, {useEffect, useState} from "react";
import * as Constants from "../query/constants";
import Categories from "./categories";
import axios from "axios";
import '../App.css';
import {useParams} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductListPage = () => {

    const [products, setProducts] = useState( { products: [] } );
    const [category, setCategory] = useState( { category: [] } );

    let { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.PRODUCT_LIST_QUERY,
                    variables: { id : `${id}` }
                }
            )
            const {items} = queryResult.data.data.products;
            setProducts({items})
        }
        fetchProducts();
    }, [id]);

    useEffect(() => {
        const fetchCategory = async () => {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.CATEGORY_QUERY,
                    variables: {id: `${id}`}
                }
            )
            const {name} = queryResult.data.data.categoryList[0];
            setCategory({name})
        }
        fetchCategory();
    }, [id]);

    const handleCartButtonClick = async (product) => {
        console.log(localStorage.getItem('guest-cart-id'))
        if (localStorage.getItem('guest-cart-id') === null) {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.GUEST_CREATE_CART_MUTATION
                }
            )
            const { createEmptyCart } = queryResult.data.data;
            localStorage.setItem('guest-cart-id', createEmptyCart);
        }
            
        if (localStorage.getItem('customer-token') != null) {

        } else {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.ADD_TO_CART_QUERY,
                    variables: {cartId: `${localStorage.getItem('guest-cart-id')}`, quantity: `${1}`}
                }
            )
            console.log(queryResult)
        }
    }

    if (products.items == null) {
        return;
    }
    return (
        <>
            <Categories />
            <h1 className="category-name">{category.name}</h1>
            <div className="product-list-container">
                {products.items.map(product => (
                    <>
                    {
                        product["__typename"] === 'SimpleProduct' &&
                        <div key={product.sku} className="product">
                            <img className="product-image" src={product.image.url} alt="product_image" />
                            <div className="product-container">
                                <div className="item-details">
                                    <p className="item-description">{product.name}</p>
                                    <p className="item-description">Price: {product.price.regularPrice.amount.currency + ' ' + product.price.regularPrice.amount.value}</p>
                                    <p className="item-description">{product.__typename}</p>
                                </div>
                                <div className="cart-wishlist">
                                    <p className="cart-wishlist-item" 
                                        onClick={() => handleCartButtonClick(product)}
                                    >
                                        <FontAwesomeIcon icon={faBagShopping} />
                                    </p>
                                    <p className="cart-wishlist-item">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    </>
                    
                    ))
                }
            </div>
            <Footer />
        </>
    )
}
export default ProductListPage;