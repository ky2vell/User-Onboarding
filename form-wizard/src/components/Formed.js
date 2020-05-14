import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import * as yup from 'yup';
import axios from 'axios';
import UserCard from './UserCard';

const formSchema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Must include email addresss'),
  password: yup
    .string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
  terms: yup.boolean().oneOf([true], 'Please agree to terms of use')
});

function Formed() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  });

  const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [user, setUser] = useState([]);

  const validate = e => {
    let value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ''
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const changeHandler = e => {
    e.persist();
    validate(e);
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormState({ name: '', email: '', password: '', terms: false });
    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => setUser(res.data))
      .catch(console.log);
  };

  return (
    <Row>
      <Col md='6'>
        <h2 className='text-center'>User Sign Up!</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              value={formState.name}
              onChange={changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={formState.email}
              onChange={changeHandler}
            />
            {errorState.email.length > 0 ? (
              <small className='text-danger d-block mt-2'>
                {errorState.email}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formState.password}
              onChange={changeHandler}
            />
            {errorState.password.length > 0 ? (
              <small className='text-danger d-block mt-2'>
                {errorState.password}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type='checkbox'
                name='terms'
                checked={formState.terms}
                onChange={changeHandler}
              />
              Terms of Service
              {errorState.terms.length > 0 ? (
                <small className='text-danger d-block'>
                  {errorState.terms}
                </small>
              ) : null}
            </Label>
          </FormGroup>
          <Button block color='primary' className='shadow mt-3'>
            Submit
          </Button>
        </Form>
      </Col>
      <Col md='6'>
        <h2 className='text-center'>Users</h2>
        <UserCard
          key={user.id}
          createdAt={user.createdAt}
          name={user.name}
          email={user.email}
        />
      </Col>
    </Row>
  );
}

export default Formed;
