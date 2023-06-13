import React from 'react';

const ArticleItem = ( { article, readArticle } ) => {
    return (
        <div className="col s12 m6 l6 xl4 xxl3" key={article.title}>
            <div className="card large">
                <div className="card-image" style={{ backgroundImage: `url(${article.urlToImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                    {/*<LazyLoadImage alt={article.title} src={article.urlToImage} />*/}
                </div>
                <div className="card-content">
                    <span className="card-title">{article.title}</span>
                </div>
                <div className="card-action">
                    <span className="waves-effect waves-light" onClick={() => readArticle(article)}>
                        Read More
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem;
