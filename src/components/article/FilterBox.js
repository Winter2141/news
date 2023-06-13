import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {fetchCategories, fetchCountries, fetchSources, fetchArticle} from "../../actions/articleActions";
import PropTypes from "prop-types";
import "./Style.css"

const FilterBox = ({
                       fetchSources,
                       fetchCountries,
                       fetchCategories,
                       fetchArticle,
                       categories,
                       countries,
                       sources,
                       onChange
                   }) => {
    useEffect(() => {
        fetchSources();
        fetchCountries();
        fetchCategories(true);
    }, []);

    const [keyword, setKeyword] = useState(null);
    const [source, setSource] = useState(null);
    // const [country, setCountry] = useState(null);
    const [category, setCategory] = useState(null)

    const submitSearch = () => {
        onChange({
            keyword,
            source,
            category,
            //country
        })
    }
    useEffect(() => {
        submitSearch();
    }, [keyword, source, category])
    return (
        <div className="row filter-box">
            <div className="filter-item input-field">
                <select id="categorySelect" className="browser-default" onChange={(event) => {
                    setCategory(event.target.value);
                    setSource(null)
                }}>
                    <option value="" selected>Choose your Category</option>
                    {
                        categories !== null && categories !== undefined && categories.length && categories.map((item, index) =>
                            <option value={item}>{ item.toUpperCase() }</option>
                        )
                    }
                </select>
            </div>
            <div className="filter-item input-field">
                <select id="sourceSelect" className="browser-default" onChange={(event) => { setSource(event.target.value); setCategory(null) }}>
                    <option value="" selected>Choose your Source</option>
                    {
                        sources !== null && sources !== undefined && sources.length && sources.map((item, index) =>
                            <option value={item.id}>{ item.name.toUpperCase() }</option>
                        )
                    }
                </select>
            </div>
            {/*<div className="filter-item input-field">*/}
            {/*    <select id="countrySelect" className="browser-default" onChange={(event) => setCountry(event.target.value)}>*/}
            {/*        <option value="" selected>Choose your Country</option>*/}
            {/*        {*/}
            {/*            countries !== null && countries !== undefined && countries.length && countries.map((item, index) =>*/}
            {/*                <option value={item}>{ regionNamesInEnglish.of(item.toUpperCase()) }</option>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </select>*/}
            {/*</div>*/}

            <div className="filter-item input-field">
                <input onChange={event => setKeyword(event.target.value)} placeholder="Keyword" id="Keyword" type="text" className="validate"/>
            </div>
        </div>
    )
}


FilterBox.propTypes = {
    fetchSources: PropTypes.func.isRequired,
    fetchCountries: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchArticle: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    countries: PropTypes.object.isRequired,
    sources: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    categories: state.article.categories,
    countries: state.article.countries,
    sources: state.article.sources,
});

const mapDispatchToProps =  {
    fetchSources,
    fetchCountries,
    fetchCategories,
    fetchArticle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBox);
