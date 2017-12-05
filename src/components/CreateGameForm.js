import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let CreateGameForm = props => {
	const { handleSubmit } = props
	return (
		<form onSubmit={ handleSubmit }>
			<div>
			  <label htmlFor="userName">Username:</label>
			  <Field className="userName" name="userName" component="input" type="text" />
			</div>
			<button type="submit">Create Game</button>
		</form>
	)
}

CreateGameForm = reduxForm({
	form: 'createGame'
})(CreateGameForm)

export default CreateGameForm;