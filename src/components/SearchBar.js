import React from "react";
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import contentData from '../utils/content-data';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this)
    }

    onKeywordChangeEventHandler(event) {
        const keyword = event.target.value
        this.setState(() => {
            return {
                keyword,
            }
        })

        this.props.onKeywordChange(keyword);
    }

    render() {
        let { locale } = this.context;
        return (
            <section className="search-bar">
                <input type="text" placeholder={contentData[locale].homepage_searchpl} value={this.state.keyword} onChange={this.onKeywordChangeEventHandler} />
            </section>
        );
    }
}

SearchBar.propType = {
    defaultKeyword: PropTypes.string.isRequired,
    onKeywordChange: PropTypes.func.isRequired
}

SearchBar.contextType = LocaleContext;

export default SearchBar