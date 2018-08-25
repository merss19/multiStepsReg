import * as React from 'react';
import { Link } from 'react-router-dom';
import {storage} from 'tools/storage';

const LogoLink: React.SFC<{}> = () => (
  <Link
    to="/"
    onClick={() => {
      storage.remove('token', {path: '/'});
      storage.remove('program', {path: '/'});
      storage.remove('promoName', {path: '/'});
    }}
  >
    <svg className='svg-icon ys-logo-web'>
      <use xlinkHref='#ys-logo-web'/>
    </svg>
  </Link>
);

export default LogoLink;
