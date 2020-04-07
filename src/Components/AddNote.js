import React from 'react';
import DataContext from '../DataContext';
import api from '../api'

class AddNote extends React.Component {
  static contextType = DataContext;


  addN = (e) => {
    let nName = e.target['note-name'].value
    let content = e.target['content'].value
    let folder_id = e.target['folder-choice'].value
    let date = new Date();
    let modified = new Date(date).toLocaleDateString()
    const note = {
      note_name: nName,
      modified: modified,
      folder_id: folder_id,
      content: content,
    }
    

    console.log(modified)

    api.addNote(note)
      .then(() =>{
        this.context.submitNote()
      })
  }

  render(){
    let folders = this.context.data.folders

    return(
      <form name="add-note" id="add-note"
        onSubmit={(e) => {
            e.preventDefault()
            this.addN(e)}
            }
      >
        <label htmlFor="note-name">Title: </label>
        <input type="text" name="note-name" placeholder="new note" required/>
        <label htmlFor="content">Content: </label>
        <input type="text" name="content" placeholder="what's this note for?" required/>
        <label htmlFor="folder-choice">Which folder? </label>
        <select name="folder-choice">
          {folders.map(item =>{
            return(
              
                <option key={item.id} value={item.id}>{item.folder_name}</option>
            
            )
          })}
          </select>
        <button onClick={() => this.context.cancelAdd()}>Cancel</button>
        <button type="submit">Add Note</button>
      </form>
    )
  }

}

export default AddNote;