export default class Notepad {
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