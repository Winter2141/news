import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import {fetchCategories, fetchSources} from "../../actions/articleActions";
import PropTypes from "prop-types";
import "./Style.css"

const FilterBox = ({
                       fetchSources,
                       fetchCategories,
                       categories,
                       sources,
                       onChange
                   }) => {
    useEffect(() => {
        fetchSources(1);
        fetchCategories(1);
    }, []);

    const [keyword, setKeyword] = useState(null);
    const [source, setSource] = useState(null);
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
                            <option value={item}>{ item.toUpperCase().replace(/-/g, " ") }</option>
                        )
                    }
                </select>
            </div>

            <div className="filter-item input-field">
                <input onChange={event => setKeyword(event.target.value)} placeholder="Keyword" id="Keyword" type="text" className="validate"/>
            </div>
        </div>
    )
}


FilterBox.propTypes = {
    fetchSources: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    sources: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    categories: state.article.categories,
    sources: state.article.sources,
});

const mapDispatchToProps =  {
    fetchSources,
    fetchCategories,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBox);
