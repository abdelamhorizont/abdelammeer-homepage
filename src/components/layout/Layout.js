import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";

import Projectlist from "../projectlist/projectlist";

import './layout.scss'

const Layout = ({ children, activeSite }) => {
  const { title, description } = useSiteMetadata();
  // const [aboutOpen, setAboutOpen] = useState(false)

  const themes = [
    'color-theme',
    'light-theme',
    'dark-theme',
  ]

  const [theme, setTheme] = useState(themes[0])
  const [themeCount, setthemeCount] = useState(0)

  const ThemeIcon = theme == 'light-theme' ? "🌙" : theme == 'color-theme' ? "☀️" : "🌈"

  const toggleTheme = () => {
    setTheme(themes[themeCount])
    setthemeCount(themeCount + 1)

    if (themeCount > 1) {
      setthemeCount(0)
    }
  };


  useMemo(() => themeCount, [theme])

  useEffect(() => {
    setTheme(themes[themeCount])
  }, [themeCount])
  

  return (
    <div className={`layout ${theme}`}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>

      <header>
        <nav>
          <div className="nav-group" >
            <ul className="nav-meta">
              <li id='logo'><Link to="/">abdelammeer</Link></li>
              <li><Link to="/">about</Link></li>
              <li><a href="mailto:hello@abdelammeer.com">@</a></li>
            </ul>
            <ul className="nav-sites">
              <li className={`blog ${activeSite == 'blog' && 'border'}`}><Link to="/blog">blog</Link></li>
              <li className={`space ${activeSite == 'space' && 'border'}`}><Link to="/space">space</Link></li>
              <li className={`work ${activeSite == 'work' && 'border'}`}><Link to="/work">work</Link></li>
            </ul>
          </div>

          <ul className='color-modes'>
            <li className={theme == 'color-theme' && 'active-button'}><button onClick={() => setTheme('color-theme')}>🌈</button></li>
            <li className={theme == 'light-theme' && 'active-button'}><button onClick={() => setTheme('light-theme')}>☀️</button></li>
            <li className={theme == 'dark-theme' && 'active-button'}><button onClick={() => setTheme('dark-theme')}>🌙</button></li>
          </ul>
        </nav>
      </header>

      {children}

      <div className="heightfill"></div>

      <div className="footer">
        <div className="contact">
          <div className="insta-link"><a href='https://www.instagram.com/' target="blank">Instagram</a></div>
        </div>

        <div className="nav-links-footer">
          <Link to="/imprint">Imprint</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>


    </div>
  )
}

export default Layout;
