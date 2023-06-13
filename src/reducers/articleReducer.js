import {ARTICLE_LOADING, SET_ARTICLE, SET_CATEGORIES, SET_COUNTRIES, SET_SOURCES} from "../actions/types";

const initialState = {
    articles: [],
    totalCount: 0,
    categories: [],
    countries: [],
    sources: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ARTICLE:
            const newArticles = state.articles.length === 0 ? action.payload.articles : (action.payload.totalCount === state.totalCount ? state.articles.concat(action.payload.articles) : action.payload.articles);
            return {
                ...state,
                totalCount: action.payload.totalCount,
                articles: newArticles
            }
        case SET_CATEGORIES:
        case ARTICLE_LOADING:
        case SET_COUNTRIES:
        case SET_SOURCES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
