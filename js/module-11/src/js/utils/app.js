import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import shortId from 'shortid';

import notesTemplate from '../../templates/notesList.hbs';
import {refs, renderNoteList} from './view';
import initialNotes from '../../assets/notes.json';
import { PRIORITY_TYPES} from './constants';
import Notepad from './notepad-model';


const notyf = new Notyf();
const notepad = new Notepad(initialNotes);

renderNoteList(refs.notesList, initialNotes);

const addListItem = (listRef, note) => {
    listRef.insertAdjacentHTML('beforeend', notesTemplate(note));
};


const handlerNoteEditor = event => {
    event.preventDefault();

    const [title, body] = document.querySelectorAll('.note-editor__input');
    const newNote = {};
    
    if (!title.value || !body.value) {
        return notyf.error('Необходимо заполнить все поля!');
    } else { 
        newNote.id = shortId.generate();
        newNote.title = title.value;
        newNote.body = body.value;
        newNote.priority = PRIORITY_TYPES.LOW;
        
        notepad.saveNote(newNote);
        addListItem(refs.notesList, newNote);
        MicroModal.close('note-editor-modal');
        setTimeout(function () {notyf.success('Заметка добалена!')}, 100);
        event.target.reset();
    }

};

const removeListItem = event => {
    if (event.target.parentNode.dataset.action === 'delete-note') {
        notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);

        event.target.closest('.note-list__item').remove();
        setTimeout(function () {notyf.success('Заметка удалена!')}, 100);
    }
};

const handleSearchForm = event => {
    refs.notesList.innerHTML = '';
    renderNoteList(refs.notesList, notepad.filterNotesByQuery(event.target.value));
};

const openMicroModal = () => {
    MicroModal.show('note-editor-modal');
};

refs.button.addEventListener('click', openMicroModal);
refs.noteEditor.addEventListener('submit', handlerNoteEditor);
refs.notesList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('input', handleSearchForm);