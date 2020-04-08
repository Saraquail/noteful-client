import React from 'react';
import Note from './Note'
import SelectedNote from './SelectedNote';
import DataContext from '../DataContext';
import AddNote from './AddNote';
import api from '../api';

class NoteList extends React.Component {
  static contextType = DataContext;

  handleDelete = id => {

    api.deleteNote(id)
      .then(() => {

        if (this.props.view === 'note') {
          this.props.history.goBack();
        }
    
        this.context.deleteNote(id);

      })
      .catch((error) => {
      })
  }
    
  render() {
    const id = parseInt(this.props.match.params.id) || null;
    let notes = this.context.data.notes;
    let noteContent = "";

    if (id) {
      let allnotes = this.context.data.notes

      if (this.props.view === 'folder') {
        notes = allnotes.filter(note => id === note.folder_id
        )
      } else {
        let n = allnotes.filter(note => note.id === id);
        notes = n;
        noteContent = n.length ? n[0].content : '';
      }
    }
    

    let noteComponents = notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        note_name={note.note_name}
        date_modified={note.date_modified}
        onDelete={this.handleDelete}/>
    ))

    return (
      <ul>
        


        {noteComponents}
        {this.props.view !== "note" ? (
          <li className="add"><button onClick={() => this.context.addNoteFn()}>Add Note</button></li>
        ) : (
          <SelectedNote content={noteContent} />
        )}
        {
          this.context.data.addNote && <AddNote />
        }
      </ul>

        
    )
  }
}

export default NoteList;