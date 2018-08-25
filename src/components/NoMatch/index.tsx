import * as React from "react"
import {Button, ButtonTypes} from "components/Button";
import {Link} from "react-router-dom";
import {LayoutHOC} from 'components/HOC/LayoutHOC';

export const NoMatch: React.SFC<{}> = () => {
  return (
    <div className='entry entry--min'>
      <div className='entry__inner text-center '>
        <h2 className="pt10 pb10">Ничего не найдено</h2>
        <Button
          type='button'
          styleBtn={ButtonTypes.info}
        >
          <Link to="/">Продолжить</Link>
        </Button>
      </div>
    </div>
  )
};

export default LayoutHOC()(NoMatch)
