import { FormLabel, Select } from '@chakra-ui/react';
import React from 'react';

import styles from './SelectBlank.module.css'

export default function SelectBlank({ name, handler }) {
  return (
    <>
      <FormLabel>Ваша роль:</FormLabel>
      <Select icon={<span></span>} className={styles.select} onChange={handler} name={name}>
        <option className={styles.turist} value="Турист">Турист</option>
        <option className={styles.gid} value="Гид">Гид</option>
      </Select>
    </>
  );
}
