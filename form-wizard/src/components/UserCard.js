import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

function UserCard({ createdAt, name, email }) {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          Name: <b>{name}</b>
        </CardTitle>
        <CardSubtitle>
          Email: <b>{email}</b>
        </CardSubtitle>
        <CardSubtitle>
          Name: <b>{createdAt}</b>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

export default UserCard;
