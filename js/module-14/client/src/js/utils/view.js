import notesTemplate from '../../templates/notesList.hbs';


const refs = {
    notesList: document.querySelector('.note-list'),
    noteEditor: document.querySelector('.note-editor'),
    searchForm: document.querySelector('.search-form'),
    button: document.querySelector('button[data-action="open-editor"]'),
}

const renderNoteList = (listRef, notes) => {
    if (!notes) return;
    const listItems = notes.map(item => notesTemplate(item)).join('');

    listRef.insertAdjacentHTML('beforeend', listItems);
};


export {refs, renderNoteList};


