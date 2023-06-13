import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchCategories, fetchCountries, fetchSources} from "../../actions/articleActions";
import { fetchSettings, updateSettings } from "../../actions/authActions";
import {
    withRouter
} from "react-router-dom";

import "./Style.css"

const Settings = ({
                      auth,
                      loading,
                      article,
                      fetchSources,
                      fetchCountries,
                      fetchCategories,
                      fetchSettings,
                      updateSettings
                  }) => {

    const convertData = (data) => {
        if(data === undefined || data === null) {
            return [];
        }
        return data.split(",");
    }
    const { user, settings } = auth;
    const { countries, sources, categories } = article;
    const [country, setCountry] = useState(settings.country);
    const [source, setSource] = useState(convertData(settings.sources));
    const [category, setCategory] = useState(convertData(settings.categories));

    useEffect(() => {
        fetchSources(country);
    }, [country]);

    useEffect(() => {
        if(countries === undefined || countries === null || countries.length === 0) {
            fetchCountries();
        }
        fetchCategories();
        fetchSettings();
    }, [])

    const checkCategory = (e) => {
        const newVal = e.target.value;
        if(category === undefined || category === null) {
            setCategory([newVal]);
        } else {
            const tempArray = [].concat(category);
            const newIndex = tempArray.indexOf(newVal);
            console.log(newIndex, newVal, tempArray)
            if(newIndex !== -1) {
                tempArray.splice(newIndex, 1);
            } else {
                tempArray.push(newVal);
            }
            setCategory(tempArray);
        }
    }

    useEffect(() => {
        console.log(category, 'category2', (category !== undefined && category.indexOf('general') !== -1))
    }, [category])

    const checkSource = (e) => {
        const newVal = e.target.value;
        if(source === undefined || source === null) {
            setSource([newVal]);
        } else {
            const tempArray = [].concat(source);
            const newIndex = tempArray.indexOf(newVal);
            if(newIndex !== -1) {
                tempArray.splice(newIndex, 1);
            } else {
                tempArray.push(newVal);
            }
            setSource(tempArray);
        }
    }

    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    const renderCheckBoxes = (items, selectedItems, key, value, onChange, isCountry = false) => {
        return items.map((item, index) =>
            <div key={index} className="check-item">
                <input type="checkbox" id={`checkItem_${key !== null ? item[key] : item}`} value={key !== null ? item[key] : item} onChange={(e) => onChange(e)} checked={ selectedItems !== undefined && selectedItems.indexOf(key !== null ? item[key] : item) !== -1}/>
                <label htmlFor={`checkItem_${key !== null ? item[key] : item}`}>{value !== null ? item[value] : (isCountry ? regionNamesInEnglish.of(item.toUpperCase()) : item.toUpperCase())}</label>
            </div>
        )
    }

    const submitSettings = (e) => {
        e.preventDefault();
        updateSettings({
            ...settings,
            country,
            categories: category.join(","),
            sources: source.join(",")
        })
    }

    return (
        <div className="container">
            <div className="section">
                <h3>Settings - { user.name }</h3>
            </div>
            {/*<div className="row section">*/}
            {/*    <div className="section">*/}
            {/*        <h4>Personal Information</h4>*/}
            {/*    </div>*/}
            {/*    <form>*/}
            {/*        <div className="input-field col s6">*/}
            {/*            <input placeholder="Placeholder" id="username" type="text" className="validate"/>*/}
            {/*            <label htmlFor="username">User Name</label>*/}
            {/*        </div>*/}
            {/*        <div className="input-field col s6">*/}
            {/*            <input placeholder="Placeholder" id="useremail" type="text" className="validate"/>*/}
            {/*            <label htmlFor="useremail">User Email</label>*/}
            {/*        </div>*/}

            {/*        <div className="section">*/}
            {/*            <button className="btn waves-effect waves-light" type="submit" name="action">*/}
            {/*                Update<i className="material-icons right">send</i>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}
            <div className="row section">
                <div className="section">
                    <h4>Article Settings</h4>
                </div>
                <form onSubmit={submitSettings}>
                    <div className="section">
                        <h5>Country</h5>
                        <div className="input-field col flex">
                            <select id="countrySelect" className="browser-default" onChange={(event) => setCountry(event.target.value)}>
                                <option value="" selected>Choose your Country</option>
                                {
                                    countries !== null && countries !== undefined && countries.length && countries.map((item, index) =>
                                        <option key={index} value={item} selected={country === item}>{ regionNamesInEnglish.of(item.toUpperCase()) }</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="section">
                        <h5>Categories</h5>
                        <div className="input-field col flex">
                            {/*{ renderCheckBoxes(categories, category, null, null, checkCategory) }                            */}
                            {
                                categories.map((item, index) =>
                                    <div key={index} className="check-item">
                                        <input name="check-country" type="checkbox" id={`checkItem_${item}`} value={item} onChange={(e) => checkCategory(e)} checked={ category !== undefined && category.indexOf(item) !== -1 }/>
                                        <label htmlFor={`checkItem_${item}`}>{item.toUpperCase()}</label>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="section">
                        <h5>Sources</h5>
                        <div className="input-field col flex">
                            { renderCheckBoxes(sources, source, 'id', 'name', checkSource) }
                        </div>
                    </div>

                    <div className="section">
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Update<i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    article: PropTypes.object.isRequired,
    fetchSources: PropTypes.func.isRequired,
    fetchCountries: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    article: state.article,
    loading: state.auth.loading
});

const mapDispatchToProps =  {
    fetchSources,
    fetchCountries,
    fetchCategories,
    fetchSettings,
    updateSettings
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Settings));
