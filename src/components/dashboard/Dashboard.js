import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import FilterBox from "../article/FilterBox";
import ArticleList from "../article/ArticleList";
import {
  withRouter
} from "react-router-dom";

class Dashboard extends Component {

  render() {
    const { articles, loading, location } = this.props;
    const searchParams = new URLSearchParams(location.search);
    return (
      <div style={{ height: "75vh" }} className="container align-wrapper">
        <div className="row">
          <div>
            <FilterBox/>
          </div>
          <div className="landing-copy col s12 center-align">
            <ArticleList articles={articles} loading={loading} category={searchParams.get("category")}/>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.article.articles,
  loading: state.article.loading
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Dashboard));
