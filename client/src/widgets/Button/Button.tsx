import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';

export default function ButtonBlank({
  color,
  size,
  type,
  text,
  margin,
  handler,
}) {
  if (handler) {
    return (
      <Button
        onClick={handler}
        colorScheme={color}
        size={size}
        margin={margin}
        type={type}
        _hover={{ bg: `${color}.400` }}
      >
        {text}
      </Button>
    );
  }
  return (
    <Button
      colorScheme={color}
      size={size}
      margin={margin}
      type={type}
      _hover={{ bg: `${color}.400` }}
    >
      {text}
    </Button>
  );
}
