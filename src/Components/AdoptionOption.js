import React from 'react';

export default class AdoptionOption extends React.Component {


  handleAdoptClick() {
    // this.props
  }
  

  render() {
    // get info from props into easily accessible format, delineating between dog and cat
    let animalObj = this.props.animal;
    let infoArr = [];
    let id = 0;
     for (let stat in animalObj) {
       if (stat !== 'imageURL' && stat !== 'imageDescription') {
         infoArr.push(<li key={id++} className="animal-stat">{'' + stat + ': ' + animalObj[stat] }</li>)
       }
    }

  return (
    <div className="adoption-option">
      <img src={this.props.animal.imageURL} alt={this.props.animal.imageDescription} ></img>
      <ul className="animal-info">
        {infoArr}
      </ul>
      <button className='adopt-btn' disabled={this.props.placeInLine} >Adopt {this.props.animal.name}</button>
    </div>    
  );
  }

}