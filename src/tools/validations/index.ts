
const isEmpty = (value:any) => value === undefined || value === null || value === '';
const join = (rules:any) => {
  return (value:any) => {
    return rules.map((rule:any) => {
      return rule(value)
    }).filter((error:any) => {
      return !!error
    })[0 /* first error */ ];
  }
};

export const validateGender = (value: any) => {
  if(!value) {
    return 'Поле пол должно быть заполнено'
  }
};
const validateEmail = (data:any, errors: any) => {
  if (data.email) {
    data.email = data.email.replace(/ /g, '');
  }
  if (!data.email) {
    errors.email = 'Email должен быть заполнен';
  }
  if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email)) {
    errors.email = 'Email заполнен неправильно';
  }
  return errors;
}

const validatePassword = (data:any, errors: any) => {
  if (!data.password) {
    errors.password = 'Поле пароля должно быть заполнено';
  }
  if (data.password && data.password.length < 6) {
    errors.password = 'Поле пароля должно быть длиннее 6 символов';
  }
  if (data.password && data.password.length > 20) {
    errors.password = 'Поле пароля должно быть короче 20 символов';
  }
  if (/["]/g.test(data.password)) {
    errors.password = 'Поле пароля не должно содержать знак "';
  }

  if (data.password !== data.passwordAgain) {
    errors.passwordAgain = 'Пароли должны совпадать';
  }
  return errors;
}

export const validateForgetPassword = (data: any) => {
  let errors: any = {};
      errors = validateEmail(data, errors);
  return errors;
};

export const validatePasswordRestore = (data: any) => {
  let errors: any = {};
      errors = validatePassword(data, errors);
  return errors;
};
export const validateSignUp = (data: any) => {
  let errors: any = {};
      errors = validateEmail(data, errors);
      errors = validatePassword(data, errors);

  if (!data.gender) {
    errors.gender = 'Пол должен быть заполнен';
  }

  if (!data.accept) {
    errors.accept = 'Вы должны принять условия оферты и правил';
  }
  return errors;
};

export const validateLogin = (data: any) => {
  let errors: any = {};
      errors = validateEmail(data, errors);
  if (!data.password) {
    errors.password = 'Поле пароля должно быть заполнено';
  }
  return errors;
};

export function getBsFeedback(value:any) {
  var feedback;
  feedback = {};
  if (value.touched) {
    feedback = {
      hasFeedback: true,
      bsStyle: value.valid ? 'success' : 'error',
      help: value.touched && (value.error ? value.error : '')
    };
  }
  return feedback;
}

export function email(value:any) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value:any) {
  if (isEmpty(value)) {
    return 'Required';
  }
  return false;
}

export function minLength(min:any) {
  return (value:any) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return false;
  };
}

export function maxLength(max:any) {
  return (value:any) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return false;
  };
}

export function integer(value:any) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
  return false;
}

export function oneOf(enumeration:any) {
  return (value:any) => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
    return false;
  };
}

export function match(field:any) {
  return (value:any, data:any) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
    return false;
  };
}


export function createValidator(rules: any) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key]);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
