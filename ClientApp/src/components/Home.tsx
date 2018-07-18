import * as React from 'react';
import Auth from '../utils/auth0/Auth';

export interface IHomeProps{
  auth: Auth
}

class Home extends React.Component<IHomeProps> {
  constructor(props:IHomeProps) {
    super(props);
    this.login = this.login.bind(this);
  }
  public login() {
    this.props.auth.login();
  }
  public render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              You are logged in!
              </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login}
              >
                Log In
                </a>
              {' '}to continue.
              </h4>
          )
        }
      </div>
    );
  }
}

export default Home;