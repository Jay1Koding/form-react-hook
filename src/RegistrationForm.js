import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './styles.css';

const validationSchema = yup.object().shape({
  firstName: yup.string().min(3, '최소 3글자').max(10, '최대 10글자'),
  lastName: yup.string().min(3, '최소 3글자').max(10, '최대 10글자'),
  email: yup.string().email(),
  password: yup.string(),
  passwordConfirm: yup.string().min(5).max(20),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('RESULT', data);
    alert(JSON.stringify(data));
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input
        placeholder='First Name'
        type='text'
        {...register('firstName', { required: true, maxLength: 80 })}
      />
      {errors.firstName ? (
        <p className='messages'>{errors.firstName?.message}</p>
      ) : null}

      <label>Last name</label>
      <input
        placeholder='Last Name'
        type='text'
        {...register('lastName', { required: true, maxLength: 100 })}
      />
      {errors.lastName ? (
        <p className='messages'>{errors.lastName?.message}</p>
      ) : null}

      <label>Email</label>
      <input
        placeholder='Email'
        type='text'
        {...register('email', {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors.email ? (
        <p className='messages'>{errors.email?.message}</p>
      ) : null}

      <label>Password</label>
      <input
        placeholder='Password'
        type='text'
        {...register('password', { required: true, maxLength: 100 })}
      />
      {errors.password ? (
        <p className='messages'>{errors.password?.message}</p>
      ) : null}

      <label>Password Confirm</label>
      <input
        placeholder='Password'
        type='text'
        {...register('passwordConfirm', {
          required: true,
          maxLength: 100,
        })}
      />
      {errors.passwordConfirm ? (
        <p className='messages'>{errors.passwordConfirm?.message}</p>
      ) : null}

      <input type='submit' />
    </form>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Form />, rootElement);
