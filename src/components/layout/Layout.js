import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";
import { motion } from "framer-motion"

import Sun from '../../assets/img/SVG/book.png'
import Moon from '../../assets/img/SVG/moon.svg'
import Cloud from '../../assets/img/SVG/person.png'
import Rainbow from '../../assets/img/SVG/galaxy.png'
import Star from '../../assets/img/SVG/anglerfish.png'
import Diamond from '../../assets/img/SVG/diamond.png'
import Feuer from '../../assets/img/SVG/flame.png'

import './layout.scss'

const Layout = ({ children, activeSite, colorTheme, passTheme, location }) => {
  const { title, description } = useSiteMetadata();
  // const [aboutOpen, setAboutOpen] = useState(false)

  const themes = [
    'light-theme',
    'dark-theme',
    'color-theme',
    'grey-theme',
  ]

  // const [theme, setTheme] = useState(theme ? theme : themes[0])
  const [theme, setTheme] = useState(colorTheme ? colorTheme : 'light-theme')
  const [themeCount, setthemeCount] = useState(0)

  const handleTheme = (theme) => {
    setTheme(theme)
    passTheme(theme)
  }

  // useMemo(() => themeCount, [theme])

  // useEffect(() => {
  //   setTheme(themes[themeCount])
  // }, [themeCount])


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
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:image"
          content={'🐌'}
          // content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>

      <header>
        <nav className="nav-header">
          <div className="nav-group" >
            <ul className="nav-meta">
              <Link state={{theme}} to="/"><li id='logo'><span>studio</span> abdel am <span id="studio">meer</span></li></Link>
              <Link state={{theme}} to="/about"><li>about</li></Link>
              <a href="mailto:hello@abdelammeer.com"><li id="contact">@</li></a>
            </ul>
            <ul className="nav-sites">
            <Link state={{theme}} to="/blog"><li className={`blog ${activeSite == 'blog' && 'border'}`}>blog</li></Link>
            <Link state={{theme}} to="/space"><li className={`space ${activeSite == 'space' && 'border'}`}>space</li></Link>
              <Link state={{theme}} to="/work"><li className={`work ${activeSite == 'work' && 'border'}`}>work</li></Link>
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
            ><button onClick={() => {
              setTheme('dark-theme')
              handleTheme('dark-theme')
              }}><img id="star" src={Star} alt="Dark Theme" /></button></motion.li>
            <motion.li
              // className={theme == 'light-theme' && 'active-button'}
              animate={theme == 'light-theme' ? "hover" : "default"}
              variants={ulHover}
            ><button onClick={() => {
              setTheme('light-theme')
              handleTheme('light-theme')
              }}><img id="sun" src={Sun} alt="Light Theme" /></button></motion.li>
              <motion.li
                // className={theme == 'grey-theme' && 'active-button'}
                animate={theme == 'grey-theme' ? "hover" : "default"}
                variants={ulHover}
              ><button onClick={() => {
                setTheme('grey-theme')
                handleTheme('grey-theme')
                }}><img id="cloud" src={Cloud} alt="Grey Theme" /></button></motion.li>
            <motion.li
              // className={theme == 'color-theme' && 'active-button'}
              animate={theme == 'color-theme' ? "hover" : "default"}
              variants={ulHover}
            >
              <button onClick={() => {
              setTheme('color-theme')
              handleTheme('color-theme')
              }}><img id="rainbow" src={Rainbow} alt="Color Theme" /></button>
            </motion.li>
          </motion.ul>
        </nav>
      </header>

      {children}

      {/* <div className="heightfill"></div> */}

      <nav className="nav-footer">
        <ul>
        {/* <div className="contact"> */}
          <li className="insta-link"><a href='https://www.instagram.com/abdelammeer/' target="blank">Instagram</a></li>
        {/* </div> */}

        {/* <div className="nav-links-footer"> */}
         {/* <li> <Link state={{theme}} to="/imprint">Imprint</Link></li>
          <li><Link state={{theme}} to="/privacy-policy">Privacy Policy</Link></li> */}
        {/* </div> */}
        </ul>
      </nav>


    </div>
  )
}

export default Layout;
