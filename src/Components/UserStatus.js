import React from 'react';

export default class UserStatus extends React.Component {

  render() {

    if (this.props.currentUser && this.props.people) {
      return (
        <div>
          <h2>Welcome {this.props.currentUser}!</h2>
          <h3>You are number {this.props.people.indexOf(this.props.currentUser) + 1} in the Adoption queue.</h3>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}