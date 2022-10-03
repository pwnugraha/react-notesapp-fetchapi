import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import contentData from '../utils/content-data';
import PropTypes from 'prop-types';

function ArchivePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            arrNotes: [],
            loading: true,
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
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
        let { data } = await getArchivedNotes();
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
                <section className='archives-page'>
                    <h2>{contentData[locale].archivepage_title}</h2>
                    <p className="notes-list__empty">{contentData[locale].archivepage_loading}</p>
                </section>

            );
        }

        return (
            <section className='archives-page'>
                <h2>{contentData[locale].archivepage_title}</h2>
                <SearchBar defaultKeyword={this.state.keyword} onKeywordChange={this.onKeywordChangeHandler} />
                <NoteList notes={this.state.notes}>{contentData[locale].archivepage_empty_item}</NoteList>
            </section>
        );
    }
}
ArchivePage.contextType = LocaleContext;

ArchivePage.propTypes = {
    keywordChange: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string,
}

export default ArchivePageWrapper