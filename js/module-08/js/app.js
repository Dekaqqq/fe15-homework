'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {
    constructor(notes = []) {
        this._notes = notes;
    }

    static Priority = {
        LOW: 0,
        NORMAL: 1,
        HIGH: 2,
    }

    get notes() {
        return this._notes;
    }

    findNoteById(id) {
        for (const note of this._notes) {
            if (note.id === id) return note;
        }
    }

    saveNote(note) {
        this._notes.push(note);
        return note;
    }

    deleteNote(id) {
        if (this.findNoteById(id)) {
            this.notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
        }
    }

    updateNoteContent(id, updatedContent) {
        if (this.findNoteById(id)) {
            return Object.assign(this.findNoteById(id), updatedContent);
        }
    }

    updateNotePriority(id, priority) {
        if (this.findNoteById(id)) {
            this.findNoteById(id).priority = priority;
            return this.findNoteById(id);
        }
    }

    filterNotesByQuery(query) {
        const newNotes = [];

        for (const note of this._notes) {
            if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
                newNotes.push(note);   
            }
        }

        return newNotes;
    }

    filterNotesByPriority(priority) {
        const newNotes = [];

        for (const note of this._notes) {
            if (note.priority === priority) {
                newNotes.push(note);
            }
        }

        return newNotes;
    }
}


const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);



const notepad = new Notepad(initialNotes);
const notes = notepad.notes;

const list = document.querySelector('.note-list');
const noteEditor = document.querySelector('.note-editor');
const searchForm = document.querySelector('.search-form');


const createNoteContent = (title, body) => {
    const noteContent = document.createElement('div');
    noteContent.classList.add('note__content');

    const noteTitle = document.createElement('h2');
    noteTitle.classList.add('note__title');
    noteTitle.textContent = title;

    const noteBody = document.createElement('p');
    noteBody.classList.add('note__body');
    noteBody.textContent = body;

    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteBody)

    return noteContent;
};

const createActionButton = (action, type) => {
    const button = document.createElement('button');
    button.classList.add('action');
    button.dataset.action = action;

    const actionIcon = document.createElement('i');
    actionIcon.classList.add('material-icons');
    actionIcon.classList.add('action__icon');
    actionIcon.textContent = type;

    button.appendChild(actionIcon);

    return button;
};

const createNoteFooter = (priority) => {
    const noteFooter = document.createElement('footer');
    noteFooter.classList.add('note__footer');

    const noteSection = document.createElement('section');
    noteSection.classList.add('note__section');

    const noteSpan = document.createElement('span');
    noteSpan.classList.add('note__priority');
    noteSpan.textContent = `Priority: ${priority}`;

    noteSection.append(createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN), createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP),noteSpan);

    const noteSection2 = document.createElement('section');
    noteSection2.classList.add('note__section');

    noteSection2.append(createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT), createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE));

    noteFooter.append(noteSection, noteSection2);

    return noteFooter;
};


const createListItem = ({id, title, body, priority}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('note-list__item');
    listItem.dataset.id = id;

    const note = document.createElement('div');
    note.classList.add('note');

    note.append(createNoteContent(title, body), createNoteFooter(priority));

    listItem.appendChild(note);

    return listItem;
};



const renderNoteList = (listRef, notes) => {
    const listItems = notes.map(item => createListItem(item));

    listRef.append(...listItems);
};

renderNoteList(list, notes);


const addListItem = (listRef, note) => {
    listRef.appendChild(note);
};


const handlerNoteEditor = event => {
    event.preventDefault();

    const [title, body] = document.querySelectorAll('.note-editor__input');
    const obj = {};

    if (!title.value || !body.value) {
        return alert('Необходимо заполнить все поля!');
    }

    obj.id = generateUniqueId();
    obj.title = title.value;
    obj.body = body.value;
    obj.priority = PRIORITY_TYPES.LOW;
    
    notepad.saveNote(obj);
    addListItem(list, createListItem(obj));

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







