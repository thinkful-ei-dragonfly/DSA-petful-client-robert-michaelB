import React from 'react';
import config from './config';
import './App.css';
import Header from './Components/Header.js';
import AdoptionOption from './Components/AdoptionOption.js';
// import CatAdoptionOption from './Components/CatAdoptionOption.js';

// import FormQuery from './Components/FormQuery/FormQuery';
// import TweetList from './Components/TweetList/TweetList';
// import SearchHistory from './Components/SearchHistory/SearchHistory';
import LandingDescription from './Components/LandingDescription.js';

class App extends React.Component {
  state = {
    people: null,
    history: null,
    dog: null,
    cat: null,
    hasError: false,
    showLandingPage: true,
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

  handleAdoptClick = (event) => {
    event.preventDefault();
    /* POST request to server */
  }

  onLandingButtonClick = () => {
    this.setState({
      showLandingPage: false,
    });
  };

  render() {

    /* determine if dog and cat data is null, if so, dont show component*/
    let dogComponent = ( this.state.dog ? <AdoptionOption animal={this.state.dog} ></AdoptionOption> : '');
    let catComponent = ( this.state.cat ? <AdoptionOption animal={this.state.cat} ></AdoptionOption> : '');

    return (
      <div>
        <Header />
        {this.state.showLandingPage ? (
          <LandingDescription
            onLandingButtonClick={this.onLandingButtonClick}
          />
        ) : (
          ''
        )}
        {this.state.showLandingPage ? (
          ''
        ) : (
          <div class="adoption-holder" >
            {dogComponent}
            {catComponent}
          </div>
        )}
      </div>
    );
  }
}

export default App;

/* retrieve past query history for all users */
// componentDidMount() {
//   fetch(config.API_ENDPOINT + '/queries/history')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error({ message: 'error with getting history' });
//       }
//       return response.json();
//     })
//     .then(data => {
//       this.setState({
//         queries: data.queries,
//       });
//     })
//     .catch(err => console.log(err.message));
// }

// handleSubmitQuery = query => {

//   fetch(config.API_ENDPOINT + `/tweets/queries/${query}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error({ message: 'something seems to have gone wrong' });
//       }
//       return response.json();
//     })
//     .then(data => {
//       this.setState(
//         {
//           watsonEmotionResults: data.watsonEmotionResults,
//           tweets: data.duplicatesFiltered,
//           hasError: false,
//           currentQuery: query,
//         },
//         this.addToHistory(query)
//       );
//     })
//     .catch(error =>
//       this.setState({
//         hasError: true,
//       })
//     );
// };

// addToHistory(newQuery) {
//   const body = JSON.stringify({
//     query: newQuery,
//   });
//   const options = {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body,
//   };
//   // check if its already been searched, if not dont add
//   let pastQueries = [];
//   for (let i = 0; i < this.state.queries.length; i++) {
//     pastQueries.push(this.state.queries[i].query);
//   }
//   if (!pastQueries.includes(newQuery)) {
//     fetch(config.API_ENDPOINT + '/queries/history', options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error({ message: 'error with retrieving history' });
//         }
//         return response.json();
//       })
//       .then(data => {
//         this.setState({
//           queries: [...this.state.queries, data],
//         });
//       })
//       .catch(err => console.log(err.message));
//   }
// }

// let isEmotionDataPresent = this.state.watsonEmotionResults ? true : false;
// let tweetList = this.state.tweets ? <TweetList tweets={this.state.tweets} /> : '';
// let emotionChartDisplay, sentimentChartDisplay;
// if (isEmotionDataPresent) {
//   emotionChartDisplay = (
//     <EmotionChart watsonEmotionResults={this.state.watsonEmotionResults} />
//   );
//   sentimentChartDisplay = (
//     <SentimentChart
//       watsonEmotionResults={this.state.watsonEmotionResults}
//     />
//   );
// } else {
//   emotionChartDisplay = '';
//   sentimentChartDisplay = '';
// }

// let errorDisplay;
// if (this.state.hasError) {
//   // errorDisplay = <SearchError />;
// } else {
//   errorDisplay = '';
// }
