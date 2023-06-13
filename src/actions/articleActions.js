import axios from "axios";

import {ARTICLE_LOADING, baseURL, GET_ERRORS, SET_ARTICLE, SET_CATEGORIES} from "./types";

export const fetchArticle = searchData => dispatch => {
    dispatch(setArticleLoading(true));
    axios
        .post(`${baseURL}/article/search`, searchData)
        .then(res => {
            // Set Articles
            dispatch(setArticles(res.data));
            dispatch(setArticleLoading(false));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                dispatch(setArticleLoading(false));
            }
        );
};

export const fetchCategories = (isOwn = 0) => dispatch => {
    axios
        .get(`${baseURL}/article/categories?is_own=${isOwn}`)
        .then(res => {
            dispatch(setCategories(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const fetchCountries = () => dispatch => {
    axios
        .get(`${baseURL}/article/countries`)
        .then(res => {
            dispatch(setCountries(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const fetchSources = (isOwn = 0, country = null) => dispatch => {
    axios
        .get(`${baseURL}/article/sources?country=${country}&is_own=${isOwn}`)
        .then(res => {
            dispatch(setSources(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const setArticles = articles => {
    return {
        type: SET_ARTICLE,
        payload: {
            articles: articles.articles,
            totalCount: articles.totalResults
        }
    };
};

export const setArticleLoading = (loading) => {
    return {
        type: ARTICLE_LOADING,
        payload: {
            loading
        }
    };
};

export const setCategories = categories => {
    return {
        type: SET_CATEGORIES,
        payload: {
            categories
        }
    };
};

export const setSources = sources => {
    return {
        type: SET_CATEGORIES,
        payload: {
            sources
        }
    };
};

export const setCountries = countries => {
    return {
        type: SET_CATEGORIES,
        payload: {
            countries
        }
    };
};
