import React from 'react';
import Folder from './Folder';
import DataContext from '../DataContext';
import api from '../api';



class FolderList extends React.Component {
  static contextType = DataContext;


  addF = (e) => {
    let trimmed = e.target['folder-name'].value.trim() === ""

    if(trimmed){
      alert('please enter a name')
    }
    
    else{

    let fName = e.target['folder-name'].value
    const folder = {
      folder_name: fName
    }
    api.addFolder(folder)
      .then(() =>{
        this.context.submitFolder()
      })
    }
  }


  render() {
    const id = this.props.match.params.id || null;

    const folders = this.context.data.folders.map(folder => (
      <Folder key={folder.id} id={folder.id} active={folder.id === id} folder_name={folder.folder_name} />
    ))

    return (
      <ul>
        {folders}
        <li><button onClick={() => this.context.addFolderFn()}>Add Folder</button></li>
        {this.context.data.addFolder && 
          <form id="add-folder" name="add-folder" 
            onSubmit={(e) => {
            e.preventDefault()
            this.addF(e)}
            }>
            <label htmlFor="folder-name" id="folder-label">Folder name:</label>
            <input type="text" name="folder-name" id='form-input' required />
            <button type="submit">
              Add
            </button>
            <button onClick={() => this.context.cancelAdd()}>
              Cancel
            </button>
          </form>
        }
      </ul>
    )
  }
}

export default FolderList;