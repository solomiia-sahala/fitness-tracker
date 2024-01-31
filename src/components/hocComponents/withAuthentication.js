import React from 'react';
import { withFirebase } from './withFirebase';
import AuthenticationContext from '../../contexts/authContext';

export const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        user => {
          user
            ? this.setState({ user })
            : this.setState({ user: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthenticationContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </AuthenticationContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
