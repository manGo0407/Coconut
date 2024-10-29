import React from 'react';
import AdminHorisontalCard from '../AdminHorisontalCard/AdminHorisontalCard';

export default function AdminRequests({ tours }) {
  return (
    <div>{tours.length > 0 && tours.map((el) => <AdminHorisontalCard tour={el} key={el.id}/>)}</div>
  );
}
