import React from 'react';
import './LandingDescription.css';
// import '../../public/images'

export default class LandingDescription extends React.Component {
  render() {
    return (
      <div id="landingPane">
        <section className="landingRow">
          <header role="banner">
            <h3>
              Adopt your new best friend!
            </h3>
          </header>
          <p>
            Petful is your local neighborhood's dog and cat animal shelter. Adoption is
            on a first come first serve basis, and you must enter the adoption queue before
            you can take your new friend home.
          </p>
        
        </section>
        <section id="callAction">
          <img id="landing-img" alt="a cute cat and dog snuggling" src='../../static/animal-cat-cute.jpg'></img>
          <h3>
            Navigate to our home page below to see our animals and reserve your place in line.
          </h3>
        </section>
        {/* <button
          id="hideLanding"
          onClick={(e) => this.props.onLandingButtonClick(e)}
        >
          Start looking now :)
        </button> */}
      </div>
    );
  }
}
