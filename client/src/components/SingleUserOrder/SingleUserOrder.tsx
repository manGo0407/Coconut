import {
  Card,
  CardBody,
  Text,
  Tag,
  Box,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import ButtonBlank from "../../widgets/Button/Button";
import IndexModal from "../../pages/BookingPage/IndexModal";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { deleteOrder } from "../../redux/thunkActions";

/// Эта страница
export default function SingleUserOrder({ order }) {
  console.log("prosto oreder ===> ", order);
  console.log("eto order===>", order?.Tour);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const start = order?.Tour?.startOfTheTour
    ? order?.Tour?.startOfTheTour.split("-").reverse().join("-")
    : []; // tour.startOfTheTour
  const end = order?.Tour?.endOfTheTour
    ? order?.Tour?.endOfTheTour.split("-").reverse().join("-")
    : [];

  const rejectHandler = async () => {
    dispatch(deleteOrder(order.id));
  };

  const check =
    order.peoplesBooked === 1 &&
    order.peoplesBooked === 2 &&
    order.peoplesBooked === 3 &&
    order.peoplesBooked === 4 &&
    order.peoplesBooked === 21 &&
    order.peoplesBooked === 22 &&
    order.peoplesBooked === 23 &&
    order.peoplesBooked === 24;

  const bg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.500");

  if (order.statusPay) {
    return (
      <Card maxW="rm">
        <Box
          bg={bg}
          w={"400px"}
          borderColor={borderColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          justifyContent={"normal"}
          marginTop={"10px"}
        >
          <VStack align="stretch" spacing={2}>
            <Text fontWeight="bold">Название тура: {order?.Tour?.name}</Text>
            <Text>Локация тура: {order?.Tour?.location}</Text>
            <Text>Длительность тура: {order?.Tour?.duration} дней</Text>
            {check ? (
              <Text>Оплачено на {order?.peoplesBooked} человек(а) </Text>
            ) : (
              <Text>Оплачено на {order?.peoplesBooked} человек(а)</Text>
            )}
            <Text>Старт тура: {start}</Text>
            <Text>Конец тура: {end}</Text>
            <Text>
              Собираемся {start}, в {order.Tour.gatherTime}
            </Text>
            <Text>
              Сумма заказа: {order?.peoplesBooked * order?.Tour?.price}₽
            </Text>

            <HStack justify="space-between">
              <Button onClick={rejectHandler} colorScheme="red" size="sm">
                Отменить бронь
              </Button>
              <Tag size="lg" variant="solid" colorScheme="green">
                Оплачено
              </Tag>
            </HStack>
          </VStack>
        </Box>
      </Card>
    );
  }

  return (
    <>
      <Card maxW="rm">
        <Box
          bg={bg}
          w={"400px"}
          borderColor={borderColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          margin={"auto"}
          marginTop={"10px"}
        >
          <Text mb={2}>Название тура: {order?.Tour?.name}</Text>
          <Text mb={2}>Локация тура: {order?.Tour?.location}</Text>
          <Text mb={2}>Длительность тура: {order?.Tour?.duration} дней</Text>
          <Text mb={2}>
            {check ? (
              <>Забронированно на {order?.peoplesBooked} человек </>
            ) : (
              <>Забронированно на {order?.peoplesBooked} человека</>
            )}
          </Text>
          <Text mb={2}>Старт тура: {start}</Text>
          <Text mb={2}>Конец тура: {end}</Text>
          <Text mb={4}>
            Cумма заказа: {order?.peoplesBooked * order?.Tour?.price}₽
          </Text>
          {order?.statusAccept && (
            <Button
              colorScheme="green"
              mb={4}
              onClick={() => setIsModalOpen(true)}
            >
              К оплате
            </Button>
          )}
          <HStack justify="space-between">
            <Button colorScheme="red" onClick={rejectHandler} size="sm">
              Отменить бронь
            </Button>
            <Tag
              size="lg"
              variant="solid"
              colorScheme={order?.statusAccept ? "orange" : "blue"}
            >
              {order?.statusAccept ? "Ожидает оплаты" : "Ожидает подтверждения"}
            </Tag>
          </HStack>
        </Box>
        <IndexModal
          order={order}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Card>
    </>
  );
}
