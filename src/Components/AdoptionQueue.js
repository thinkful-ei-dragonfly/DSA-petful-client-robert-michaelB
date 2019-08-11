import React from 'react';

export default class AdoptionQueue extends React.Component{



  render() {
    
    let line = [];
    if (this.props.people) {
      line = this.props.people.map( (person, idx) => {
        return <li className='line-person' key={idx}>{person}</li>
      } )
    }

    return (
      <div id="adopt-line">
        <h2>Adoption Queue</h2>
        <ul>
          {line}
        </ul>
      </div>
    );
  }

}