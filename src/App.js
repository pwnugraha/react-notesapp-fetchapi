import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/network-data';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import dataContent from './utils/content-data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'dark',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'dark' ? 'light' : 'dark'
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },
      locale: localStorage.getItem('locale') || 'id',
      toggleLocale: () => {
        this.setState((prevState) => {
          const newLocale = prevState.locale === 'id' ? 'en' : 'id'
          localStorage.setItem('locale', newLocale);
          return {
            locale: newLocale
          };
        });
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return (
        <div className='app-container'>
          <main><section className='notes-list-empty'>
            <p className="notes-list__empty">{dataContent[this.state.locale].app_loading}</p>
          </section></main>
        </div>
      )
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeContext.Provider value={{ theme: this.state.theme, toggleTheme: this.state.toggleTheme }}>
          <LocaleContext.Provider value={{ locale: this.state.locale, toggleLocale: this.state.toggleLocale }}>
            <div className='app-container'>
              <header>
                <h1>
                  <Link to="/">{dataContent[this.state.locale].app_name}</Link>
                </h1>
                <Navigation />
              </header>
              <main>
                <Routes>
                  <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleContext.Provider>
        </ThemeContext.Provider>

      )
    }

    return (

      <ThemeContext.Provider value={{ theme: this.state.theme, toggleTheme: this.state.toggleTheme }}>
        <LocaleContext.Provider value={{ locale: this.state.locale, toggleLocale: this.state.toggleLocale }}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">{dataContent[this.state.locale].app_name}</Link>
              </h1>
              <Navigation logout={this.onLogout} name={this.state.authedUser.name} />

            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider >
    );
  }
}

export default App;
