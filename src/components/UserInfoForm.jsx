import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Field, reduxForm } from 'redux-form/immutable';

const { func } = PropTypes;

export const fields = [ 'age', 'yearsMusicExperience' ]

const validate = values => {
  const errors = {}
  console.log(values)
  if (!values.get('age')) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.get('age')))) {
    errors.age = 'Must be a number'
  }
  if (!values.get('yearsMusicExperience')) {
    errors.yearsMusicExperience = 'Required'
  } else if (isNaN(Number(values.get('yearsMusicExperience')))) {
    errors.yearsMusicExperience = 'Must be a number'
  }
  return errors
}

const UserInfoForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Age</label>
        <Field name="age" component={age =>
          <div>
            <input type="number" {...age} placeholder="Age"/>
            {age.touched && age.error && <span>{age.error}</span>}
          </div>
        }/>
      </div>
      <div>
        <label>Years of Professional Music Experience</label>
        <Field name="yearsMusicExperience" component={yearsMusicExperience =>
          <div>
            <input type="number" {...yearsMusicExperience} placeholder="Years of Professional Music Experience"/>
            {yearsMusicExperience.touched && yearsMusicExperience.error && <span>{yearsMusicExperience.error}</span>}
          </div>
        }/>
      </div>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

// wrapped in object to avoid hot-loader and import bugs,
// see https://github.com/erikras/redux-form/issues/1010#issuecomment-221524502
export default {
  form: reduxForm({
    form: 'userInfoForm',
    fields,
    validate
  })(UserInfoForm)
};
