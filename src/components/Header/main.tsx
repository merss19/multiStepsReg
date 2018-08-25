import * as React from 'react';
import {Button, ButtonTypes} from "components/Button";
import {Link} from "react-router-dom";
import {storage} from "tools/storage";

interface OwnProps {
}

export class Header extends React.Component<OwnProps, {}> {

  logOut() {
    storage.remove('token', {path: '/'});
    storage.remove('program', {path: '/'});
    storage.remove('promoName', {path: '/'});
    storage.removeState('auth');
  }

  render() {
    return (
      <div className='header header--hero'>
        <div className='grid header__inner'>
          <div className='grid__cell header__burger'>
            <span className='header__ico-burger'>
              <svg className='svg-icon ico-burger'>
                <use xlinkHref="#ico-burger"></use>
              </svg>
            </span>
          </div>

          <h1 className='grid__cell header__logo'>
            Ясегодня
            <svg className='svg-icon ys-logo-web'>
              <use xlinkHref="#ys-logo-web"></use>
            </svg>
          </h1>

          <div className='grid__cell header__right-side'>
            <Button
              type='button'
              styleBtn={ButtonTypes.info}
            >
              <Link to='/' onClick={this.logOut.bind(this)}>Выход</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;