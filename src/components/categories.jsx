import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as Constants from '../query/constants';
import { NavLink, Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const queryResult = await axios.post(
                Constants.API_URL, {
                    query: Constants.CATEGORIES_QUERY
                }
            )
            const { items } = queryResult.data.data.categories;
            setCategories({items});
        }
        fetchCategories().catch(err => {console.log(err)}).finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div>Loading Categories</div>

    if (categories.items == null) {
        return;
    }

    const handleClick = category => {
        console.log(category)
    }

    const listItems = categories.items.map(category => (
        <NavLink 
            className="category-links" 
            to={`/category/${ category.id }`} 
            key={ category.id } 
            onClick={() =>  handleClick(category) }>
                { category.name }
        </NavLink>
    ));

    return <>
        <ul className="categories-list">
            {listItems}
            { console.log(categories.categories)}
        </ul>
    </>
}

export default Categories;