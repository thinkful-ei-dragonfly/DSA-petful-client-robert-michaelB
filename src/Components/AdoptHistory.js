import React from 'react';

export default class AdoptHistory extends React.Component {

  render() {
    let adoptionHistory = []
    if (this.props.history) {
      adoptionHistory = this.props.history.map( (adoption, idx) => {
        return <li key={idx}>{adoption.person} adopted {adoption.animal.name}.</li>
      })
    }

    return (
      <div>
        <h2>Recent Adoptions</h2>
        <ul id="adopt-list">
          {adoptionHistory}
        </ul>
      </div>
    );
  }

}