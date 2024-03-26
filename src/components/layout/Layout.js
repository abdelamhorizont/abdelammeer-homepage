import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";
import { motion } from "framer-motion"

import Sun from '../../assets/img/SVG/sun.png'
import Moon from '../../assets/img/SVG/moon.svg'
import Cloud from '../../assets/img/SVG/cloud.png'
import Rainbow from '../../assets/img/SVG/rainbow.png'
import Star from '../../assets/img/SVG/star.png'
import Diamond from '../../assets/img/SVG/diamond.png'
import Feuer from '../../assets/img/SVG/flame.png'

import './layout.scss'

const Layout = ({ children, activeSite }) => {
  const { title, description } = useSiteMetadata();
  // const [aboutOpen, setAboutOpen] = useState(false)

  const themes = [
    'color-theme',
    'light-theme',
    'dark-theme',
    'grey-theme',
  ]

  const [theme, setTheme] = useState(themes[0])
  const [themeCount, setthemeCount] = useState(0)

  // const ThemeIcon = theme == 'light-theme' ? "🌙" : theme == 'color-theme' ? "☀️" : "🌈"

  // const toggleTheme = () => {
  //   setTheme(themes[themeCount])
  //   setthemeCount(themeCount + 1)

  //   if (themeCount > 1) {
  //     setthemeCount(0)
  //   }
  // };


  useMemo(() => themeCount, [theme])

  useEffect(() => {
    setTheme(themes[themeCount])
  }, [themeCount])


  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
    // closed: { opacity: 0, x: "-100%" },
  }

  const ulHover = {
    default: { opacity: 1, x: 0, height: "50px" },
    // hover: { opacity: 1, x: 0, height: "100px" },
    // closed: { opacity: 0, x: "-100%" },
  }

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
        <nav className="nav-header">
          <div className="nav-group" >
            <ul className="nav-meta">
              <li id='logo'><Link to="/">abdelammeer</Link></li>
              <li><Link to="/about">about</Link></li>
              <li><a href="mailto:hello@abdelammeer.com">@</a></li>
            </ul>
            <ul className="nav-sites">
              <li className={`blog ${activeSite == 'blog' && 'border'}`}><Link to="/blog">blog</Link></li>
              <li className={`space ${activeSite == 'space' && 'border'}`}><Link to="/space">space</Link></li>
              {/* <li className={`work ${activeSite == 'work' && 'border'}`}><Link to="/work">work</Link></li> */}
            </ul>
          </div>

          <motion.ul className='color-modes'
            initial="default"
            whileHover="hover"
          >
            <motion.li
              // className={theme == 'dark-theme' && 'active-button'}
              animate={theme == 'dark-theme' ? "hover" : "default"}
              variants={ulHover}
            ><button onClick={() => setTheme('dark-theme')}><img id="star" src={Star} alt="Dark Theme" /></button></motion.li>
            <motion.li
              // className={theme == 'light-theme' && 'active-button'}
              animate={theme == 'light-theme' ? "hover" : "default"}
              variants={ulHover}
            ><button onClick={() => setTheme('light-theme')}><img id="sun" src={Sun} alt="Light Theme" /></button></motion.li>
              <motion.li
                // className={theme == 'grey-theme' && 'active-button'}
                animate={theme == 'grey-theme' ? "hover" : "default"}
                variants={ulHover}
              ><button onClick={() => setTheme('grey-theme')}><img id="cloud" src={Cloud} alt="Grey Theme" /></button></motion.li>
            <motion.li
              // className={theme == 'color-theme' && 'active-button'}
              animate={theme == 'color-theme' ? "hover" : "default"}
              variants={ulHover}
            >
              <button onClick={() => setTheme('color-theme')}><img id="rainbow" src={Rainbow} alt="Color Theme" /></button>
            </motion.li>
          </motion.ul>
        </nav>
      </header>

      {children}

      {/* <div className="heightfill"></div> */}

      <nav className="nav-footer">
        <ul>
        {/* <div className="contact"> */}
          <li className="insta-link"><a href='https://www.instagram.com/' target="blank">Instagram</a></li>
        {/* </div> */}

        {/* <div className="nav-links-footer"> */}
         <li> <Link to="/imprint">Imprint</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        {/* </div> */}
        </ul>
      </nav>


    </div>
  )
}

export default Layout;
