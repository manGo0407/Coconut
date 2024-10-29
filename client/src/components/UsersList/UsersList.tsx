import AdminUserCard from '../AdminUserCard/AdminUserCard';
import { SimpleGrid } from '@chakra-ui/react';

export default function UsersList({ users, setter }) {
  return <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>{users.length > 0 && users?.map((el) => <AdminUserCard user={el} key={el.id} setter={setter}/>)}</SimpleGrid>;
}
