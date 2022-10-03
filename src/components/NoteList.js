import React from "react";
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ children, notes }) {
    return (
        <>
            {
                !notes.length
                    ? <section className='notes-list-empty'><p className="notes-list__empty">{children}</p></section>
                    : <section className='notes-list'>
                        {
                            notes.map((note) => (
                                <NoteItem
                                    key={note.id}
                                    {...note}
                                />
                            ))
                        }
                    </section>
            }

        </>
    );
}

NoteList.propTypes = {
    children: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

export default NoteList