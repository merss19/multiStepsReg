import * as React from 'react';
import Background from '../Background';
import LogoLink from '../LogoLink'
import * as SVGInjector from 'svg-injector'
import {Header} from 'components/Header';

interface Sprite {
  readonly body: any
  readonly img: HTMLImageElement
}
interface OwnProps {
  notLogo?: boolean
  type: 'main' | 'signUP'
}
export class Layout extends React.Component<OwnProps, {}> {

  static defaultProps = {
    notLogo: false,
    type:'signUP'
  };

  componentDidMount() {
    this.svgInject()
  }

  svgInject(): void {
    const sprite: Sprite = {
      body: document.querySelector('body'),
      img: document.createElement('img')
    };
    sprite.img.className = 'injected-svg';
    sprite.img.id = 'svg-inject-me';
    sprite.img.src = process.env.PUBLIC_URL + '/img/symbol-sprite.svg';
    sprite.body.appendChild(sprite.img);
    let mySVGsToInject: any = document.querySelector('#svg-inject-me');
    SVGInjector(mySVGsToInject);
  }

  renderLogo() {
    if (!this.props.notLogo) {
      return (
        <div className='grid entry-header'>
          <div className='grid__cell todayme-logo'>
            <LogoLink/>
          </div>
        </div>
      )
    }
  }

  render() {
    const {children, type} = this.props;
    if(type === 'main'){
      return (<Header/>);
    } else {
      return (
        <div className='layout layout--entry'>
          {this.renderLogo()}
          {children}
          <Background/>
        </div>
      );
    }
  }
}

export default Layout;