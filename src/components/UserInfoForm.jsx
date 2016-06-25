import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/action_creators';

const { func } = PropTypes;

const validate = values => {
  const errors = {}

  if (!values.get('age')) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.get('age')))) {
    errors.age = 'Must be a number'
  } else if (values.get('age') < 0) {
    errors.age = 'Must be >= 0'
  }

  if (!values.get('yearsMusicExperience')) {
    errors.yearsMusicExperience = 'Required'
  } else if (isNaN(Number(values.get('yearsMusicExperience')))) {
    errors.yearsMusicExperience = 'Must be a number'
  } else if (values.get('yearsMusicExperience') < 0) {
    errors.age = 'Must be >= 0'
  }

  return errors
}

const UserInfoForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitUserInfo(props.userInfo);
    props.navigateTo('/quiz');
  }
  const { pristine, reset, submitting } = props;
  return (
    <div className="ui vertical stripe segment">
      <div className="ui text container">
        <h3 className="ui header">Some background info about you</h3>

        <div className="ui divider"></div>

        <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
            <label>Age</label>
            <Field name="age" component={age =>
              <div>
                <input type="number" {...age} placeholder="Age"/>
                {age.touched && age.error &&
                  <div className="ui error message" style={{ display: 'block' }}>
                    {age.error}
                  </div>}
              </div>
            }/>
          </div>
          <div className="field">
            <label>Years of Professional Music Experience</label>
            <Field name="yearsMusicExperience" component={yearsMusicExperience =>
              <div>
                <input type="number" {...yearsMusicExperience} placeholder="Years of Professional Music Experience" />
                {yearsMusicExperience.touched && yearsMusicExperience.error &&
                  <div className="ui error message" style={{ display: 'block' }}>
                    {yearsMusicExperience.error}
                  </div>}
              </div>
            }/>
          </div>
          <div>
            <button className="ui button primary" type="submit" disabled={submitting}>Submit</button>
            <button className="ui button secondary" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const selector = formValueSelector('userInfoForm');
// wrapped in object to avoid hot-loader and import bugs,
// see https://github.com/erikras/redux-form/issues/1010#issuecomment-221524502
export default {
  form: connect(
    state => ({
      userInfo: selector(state, 'age', 'yearsMusicExperience')
    }),
    actionCreators
  )(reduxForm({
    form: 'userInfoForm',
    validate
  })(UserInfoForm))
};
