import React, { useEffect, useState } from "react";
import data from '../data/categories.json';
import 'flowbite/dist/flowbite.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { CategoryActionTypes } from "../types/category";
import { VisibleModalActionTypes } from "../types/visibleModal";

const Categories = () => {
    const selectedCategory = useTypedSelector(state => state.category.category);
    const categories: string[] = ["amenity", "building", "historic", "leisure", "natural", "office", "shop", "tourism"];
    const [subcategories, setSubcategories]: any[] = useState([]);

    const [categoriesData, setCategoriesData]: any[] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        function loadData() {
            return data;
        }

        setCategoriesData(loadData());
        setSubcategories(categoriesData["amenity"]);
    }, []);

    useEffect(() => {
        setSubcategories([]);
        setSubcategories(categoriesData[selectedCategory]);
    }, [selectedCategory]);

    const changeCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        dispatch({ type: CategoryActionTypes.CATEGORY_CHANGE, payload: e.currentTarget.innerHTML });
    }

    const changeSubcategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        dispatch({ type: CategoryActionTypes.SUBCATEGORY_CHANGE, payload: e.currentTarget.innerHTML.replace(" ", "_") });
        dispatch({ type: VisibleModalActionTypes.SET_VISIBLE_CATEGORIES, payload: false })
    }

    const dropdownClick = (e: any) => {
        dispatch({ type: CategoryActionTypes.CATEGORY_CHANGE, payload: e.currentTarget.getAttribute('data-dropdown-toggle') });
        document.getElementById(e.currentTarget.getAttribute('data-dropdown-toggle'))?.classList.toggle('hidden');
    }

    return (
        <div>
            <div className="categories">
                <div className="categories_names">
                    <ul>
                        {categories?.map((category, index) => <li key={index} className={((category) === selectedCategory ? "active " : "") + "w-full px-4 py-2 border border-gray-200 dark:border-gray-600"} onClick={(e) => changeCategory(e)}>{category}</li>)}
                    </ul>
                </div>
                <div className="categories_subcategories">
                    <ul>
                        <TransitionGroup name="list">
                            {subcategories?.map((subcategory: string) => (<CSSTransition
                                key={subcategory}
                                timeout={500}
                                classNames="item">
                                <li className="w-full px-4 py-2 borber-b border border-gray-200 dark:border-gray-600" onClick={(e: any) => changeSubcategory(e)} >{subcategory.replace("_", " ")}</li>
                            </CSSTransition>))}
                        </TransitionGroup>
                    </ul>
                </div>
            </div >
            <div className="dropdown_categories">
                <ul>
                    {categories?.map((category, index) => <div className="dropdown_category_container"><button id="dropdownDefaultButton" data-dropdown-toggle={category} className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button" onClick={dropdownClick} key={index}>{category}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" data-dropdown-toggle={category}>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button><div id={category} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="dropdown_categories_subcategories" aria-labelledby="dropdownDefaultButton">
                                {subcategories?.map((subcategory: any) => (<CSSTransition
                                    key={subcategory}
                                    timeout={500}
                                    classNames="item">
                                    <li className="w-full px-4 py-2 borber-b border border-gray-200 dark:border-gray-600" onClick={e => changeSubcategory(e)} >{subcategory.replace("_", " ")}</li>
                                </CSSTransition>))}
                            </ul>
                        </div></div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Categories;