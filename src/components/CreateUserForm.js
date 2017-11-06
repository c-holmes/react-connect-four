import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let CreateUserForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="userName">First Name</label>
        <Field name="userName" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

CreateUserForm = reduxForm({
  // a unique name for the form
  form: 'createUser'
})(CreateUserForm)

export default CreateUserForm;