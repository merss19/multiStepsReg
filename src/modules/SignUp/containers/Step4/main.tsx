import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonTypes} from 'components/Button';
import CustomSteps, {CustomStepsProps} from '../CustomSteps';

interface OwnProps extends CustomStepsProps {}
export class StepFour extends CustomSteps<OwnProps> {
  render() {
    return (
      <div className='entry__success'>
        <h3>Ваша заявка принята.</h3>
        <p>В ближайшее время мы с вами свяжемся!</p>
        <div className='text-center pt20'>
          <Button
            type={'button'}
            styleBtn={ButtonTypes.info}
          >
            <Link to='/' onClick={() => this.logOut()}>Вернуться на главный сайт</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default StepFour;
