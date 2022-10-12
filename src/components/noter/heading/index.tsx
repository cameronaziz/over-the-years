import React, { FC } from 'react';
import NoteName from './noteName';
import styles from './styles.module.css';

const NoterHeading: FC = () => {
  
  return (
    <div className={styles.heading}>
      <NoteName />
      <div>
        <button>
          Open
        </button>
        <button>
          Save
        </button>
      </div>
    </div>
  );
};

export default NoterHeading;
