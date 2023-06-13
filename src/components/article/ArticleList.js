/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleDetailModal from "../modal/ArticleDetailModal";
import ArticleItem from "./ArticleItem";
import "./Style.css"

const ArticleList = ({ articles, category }) => {
    const [modal, setModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState({});

    const readArticle = article => {
        setCurrentArticle(article);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const renderArticles = () => {
        return articles.map((article, index) => (
            <ArticleItem key={index} article={article} readArticle={readArticle}/>
        ));
    };

    return (
        <div className="container">
            <>
                {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
                <div className="row">
                    <div className="section">
                        <h3>{category}</h3>
                    </div>
                    <div className="divider" />
                    <div className="section">
                        <div className="row">{renderArticles()}</div>
                    </div>
                </div>
            </>
        </div>
    );
};

ArticleList.defaultProps = {
    articles: [],
    category: "",
};

ArticleList.propTypes = {
    articles: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
};

export default ArticleList
