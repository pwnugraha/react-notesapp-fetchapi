import React from "react";
import PropTypes from 'prop-types';
import { FiCheckCircle } from 'react-icons/fi';
import LocaleContext from '../contexts/LocaleContext';
import contentData from '../utils/content-data';

class NoteInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value
            }
        })
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            }
        });
    }

    onSubmitEventHandler() {
        this.props.onAddNote({ title: this.state.title, body: this.state.body });
        this.setState(() => {
            return {
                title: '',
                body: '',
            }
        });
    }

    render() {
        let { locale } = this.context;
        return (
            <div className="add-new-page__input">
                <input className="add-new-page__input__title" type="text" required placeholder={contentData[locale].noteinput_title} value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                <div
                    className="add-new-page__input__body"
                    data-placeholder={contentData[locale].noteinput_body}
                    contentEditable
                    onInput={this.onBodyChangeEventHandler}
                />
                <div className="add-new-page__action"><button className="action" type="button" title="Simpan" onClick={this.onSubmitEventHandler}><FiCheckCircle /></button></div>
            </div>
        );
    }
}

NoteInput.propTypes = {
    onAddNote: PropTypes.func.isRequired,
}

NoteInput.contextType = LocaleContext;

export default NoteInput;