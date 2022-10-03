import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import { FiPlus } from 'react-icons/fi';
import LocaleContext from '../contexts/LocaleContext';
import contentData from '../utils/content-data';
import PropTypes from 'prop-types';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    const navigate = useNavigate();
    function onNavigate(next) {
        navigate(next);
    }
    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} onNavigate={onNavigate} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            arrNotes: [],
            loading: true,
            keyword: props.defaultKeyword || '',
        }

        this.onNavigate = this.onNavigate.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onNavigate() {
        this.props.onNavigate('/notes/new')
    }

    async onKeywordChangeHandler(keyword) {
        this.props.keywordChange(keyword)
        let notes = this.state.arrNotes;
        if (keyword !== '') {
            notes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));
        }
        this.setState(() => {
            return {
                keyword,
                notes
            }
        })
    }

    async componentDidMount() {
        let { data } = await getActiveNotes();
        const arrNotes = data;
        if (this.state.keyword !== '') {
            data = data.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase()));
        }
        this.setState(() => {
            return {
                notes: data,
                arrNotes,
                loading: false
            }
        })
    }

    render() {
        let { locale } = this.context;
        if (this.state.loading) {
            return (
                <section className='homepage'>
                    <h2>{contentData[locale].homepage_title}</h2>
                    <p className="notes-list__empty">{contentData[locale].homepage_loading}</p>
                </section>

            );
        }
        return (
            <section className='homepage'>
                <h2>{contentData[locale].homepage_title}</h2>
                <SearchBar defaultKeyword={this.state.keyword} onKeywordChange={this.onKeywordChangeHandler} />
                <NoteList notes={this.state.notes}>{contentData[locale].homepage_empty_item}</NoteList>
                <div className='homepage__action'>
                    <button className="action" type="button" title="Tambah" onClick={this.onNavigate}><FiPlus /></button>
                </div>
            </section>
        );
    }
}

HomePage.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    keywordChange: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string,
}

HomePage.contextType = LocaleContext;


export default HomePageWrapper