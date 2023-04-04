import React from 'react';

import { Link } from 'react-router-dom';

import '../../styles/sideBar.scss';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faFolder, faPowerOff } from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
  return (
		<div className='sideBar'>
			<label htmlFor="menuShow"><FontAwesomeIcon icon={faBars}/></label>
			<input type="checkbox" id="menuShow" />
			<ul className='menuUl'>
				<li>
					<Link to='/'>
						<FontAwesomeIcon icon={faHouse}/>
						<span>메인페이지</span>
					</Link>
				</li>

				<li> 
					<Link to='/'>
						<FontAwesomeIcon icon={faFolder}/>
						<span>페이지1</span>
					</Link>
				</li>

				<li>
					<Link to='/'>
						<FontAwesomeIcon icon={faFolder}/>
						<span>페이지2</span>
					</Link>
				</li>

				<li>
					<Link to='/'>
						<FontAwesomeIcon icon={faFolder}/>
						<span>페이지3</span>
					</Link>
				</li>
			</ul>
			
			<div className='logoutBtn'>
				<Link to='/'>
					<FontAwesomeIcon icon={faPowerOff}/>
					<span>로그아웃</span>
				</Link>
			</div>
			
		</div>

  );
};

export default SideBar;