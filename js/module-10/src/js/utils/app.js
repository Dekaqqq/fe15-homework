import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from './constants';
import initialNotes from '../../assets/notes.json';
import Notepad from './notepad-model';
import { createListItem, renderNoteList } from './view';

const shortId = require('shortid');
const notepad = new Notepad(initialNotes);
const notes = notepad.notes;

const list = document.querySelector('.note-list');
const noteEditor = document.querySelector('.note-editor');
const searchForm = document.querySelector('.search-form');

renderNoteList(list, notes);

const addListItem = (listRef, note) => {
    listRef.appendChild(note);
};


const handlerNoteEditor = event => {
    event.preventDefault();

    const [title, body] = document.querySelectorAll('.note-editor__input');
    const newNote = {};

    if (!title.value || !body.value) {
        return alert('Необходимо заполнить все поля!');
    }

    newNote.id = shortId.generate();
    newNote.title = title.value;
    newNote.body = body.value;
    newNote.priority = PRIORITY_TYPES.LOW;
    
    notepad.saveNote(newNote);
    addListItem(list, createListItem(newNote));

    event.target.reset();
};

const removeListItem = event => {
    if (event.target.parentNode.dataset.action === 'delete-note') {
        notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);

        event.target.closest('.note-list__item').remove();
    }
};

const handleSearchForm = event => {
    list.innerHTML = '';
    renderNoteList(list, notepad.filterNotesByQuery(event.target.value));
};


noteEditor.addEventListener('submit', handlerNoteEditor);
list.addEventListener('click', removeListItem);
searchForm.addEventListener('input', handleSearchForm);







