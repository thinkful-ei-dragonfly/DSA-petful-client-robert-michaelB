import React from 'react';
import config from './config';
import './App.css';
import Header from './Components/Header.js';
import UserStatus from './Components/UserStatus.js'
import AdoptionOption from './Components/AdoptionOption.js';
import Register from './Components/Register.js';
import AdoptionQueue from './Components/AdoptionQueue.js'
import AdoptHistory from './Components/AdoptHistory.js'
import AdoptedMessage from './Components/AdoptedMessage.js'
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
    isAdopted: false
  };

  componentDidMount() {
    /* get necessary adoption data from server */
    // Promise.all([
    //   fetch(`${config.API_ENDPOINT}/api/dog`),
    //   fetch(`${config.API_ENDPOINT}/api/cat`),
    //   fetch(`${config.API_ENDPOINT}/api/people`),
    //   fetch(`${config.API_ENDPOINT}/api/history`),
    // ])
    //   .then(([dogRes, catRes, peopleRes, historyRes]) => {
    //     if (!dogRes.ok) return dogRes.json().then(e => Promise.reject(e));
    //     if (!catRes.ok) return catRes.json().then(e => Promise.reject(e));
    //     if (!peopleRes.ok) return peopleRes.json().then(e => Promise.reject(e));
    //     if (!historyRes.ok)
    //       return historyRes.json().then(e => Promise.reject(e));
    //     return Promise.all([
    //       dogRes.json(),
    //       catRes.json(),
    //       peopleRes.json(),
    //       historyRes.json(),
    //     ]);
    //   })
    //   .then(([dog, cat, people, history]) => {
    //     this.setState({ dog, cat, people, history, isAdopted: false });
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //     this.setState({ hasError: true });
    //   });
    this.fetchDog()
  }

  handleAdoptClick = (event, animalObj) => {
    event.preventDefault();
    /* POST request to server 
    TODO: ALSO NEED TO PASS IN ID
    */
    let animalEndpoint = ( animalObj.name === this.state.dog.name ? `${config.API_ENDPOINT}/api/dog` : `${config.API_ENDPOINT}/api/cat` )

    fetch(animalEndpoint, {
      method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
          throw new Error('adopt animal failed');
        }
        return res.json();
      })
      .then(deleteRes => {
        this.setState({
          isAdopted: true,
        })
        this.updateAfterAdoption()
      })
      .catch(e => console.error(e))
  };

  updateAfterAdoption() {
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
        this.setState({ dog, cat, people, history, isAdopted: false });
      })
      .catch(error => {
        console.error({ error });
        this.setState({ hasError: true });
      });
  }

  fetchDog() {
      fetch(`${config.API_ENDPOINT}/api/dog`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then((dog) => {
        this.setState({ dog });
      })
      .catch(error => {
        console.error({ error });
        this.setState({ hasError: true });
      });
  }


  onLandingButtonClick = (e, name) => {
    e.preventDefault();

    let nameBody = {
      name: name,
    }

    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(nameBody),
    }).then(res => {
      if (!res.ok) {
        throw new Error('user add failed');
      }
      return res.json();
    }).then((data) => {
      this.setState({
        showLandingPage: false,
        currentUser: name
      });
      this.updateQueue();
    }).catch( e => console.error(e));
  }

  updateQueue() {
    fetch(`${config.API_ENDPOINT}/api/people`)
      .then(res => {
        if (!res.ok) {
          throw new Error('queue not updated');
        }
        return res.json();
      })
      .then(queue => {
        this.setState({
          people: queue
        })
      })
      .catch(e => console.error(e))
  }

  render() {
    /* determine if dog and cat data is null, if so, dont show component*/
    let dogComponent = ''
    if (this.state.people) {
      dogComponent = this.state.dog ? (
      <AdoptionOption
        animal={this.state.dog}
        placeInLine={this.state.people.indexOf(this.state.currentUser) !== 0}
        handleAdoptClick={this.handleAdoptClick}
      />
      ) : (
        ''
      )
    }
    let catComponent = this.state.cat ? (
      <AdoptionOption
        animal={this.state.cat}
        placeInLine={this.state.people.indexOf(this.state.currentUser) !== 0}
        handleAdoptClick={this.handleAdoptClick}
      />
    ) : (
      ''
    );
    let isAdoptedMessage = (this.state.isAdopted ? <AdoptedMessage /> : '');

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
            <section id="user-status">
              <UserStatus currentUser={this.state.currentUser} people={this.state.people} />
              {isAdoptedMessage}
            </section>
            <section className="adoption-holder">
              {dogComponent}
              {catComponent}
            </section>
            <section id="adoption-queue">
              <AdoptionQueue people={this.state.people} />
            </section>
            <section id="adopt-history">
              <AdoptHistory history={this.state.history}></AdoptHistory>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default App;