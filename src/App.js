import React from 'react';
import config from './config';
import './App.css';
import Header from './Components/Header.js';
import AdoptionOption from './Components/AdoptionOption.js';
import Register from './Components/Register.js';
import AdoptionQueue from './Components/AdoptionQueue.js'
import AdoptHistory from './Components/AdoptHistory.js'

import LandingDescription from './Components/LandingDescription.js';

class App extends React.Component {
  state = {
    currentUser: null,
    people: null,
    history: null,
    dog: null,
    cat: null,
    hasError: false,
    showLandingPage: true,
    registered: false,
  };

  componentDidMount() {
    /* get necessary adoption data from server */
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/dog`),
      fetch(`${config.API_ENDPOINT}/api/cat`),
      fetch(`${config.API_ENDPOINT}/api/people`),
      fetch(`${config.API_ENDPOINT}/api/history`),
    ])
      .then(([dogRes, catRes, peopleRes, historyRes]) => {
        if (!dogRes.ok) return dogRes.json().then(e => Promise.reject(e));
        if (!catRes.ok) return catRes.json().then(e => Promise.reject(e));
        if (!peopleRes.ok) return peopleRes.json().then(e => Promise.reject(e));
        if (!historyRes.ok)
          return historyRes.json().then(e => Promise.reject(e));
        return Promise.all([
          dogRes.json(),
          catRes.json(),
          peopleRes.json(),
          historyRes.json(),
        ]);
      })
      .then(([dog, cat, people, history]) => {
        this.setState({ dog, cat, people, history });
      })
      .catch(error => {
        console.error({ error });
        this.setState({ hasError: true });
      });
  }

  handleAdoptClick = event => {
    event.preventDefault();
    /* POST request to server */
  };

  onLandingButtonClick = (e, name) => {
    e.preventDefault();
    this.setState({
      showLandingPage: false,
      currentUser: name
    });
  };

  render() {
    /* determine if dog and cat data is null, if so, dont show component*/
    let dogComponent = this.state.dog ? (
      <AdoptionOption
        animal={this.state.dog}
        registered={this.state.registered}
      />
    ) : (
      ''
    );
    let catComponent = this.state.cat ? (
      <AdoptionOption
        animal={this.state.cat}
        registered={this.state.registered}
      />
    ) : (
      ''
    );

    return (
      <div>
        <Header />
        {this.state.showLandingPage ? (
          <div>
            <LandingDescription
              onLandingButtonClick={this.onLandingButtonClick}
            />
            <Register onLandingButtonClick={this.onLandingButtonClick} />
          </div>
        ) : (
          ''
        )}
        {this.state.showLandingPage ? (
          ''
        ) : (
          <div id="adoption-page">
            <section></section>
            <section className="adoption-holder">
              {dogComponent}
              {catComponent}
            </section>
            <section id="adoption-queue">
              <AdoptionQueue people={this.state.people} />
            </section>
            <section>
              <AdoptHistory></AdoptHistory>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default App;