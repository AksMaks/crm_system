import React from 'react';
import s from'./ManagerPanel.module.css';
import NavBar from './NavBar/NavBar.jsx';
import ManagerContent from './ManagerContent/ManagerContent.jsx';

const ManagerPanel = () => {
  return (
	<div className={s.ManagerPanel}>
		<NavBar/>
		<ManagerContent/>
	</div>
  );
}

export default ManagerPanel;