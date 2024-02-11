'use client';

import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

import './styles.css';

type Props = {
  mode?: 'navbar' | 'sidebar';
};

const ThemeSwitch = ({ mode }: Props) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (mode === 'sidebar') {
    return (
      <Switch
        defaultSelected
        onChange={toggleTheme}
        size="md"
        color="primary"
        startContent={<FaSun />}
        endContent={<FaMoon />}
      />
    );
  }

  return (
    <label className="container">
      <input
        checked={theme === 'light'}
        onChange={toggleTheme}
        type="checkbox"
      />

      <FaMoon className="moon" />
      <FaSun className="sun text-yellow-400" />
    </label>
  );
};

export default ThemeSwitch;
