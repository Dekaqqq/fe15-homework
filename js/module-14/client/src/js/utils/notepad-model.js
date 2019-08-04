import * as api from '../../services/api';
import { Notyf } from 'notyf';
const notyf = new Notyf();

export default class Notepad {
    constructor(notes = []) {
        this._notes = notes;
    }

    static Priority = {
        LOW: 0,
        NORMAL: 1,
        HIGH: 2,
    }

    async notes() {
        try {
            const notes = await api.getNotes();
            return notes;
        } catch(error) {
            return notyf.error(error.message);
        }
    }

    async findNoteById(id) {
        const note = await this._notes.find(note => note.id === id);
        return note;
    }

    async saveNote(note) {
        try {
            const savedNote = await api.saveNote(note);
            this._notes.push(savedNote);
            return savedNote;
        } catch(error) {
            return notyf.error(error.message);
        }
    }

    async deleteNote(id) {
        try {
            const deletedNote = await api.deleteNote(id);
            this._notes.filter(note => note.id !== id);
            return deletedNote;
        } catch(error) {
            return notyf.error(error.message);
        }
    }

    async updateNoteContent(id, updatedContent) {
        try {
            const updatedNote = await api.updateNote(id, updatedContent);
            this._notes = this._notes.map(item => item.id === updatedNote.id ? updatedNote : item);
        } catch(error) {
            return notyf.error(error.message);
        }
    }

    async updateNotePriority(id, priority) {
        try {
            const updatedNote = await api.updateNote(id, priority);
            this._notes = this._notes.map(item => item.id === id ? updatedNote : item);
        } catch(error) {
            return notyf.error(error.message);
        }
    }

    async filterNotesByQuery(query) {
        try {
            const resolve = await this.notes();
            const newNotes = [];

            for (const note of resolve) {
                if (note.title.toLowerCase().includes(query.toLowerCase()) || note.body.toLowerCase().includes(query.toLowerCase())) {
                    newNotes.push(note);   
                }
            }

            return newNotes;
        } catch (error) {
            return notyf.error(error.message);
        }
    }

    async filterNotesByPriority(priority) {
        try {
            const resolve = await this.notes();
            const newNotes = [];

            for (const note of resolve) {
                if (note.priority === priority) {
                    newNotes.push(note);
                }
            }

            return newNotes;
        } catch (error) {
            return notyf.error(error.message);
        }
    }
}