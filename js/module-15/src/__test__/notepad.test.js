import Notepad from '../notepad';

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.Priority.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.Priority.NORMAL,
  },
];

describe('Notepad methods', () => {
    let notepad;

    beforeEach(() => {
        notepad = new Notepad(initialNotes);
    });

    afterEach(() => {
        notepad = null;
    });

    it('has initial items', () => {
        expect(notepad.notes).toBe(initialNotes);
    });

    it('find correct note by id', () => {
        expect(notepad.findNoteById('id-1')).toStrictEqual({
            id: 'id-1',
            title: 'JavaScript essentials',
            body:
            'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
            priority: Notepad.Priority.HIGH,
        });
    });

    it('if there is no such id in the current notes', () => {
        expect(notepad.findNoteById('id-15')).toBe(undefined);
    });

    it('should add note to current notepad', () => {
        const expected = {
            id: 'id-3',
            title: 'Get comfy with Frontend frameworks',
            body:
                'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
            priority: Notepad.Priority.NORMAL,
        };

        notepad.saveNote(expected);

        expect(notepad.notes).toContainEqual(expected);
    });

    it('should delete note with current id', () => {
        const expectedNotes = [
            {
                id: 'id-1',
                title: 'JavaScript essentials',
                body:
                'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
                priority: Notepad.Priority.HIGH,
            },
            {
                id: 'id-3',
                title: 'Get comfy with Frontend frameworks',
                body:
                    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
                priority: Notepad.Priority.NORMAL,
            },
        ];

        notepad.deleteNote('id-2');

        expect(notepad.notes).toStrictEqual(expectedNotes);
    });

    it('should update note with new content', () => {
        notepad.updateNoteContent('id-3', {
            title: 'Get comfy with React.js or Vue.js',
        });

        const expected = {
            id: 'id-3',
            title: 'Get comfy with React.js or Vue.js',
            body:
                'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
            priority: Notepad.Priority.NORMAL,
        };

        expect(notepad.notes).toContainEqual(expected); 
    });

    it('if there is no such note with this id to update', () => {
        expect(
            notepad.updateNoteContent('id-10', {
            title: 'Get comfy with React.js or Vue.js',
        })).toBe(undefined);
    });

    it('should update note with new priority', () => {
        notepad.updateNotePriority('id-1', Notepad.Priority.HIGH);

        const expected = {
            id: 'id-1',
            title: 'JavaScript essentials',
            body:
            'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
            priority: Notepad.Priority.HIGH,
        };

        expect(notepad.notes).toContainEqual(expected);
    });

    it('should filter notes by query', () => {
        const query = 'comfortable';

        const expected = [
            {
                id: 'id-1',
                title: 'JavaScript essentials',
                body:
                'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
                priority: Notepad.Priority.HIGH,
            }
        ];

        expect(notepad.filterNotesByQuery(query)).toEqual(expect.arrayContaining(expected));
    });

    it('should filter notes by priority', () => {
        const priority = Notepad.Priority.HIGH;

        const expected = [
            {
                id: 'id-1',
                title: 'JavaScript essentials',
                body:
                'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
                priority: Notepad.Priority.HIGH,
            }
        ];

        expect(notepad.filterNotesByPriority(priority)).toEqual(expect.arrayContaining(expected));
    });

    it('if there is no such priority in the current notes', () => {
        const priority = 'Hello';

        expect(notepad.filterNotesByPriority(priority)).toStrictEqual([]);
    })
});
