import React from 'react';
import t from 'tcomb-form';

const Base = t.struct({
  type: t.enums.of(['Address', 'Email']),
}, 'BaseSettings');

const Address = t.struct({
  type: t.enums.of(['Address', 'Email']),
  state: t.enums.of(['Maharashtra', 'Goa', 'Gujarat']),
  city: t.String,
}, 'AddressSettings');

const Email = t.struct({
  type: t.enums.of(['Address', 'Email']),
  email: t.String,
}, 'EmailSettings');

const getType = ({ type }) => {
  switch (type) {
  case 'Address':
    return Address;
  case 'Email':
    return Email;
  default: 
    return Base;
  }
};

const getOptions = ({ type }) => {
  return {
    fields: {
      state: {
        factory: t.form.Radio,
      }
    }
  };
};

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: getType({}),
      options: {},
      value: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, path, kind) {
    console.log('onChange', value, path, kind, this.refs.form.getValue());
    if(path[0] === 'type') {
      this.setState({ type: getType(value), value, options: getOptions(value) });
    }
  }

  onSubmit(evt) {
    evt.preventDefault();
    const v = this.refs.form.getValue();
    if (v) {
      console.log('Form value', v);
      this.setState({
        options: {...this.state.options, hasError: false, error: null }
      });
    } else {
      this.setState({
        options: {...this.state.options, hasError: true, error: 'Please correct the error' }
      });
      console.log('Form invalid', this.refs.form.validate());
    }
  }

  render() {
    return <div>
      <p>Settings</p>
      <form onSubmit={this.onSubmit}>
        <t.form.Form
          ref="form"
          type={this.state.type}
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  }
}

export default Settings;
