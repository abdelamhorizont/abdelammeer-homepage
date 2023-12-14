import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";

import Projectlist from "../projectlist/projectlist";

import './layout.scss'

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [aboutOpen, setAboutOpen] = useState(false)

  const [theme, setTheme] = useState('light-theme')
  const [Lighttheme, setLightTheme] = useState('light-theme')
  const [ColorTheme, setColorTheme] = useState('color-theme')

  const LightThemeIcon = (theme == 'light-theme' ? "🌙" : "☀️")
  const ColorThemeIcon = (theme == 'color-theme' ? "☁" : "🌈")

  const toggleTheme = () => {
    theme === 'light-theme' ? setTheme('dark-theme') : setTheme('light-theme')
  };

  const toggleColorTheme = () => {
    theme != 'color-theme' ? setTheme('color-theme') : setTheme('light-theme')
  };

  useMemo(() => theme, [theme])

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
              <li id='blog'><Link to="/blog">blog</Link></li>
              <li id='space'><Link to="/space">space</Link></li>
              <li id='work'><Link to="/work">work</Link></li>
            </ul>
          </div>

          <ul className='color-modes'>
            <li><button onClick={toggleColorTheme}>{ColorThemeIcon}</button></li>
            <li><button onClick={toggleTheme}>{LightThemeIcon}</button></li>
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
