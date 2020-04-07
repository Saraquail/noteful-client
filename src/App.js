import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Header from './Components/Header';
import ErrorComp from './Components/Error';

import api from './api';

import DataContext from './DataContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    addFolder: false,
    addNote: false,
  }

  // handleAddClick = (type="") => {
  //   let currentState = {
  //     ...this.state,
  //     dialogOpen: type ? true : false,
  //     addMode: type
  //   };

  //   this.setState(currentState);
  // }

  // handleAddNoteSubmit = note => {
  //   let currentState = { ...this.state };

  //   currentState.notes.push(note);
  //   currentState.addMode = "";
  //   currentState.dialogOpen = false;

  //   this.setState(currentState);
  // }

  // handleAddFolderSubmit = folder => {
  //   let currentState = { ...this.state };

  //   currentState.folders.push(folder);
  //   currentState.addMode = "";
  //   currentState.dialogOpen = false;

  //   this.setState(currentState);
  // }

  handleDeleteNote = (note_id) => {
    console.log(note_id)
    // const currentState = { ...this.state };
    // let note = currentState.notes.find(n => n.id === note_id);
    // let index = currentState.notes.indexOf(note);
    // currentState.notes.splice(index, 1);
    const newNotes = this.state.notes.filter(n => n.id !== note_id)

    this.setState({
      notes: newNotes
    });
  }

  handleAddNote = () => {
    this.setState({
      addNote: true
    })
  }

  handleAddFolder = () => {
    this.setState({
      addFolder: true
    })
  }

  handleSubmitFolder = () => {
    this.setState({
      addFolder: false
    })
    this.updateFolders()
  }

  handleSubmitNote = () => {
    this.setState({
      addNote: false
    })
    this.updateNotes()
  }

  handleCancelAdd = () => {
    this.setState({
      addFolder: false,
      addNote: false,
    })
  }

  updateFolders() {
    api.getFolders()
    .then(data => {
      this.setState({ folders: data })
      console.log(data)

    })
    .catch(err => {
      console.error(err);
    })
  }

  updateNotes() {
    api.getNotes()
      .then(data => {
          this.setState({ notes: data })
        })
      .catch(err => {
          console.error(err);
        })
  }

  componentDidMount() {
    this.updateFolders()
    this.updateNotes()
  }

  render() {
    const contextValue = {
      data: this.state,
      addFolderFn: this.handleAddFolder,
      addNoteFn: this.handleAddNote,
      cancelAdd: this.handleCancelAdd,
      submitFolder: this.handleSubmitFolder,
      submitNote: this.handleSubmitNote,
      deleteNote: this.handleDeleteNote
    }

    return (
      <ErrorComp>
        <DataContext.Provider value={contextValue}>
          <div className="app">
            <Header />
            <main>
              <Sidebar />
              <Content />
            </main>
          </div>
        </DataContext.Provider>
      </ErrorComp>
    );
  }

}

export default App;
