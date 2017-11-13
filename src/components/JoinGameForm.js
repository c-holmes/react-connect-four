import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let JoinGameForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="userName">Username</label>
        <Field name="userName" component="input" type="text" />
      </div>
      <button type="submit">Join</button>
    </form>
  )
}

JoinGameForm = reduxForm({
  form: 'joinGame'
})(JoinGameForm)

export default JoinGameForm;