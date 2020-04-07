import React from 'react';
import DataContext from '../DataContext';

class SelectedFolder extends React.Component {
  static contextType = DataContext;

  render() {
    let notes =  this.context.data.notes
    let note_id = parseInt(this.props.match.params.note_id)
    // console.log('notes', notes)
    // console.log('params', note_id)

    let note = notes.find(n => n.id === note_id) || {};
    // console.log('note[1]', notes[1])
    // console.log('note', note)
  
    let folder = this.context.data.folders.find(f => f.id === note.folder_id) || {};

    return (
      
      <article>
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <h3>{folder.folder_name}</h3>
      </article>
    )
  }
}

export default SelectedFolder;