const BASE_URL = 'https://stormy-ravine-21598.herokuapp.com/';

const doFetch = (...params) => {
  return fetch(...params)
    .then(res => {
      if(res.status === 204) {
        return
      }
      return res.json();
    })
    .catch(err => Promise.reject('Something went wrong.'));
}

const getFolders = () => {
  return doFetch(BASE_URL + '/folders');
}

const getNotes = () => {
  return doFetch(BASE_URL + '/notes');
}

const addFolder = folder => {
  return doFetch(BASE_URL + '/folders', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(folder)
  });
}

const addNote = note => {
  return doFetch(BASE_URL + '/notes', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(note)
  });
}

const deleteNote = id => {
  return doFetch(BASE_URL + '/notes/' + id, {
    method: 'DELETE'
  });
}

export default {
  getFolders,
  getNotes,
  addFolder,
  addNote,
  deleteNote
}