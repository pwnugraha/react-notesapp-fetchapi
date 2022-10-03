import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import NoteDetail from "../components/NoteDetail";
import PropTypes from 'prop-types';

function DetailPageWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    function onNavigate(next) {
        navigate(next)
    }
    return <DetailPage id={id} onNavigate={onNavigate} />;
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: null
        };

        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNotehandler = this.onArchiveNotehandler.bind(this);
        this.onUnarchiveNotehandler = this.onUnarchiveNotehandler.bind(this);
    }

    async componentDidMount() {
        const { error, data } = await getNote(this.props.id);
        if (!error) {
            this.setState(() => {
                return {
                    note: data
                }
            })
        }
    }

    async onDeleteNoteHandler(id) {
        await deleteNote(id);
        this.props.onNavigate('/')
    }

    async onArchiveNotehandler(id) {
        await archiveNote(id);
        this.props.onNavigate('/')
    }

    async onUnarchiveNotehandler(id) {
        await unarchiveNote(id);
        this.props.onNavigate('/')
    }

    render() {
        if (this.state.note === null) {
            return <p>Catatan tidak ditemukan!</p>;
        }

        const onArchive = !this.state.note.archived ? this.onArchiveNotehandler : this.onUnarchiveNotehandler;

        return (
            <section className="detail-page">
                <NoteDetail {...this.state.note} onDelete={this.onDeleteNoteHandler} onArchive={onArchive} />
            </section>
        );
    }
}

DetailPage.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default DetailPageWrapper;