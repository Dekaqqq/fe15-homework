import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from './constants';

export const createNoteContent = (title, body) => {
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

export const createActionButton = (action, type) => {
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

export const createNoteFooter = (priority) => {
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

export const createListItem = ({id, title, body, priority}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('note-list__item');
    listItem.dataset.id = id;

    const note = document.createElement('div');
    note.classList.add('note');

    note.append(createNoteContent(title, body), createNoteFooter(priority));

    listItem.appendChild(note);

    return listItem;
};

export const renderNoteList = (listRef, notes) => {
    const listItems = notes.map(item => createListItem(item));

    listRef.append(...listItems);
};