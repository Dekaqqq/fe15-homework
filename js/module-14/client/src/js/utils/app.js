import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import shortId from 'shortid';

import notesTemplate from '../../templates/notesList.hbs';
import {refs, renderNoteList} from './view';
import {PRIORITY_TYPES} from './constants';
import Notepad from './notepad-model';


const notyf = new Notyf();
const notepad = new Notepad();

notepad.notes().then(notes => {
    renderNoteList(refs.notesList, notes)
});

const addListItem = (listRef, note) => {
    listRef.insertAdjacentHTML('beforeend', notesTemplate(note));
};

// notepad.updateNoteContent("XWaQXcbk0", {title: 'tes1'});
// notepad.updateNotePriority("XWaQXcbk0", {priority: 1});

const handlerNoteEditor = async event => {
    event.preventDefault();
    
    const [title, body] = document.querySelectorAll('.note-editor__input');

    if (!title.value || !body.value) {
        return notyf.error('Необходимо заполнить все поля!');
    }

    const newNote = {};
    newNote.title = title.value;
    newNote.body = body.value;
    newNote.priority = PRIORITY_TYPES.LOW;

    try {
        const savedNote = await notepad.saveNote(newNote);
        if (savedNote) {
            addListItem(refs.notesList, savedNote);
            MicroModal.close('note-editor-modal');
            notyf.success('Заметка добалена!');
        }

    } catch (error) {
        return notyf.error(error.message);
    }

    event.target.reset();
};

const removeListItem = async event => {
    if (event.target.parentNode.dataset.action === 'delete-note') {
        try {
            const deletedNote = await notepad.deleteNote(event.target.closest('.note-list__item').dataset.id);
            event.target.closest('.note-list__item').remove();
            notyf.success('Заметка удалена!');
        } catch (error) {
            return notyf.error(error.message);
        }
    }
};

const handleSearchForm = async event => {
    refs.notesList.innerHTML = '';
    try {
        const result = await notepad.filterNotesByQuery(event.target.value);
        renderNoteList(refs.notesList, result)
    } catch (error) {
        return notyf.error(error.message);
    }
};

const openMicroModal = () => {
    MicroModal.show('note-editor-modal');
};

refs.button.addEventListener('click', openMicroModal);
refs.noteEditor.addEventListener('submit', handlerNoteEditor);
refs.notesList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('input', handleSearchForm);