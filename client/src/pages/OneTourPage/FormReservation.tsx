import { FormControl, FormLabel, Input, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import React from 'react'

export default function FormReservation() {
  return (
    <form
    onSubmit={(event) => reserveHandler(event)}
    className="checkout-form"
  >
    <FormControl isRequired>
    <FormLabel>Имя:</FormLabel>
    <Input placeholder='Введите имя' />
    </FormControl>
    <FormControl isRequired>
    <FormLabel>Фамилия:</FormLabel>
    <Input placeholder='Введите фамилию' />
    </FormControl>
    <FormLabel>Кол-во бронируемых мест: </FormLabel>
    <NumberInput
      max={dataTour?.remaindQuantity}
      min={0}
      defaultValue={0}
    >
      <NumberInputField name="peoples" type="number" />
      <NumberInputStepper>
        <NumberIncrementStepper onChange={incrementHandler} />
        <NumberDecrementStepper onChange={decrementHandler} />
      </NumberInputStepper>
    </NumberInput>
    <button type="submit">Сохранить</button>
  </form>
  )
}
