import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/action_creators';

const { func } = PropTypes;

const validate = values => {
  const errors = {}
  if (!values.get('ageGroup')) {
    errors.ageGroup = 'Required'
  }
  if (!values.get('musicExperience')) {
    errors.musicExperience = 'Required'
  }
  return errors
}

const UserInfoForm = (props) => {
  const submitFormAndAdvance = (e) => {
    props.submitUserInfo(props.userInfo);
    props.next();
  }
  const { userInfo, pristine, reset, submitting, submitFailed, handleSubmit } = props;
  const { ageGroup, musicExperience } = userInfo;

  return (
    <div className="ui vertical stripe segment">
      <div className="ui text container">
        <h1 className="ui header">Some background info about you</h1>

        <div className="ui divider"></div>

        <form onSubmit={handleSubmit(submitFormAndAdvance)} className="ui form">
          <div className="inline fields">
            <label htmlFor="ageGroup">Age Group</label>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="ageGroup" component="input" type="radio" value="under18" />
                <label>Under 18</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="ageGroup" component="input" type="radio" value="18to25" />
                <label>18 to 25</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="ageGroup" component="input" type="radio" value="26to45" />
                <label>26 to 45</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="ageGroup" component="input" type="radio" value="46to60" />
                <label>46 to 60</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="ageGroup" component="input" type="radio" value="over60" />
                <label>Over 60</label>
              </div>
            </div>
            {submitFailed && !ageGroup &&
              <div className="ui negative message">
                <div className="header">
                  Required!
                </div>
              </div>}
          </div>
          <div className="grouped fields">
            <label htmlFor="musicExperience">Self-rating of music experience</label>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="musicExperience" component="input" type="radio" value="novice" />
                <label><b>Novice</b>: I like to listen to music, but do not play any instruments</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="musicExperience" component="input" type="radio" value="intermediate" />
                <label><b>Intermediate</b>: I have played an instrument, but have not studied music composition</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <Field name="musicExperience" component="input" type="radio" value="advanced" />
                <label><b>Advanced</b>: I have studied music composition in a formal setting</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
              <Field name="musicExperience" component="input" type="radio" value="expert" />
                <label><b>Expert</b>: I am a teacher or researcher in music</label>
              </div>
            </div>
            {submitFailed && !musicExperience &&
              <div className="ui negative message">
                <div className="header">
                  Required!
                </div>
              </div>}
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
      userInfo: selector(state, 'ageGroup', 'musicExperience')
    }),
    actionCreators
  )(reduxForm({
    form: 'userInfoForm',
    validate
  })(UserInfoForm))
};
