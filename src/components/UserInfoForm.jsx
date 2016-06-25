import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import { connect } from 'react-redux';

import * as actionCreators from '../redux/action_creators';

const { func } = PropTypes;

export const fields = [ 'age', 'yearsMusicExperience' ]

const validate = values => {
  const errors = {}
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

class UserInfoForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
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
