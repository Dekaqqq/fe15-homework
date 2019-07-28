import * as api from '../../services/api';

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
        return api.getNotes()
            .then(notes => {
                this._notes = notes;

                return this._notes;
            })
    }

    findNoteById(id) {
        for (const note of this._notes) {
            if (note.id === id) return note;
        }
    }

    saveNote(note) {
        return api.saveNote(note)
            .then(savedNote => {
                this._notes.push(savedNote);

                return savedNote;
            })
            .catch(err => console.log(err));
    }

    deleteNote(id) {
        return api.deleteNote(id)
            .then(() => {
                if (this.findNoteById(id)) {
                    this._notes.filter(note => note.id !== id);

                    return id;
                }
            })
            .catch(err => console.log(err));
    }

    updateNoteContent(id, updatedContent) {
        return api.updateNote(id, updatedContent)
            .then(updatedNote => {
                this._notes = this._notes.map(item => item.id === updatedNote.id ? updatedNote : item);
            })
            .catch(err => console.log(err));;
    }

    updateNotePriority(id, priority) {
        return api.updateNote(id, priority)
            .then(updatedNote => {
                this._notes = this._notes.map(item => item.id === id ? updatedNote : item);
            })
            .catch(err => console.log(err));
       
    }

    filterNotesByQuery(query) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newNotes = [];

                for (const note of this._notes) {
                    if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
                        newNotes.push(note);   
                    }
                }

                resolve(newNotes);
            }, 100);
        })
        
    }

    filterNotesByPriority(priority) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newNotes = [];

                for (const note of this._notes) {
                    if (note.priority === priority) {
                        newNotes.push(note);
                    }
                }

                resolve(newNotes);
            }, 100)
        });
        
    }
}