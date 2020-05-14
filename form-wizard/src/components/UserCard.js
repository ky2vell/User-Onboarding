import React from 'react';
import { Card, CardBody } from 'reactstrap';

function UserCard({ user }) {
  return (
    <>
      {user.map(el => (
        <Card key={el.id} className='mb-3'>
          <CardBody>
            <dt>Name:</dt> <dd>{el.name}</dd>
            <dt>Email:</dt> <dd>{el.email}</dd>
            <dt>Created:</dt> <dd>{el.createdAt}</dd>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default UserCard;
