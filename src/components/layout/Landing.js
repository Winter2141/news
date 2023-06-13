import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {fetchArticle} from "../../actions/articleActions";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import ArticleList from "../article/ArticleList";
import FilterBox from "../article/FilterBox";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../modal/Loading";

const Landing = ({
                     fetchArticle,
                     articles,
                     loading,
                     totalCount,
                    auth
                 }) => {

    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState({
        keyword: null,
        source: null,
        category: null,
        country: null
    })

    useEffect(() => {
        console.log(articles, 'articles')
    }, [articles])


    const fetchMore = () => {
        setPage(page + 1);
    }

    const onChangeFilter = (filterData) => {
        console.log('filterData', filterData);
        setSearchData(filterData)
    }

    useEffect(() => {
        fetchArticle({
            ...searchData, page
        });

    }, [page, searchData])

    return (
        <>
            {
                auth.isAuthenticated ? <FilterBox onChange={onChangeFilter}/> : null
            }
            {
                !loading && articles !== undefined && articles !== null && articles.length > 0 ? (<InfiniteScroll next={fetchMore} hasMore={totalCount !== articles.length} loader={<div> </div>} dataLength={articles.length}>
                    <ArticleList articles={articles} category="Articles" loading={loading}/>
                </InfiniteScroll>) : (<Loading/>)
            }

        </>
    )
}


Landing.propTypes = {
    fetchArticle: PropTypes.func.isRequired,
    articles: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    articles: state.article.articles,
    loading: state.article.loading,
    totalCount: state.article.totalCount,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { fetchArticle }
)(withRouter(Landing));
