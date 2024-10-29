import React from 'react';
import AdminComment from '../AdminComent/AdminComment';
import { SimpleGrid } from '@chakra-ui/react';

export default function AdminCommentsList({ comments, setter }) {
  return (
    <SimpleGrid columns={3} spacing={10}>
      {comments?.length > 0 &&
        comments.map((el) => <AdminComment comment={el} key={el.id} setter={setter} />)}
    </SimpleGrid>
  );
}
