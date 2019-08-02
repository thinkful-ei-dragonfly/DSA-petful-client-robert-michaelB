import React from 'react';
import ValidationError from '../ValidationError'

export default class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        formValid: false,
        validationMessages: {
          name: '',
        }
      }
    }
  
    static defaultProps = {
      history: {
        push: () => { }
      },
    }


  updateName(name) {
    this.setState({ name }, () => { this.validateName(name) });
  }

  handleRegisterClick = e => {
    e.preventDefault()
    const name = {
      name: e.target['name'].value
    }
    fetch(`api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(name),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, () => {
      this.validateForm();
    });
  }

  validateForm = () => {
    this.setState({
        formValid: this.state.nameValid
    });
  }


  render() {
    return (
      <section className='Register'>
        <form>
          <div className='field'>
            <label htmlFor='name-input'>
              Name
            </label>
            <input
              type='text'
              id='name-input'
              name='name'
              onChange={e => this.updateName(e.target.value)}
              />
          </div>
          <div className='buttons'>
            <button disabled={!this.state.formValid} type='submit'>
            Register
            </button>
          </div>
        </form>
        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
      </section>
    )
  }
}