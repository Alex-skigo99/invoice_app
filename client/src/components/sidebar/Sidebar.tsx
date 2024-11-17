import React from 'react';
import './sidebar.css';
import Logo from './Logo';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="sidebar">
        <Logo />
        <div className='sidebar_children'>
            {children}
        </div>
    </div>
  );
};

export default Sidebar;