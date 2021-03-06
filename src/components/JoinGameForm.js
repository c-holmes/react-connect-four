import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let JoinGameForm = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="userName">Username</label>
        <Field className="userName" name="userName" component="input" type="text" />
      </div>
      <button type="submit">Join</button>
    </form>
  )
}

//normally you would pass an {form: unique-name} to reduxForm, instead i am passing this through props 
JoinGameForm = reduxForm()(JoinGameForm)

export default JoinGameForm;