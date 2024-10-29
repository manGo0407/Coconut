import React from 'react';
import styles from './inputline.module.css';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

export default function InputLine({
  type,
  name,
  value,
  handler,
  isRequired,
  label,
}) {
  return (
    <FormControl>
      <label className={styles.label}>{label || name}</label>
      <Input
        isRequired={isRequired}
        onChange={handler}
        type={type}
        name={name}
        value={value}
        border={'solid'}
        backgroundColor={'white'}
        placeholder={label || name}
      />
    </FormControl>
  );
}
