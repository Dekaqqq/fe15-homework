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
        return new Promise(resolve => {
            setTimeout(() => {
                this._notes.push(note);
                localStorage.setItem('notes', JSON.stringify(this._notes))
                resolve(note);
            }, 500)
        })
    }

    deleteNote(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.findNoteById(id)) {
                    resolve((this.notes.splice(this._notes.indexOf(this.findNoteById(id)), 1)))
                    localStorage.setItem('notes', JSON.stringify(this._notes));
                }
            }, 500);
        });
    }

    updateNoteContent(id, updatedContent) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.findNoteById(id)) {
                    resolve(Object.assign(this.findNoteById(id), updatedContent));
                }
            }, 100);
        });
    }

    updateNotePriority(id, priority) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.findNoteById(id)) {
                    this.findNoteById(id).priority = priority;
                    resolve(this.findNoteById(id));
                }
            }, 100);
        });
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