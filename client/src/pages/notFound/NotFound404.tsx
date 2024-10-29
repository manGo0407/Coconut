import React from 'react';
import styles from './notfound.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound404() {
  const navigate = useNavigate();
  return (
    <div className={styles.flexContainer}>
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <button onClick={() => navigate('/')} type="button" name="button">
          Return To Home
        </button>
      </div>
    </div>
  );
}
