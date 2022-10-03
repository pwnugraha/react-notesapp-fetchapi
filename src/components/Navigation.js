import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import contentData from '../utils/content-data';

function Navigation({ logout, name }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  function onLogoutHandler() {
    logout();
    navigate('/');
  }

  return (
    <>
    <button className='toggle-locale' onClick={toggleLocale}>{locale === 'id' ? 'EN' : 'ID'}</button>
      <button className='toggle-theme' onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
      {
        name !== undefined &&
        <>
          <nav className="navigation">
            <ul>
              <li><Link to="/archives">{contentData[locale].app_link_archive}</Link></li>
            </ul>
          </nav>

          <button className='button-logout' onClick={onLogoutHandler}><FiLogOut /> {name}</button>
        </>
      }
    </>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;