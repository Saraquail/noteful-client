import React from 'react';
import { Link } from 'react-router-dom';


class Note extends React.Component {
  render() {

    let date_modified = new Date(this.props.date_modified).toLocaleString()
    return (
      <li>
        <div>
          <h2><Link to={"/note/" + this.props.id}>{this.props.note_name}</Link></h2>
          <p>Date modified {date_modified}</p>
        </div>
        <button onClick={() => {this.props.onDelete(this.props.id)}}>Delete Note</button>
      </li>
    )
  }
}

export default Note;