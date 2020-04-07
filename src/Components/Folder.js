import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Folder extends React.Component {
  render(){
    return (
      <li className={this.props.active ? 'active' : ''}>
        <Link to={"/folder/" + this.props.id}>{this.props.folder_name}</Link>
      </li>
    );
  }
}
Folder.propTypes = {
  value: PropTypes.string
}

export default Folder;