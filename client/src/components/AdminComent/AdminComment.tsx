import { ButtonGroup, Card, CardBody, Text } from '@chakra-ui/react';
import ButtonBlank from '../../widgets/Button/Button';
import axios from 'axios';

export default function AdminComment({ comment, setter }) {
  const deleteHandler = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/comments/${comment.id}`
    );
    if (response.status === 200) {
      setter((prev) => prev.filter((el) => el.id !== comment.id));
    }
  };
  const approvehandler = async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/admin/comment/${comment.id}`
    );
    if (response.status === 200) {
      setter((prev) => prev.filter((el) => el.id !== comment.id));
    }
  };
  return (
    <Card variant="outline">
      <CardBody>
        <Text>Автор: {comment?.User?.login}</Text>
        <Text>Название тура: {comment?.Tour.name}</Text>
        <Text>Содержание: {comment?.value}</Text>
        <Text>
          Написан: {new Date(comment?.createdAt).toLocaleDateString()}
        </Text>
        <Text>
          Изменен: {new Date(comment?.createdAt).toLocaleDateString()}
        </Text>
        <ButtonGroup gap="4">
          <ButtonBlank
            color={'red'}
            size={undefined}
            type={'button'}
            text={'Удалить'}
            margin={undefined}
            handler={deleteHandler}
          />
          <ButtonBlank
            color={'green'}
            size={undefined}
            type={'button'}
            text={'Все в порядке'}
            margin={undefined}
            handler={approvehandler}
          />
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}
