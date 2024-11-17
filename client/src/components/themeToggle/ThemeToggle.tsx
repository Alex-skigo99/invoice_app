import React, { useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    document.body.className = theme + '-theme';
  
    return (
        <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ?
                <img src="/images/icon-sun.svg" alt="sun" id="sun" data-testid="sun" />
                :
                <img src="/images/icon-moon.svg" alt="moon" id="moon" data-testid="moon" />
            }
        </div>
    );
};

export default ThemeToggle;