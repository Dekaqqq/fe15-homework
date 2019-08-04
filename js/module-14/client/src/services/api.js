import { Notyf } from 'notyf';
const notyf = new Notyf();

const URL = 'http://localhost:3000/notes';

export const getNotes = async() => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch(error) {
        return notyf.error(error.message);
    }
};

export const saveNote = async(note) => {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    }

    try {
        const response = await fetch(URL, opts);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
        return notyf.error(error.message);
    }
};

export const deleteNote = async(id) => {
    const opts = {
        method: 'DELETE'
    }

    try {
        const response = await fetch(`${URL}/${id}`, opts);
        const data = response.json();
        return data;
    } catch(error) {
        return notyf.error(error.message);
    }
};

export const updateNote = async(id, updatedContent) => {
    const opts = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContent)
    }

    try {
        const response = await fetch(`${URL}/${id}`, opts);
        const data = response.json();
        return data;
    } catch(error) {
        return notyf.error(error.message);
    }
};
