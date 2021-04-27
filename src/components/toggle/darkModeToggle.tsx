import React from 'react';

import Toggle from './toggle';
import useDarkMode from 'use-dark-mode';
import styles from './style.module.scss'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className={styles.darkmodetoggle}>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;