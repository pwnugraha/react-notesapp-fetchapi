import React from "react";
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index'
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import parser from 'html-react-parser';

function NoteDetail({ id, title, body, archived, createdAt, onDelete, onArchive }) {
    return (
        <>
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="detail-page__body">
                {parser(body)}
            </div>
            <div className="detail-page__action">
                <ArchiveButton id={id} onArchive={onArchive} archived={archived} />
                <DeleteButton id={id} onDelete={onDelete} />
            </div>
        </>
    );
}

NoteDetail.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
