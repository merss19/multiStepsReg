import * as React from "react"
import {Button, ButtonTypes} from "components/Button";
import {Link} from "react-router-dom";

interface OwnProps {
  text?: string
  isError?: boolean
}

export const Loader: React.SFC<OwnProps> = ({text, isError}) => {
  return (
    <div className='loading text-center'>
      {isError ?
        <div className='loading__desc text-center pt20'>
          <h2 className='pb20'>{text}</h2>
          <div className='pt10 pb10'>
            <p>Что-то пошло не так.</p>
            <p>Напишите нам в чат тех поддержки!</p>
          </div>

          <Button
            type='button'
            styleBtn={ButtonTypes.info}
          >
            <Link to="/">Продолжить</Link>
          </Button>
        </div>
        :
        <div className='loader loader--main'/>
      }
    </div>
  )
};

Loader.defaultProps = {
  text: 'Загружается',
};