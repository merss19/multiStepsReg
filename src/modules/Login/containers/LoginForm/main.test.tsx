import {shallow, mount} from 'enzyme'
import {LoginForm} from './main'
//import {Loader} from '../../components/Loader'
import {Field, FormProps, reduxForm} from 'redux-form/immutable';
import {Button, ButtonTypes} from '../../../../components/Button';
import * as React from 'react'
import toJson from 'enzyme-to-json'
import * as sinon from 'sinon'

const {JSDOM} = require('jsdom');
const dom = new JSDOM(`
<!doctype html>
<html>
  <body>
    <script type="text/javascript" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=602675109923486"></script>
      <script>
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1443501655955659');
      // fbq.disablePushState = true;
    </script>
    <script>document.body.appendChild(document.createElement("h2"));</script>
  </body>
</html>`, {runScripts: "dangerously"});
const {window} = dom;
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let props = {
  onSubmit: jest.fn(),
  handleSubmit: jest.fn()
};
describe('Component LoginForm', () => {
  const component = shallow(<LoginForm {...props}/>);
  it('renders component', () => {
    expect(component).toHaveLength(1)
  });
  it('renders correctly', () => {
    const tree = toJson(shallow(<LoginForm {...props}/>));
    expect(tree).toMatchSnapshot()
  });
  it('pass prop onSubmit', () => {
    expect(component.instance().props.onSubmit).toBe(props.onSubmit)
  });
  it('call handleSubmit', () => {
    component.find(Button).simulate('click');
    expect(props.handleSubmit).toHaveBeenCalledWith(props.onSubmit)
  });
});

