import React from 'react';
import PropTypes from 'prop-types';
import { FiDownload, FiUpload } from 'react-icons/fi';
 
function ArchiveButton({ id, onArchive, archived }) {
  return <button className='action' onClick={() => onArchive(id)}>{!archived ? <FiDownload /> : <FiUpload />}</button>
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
}
 
export default ArchiveButton;