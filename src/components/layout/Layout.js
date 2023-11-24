import React, { useState } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";

import Projectlist from "../projectlist/projectlist";

import './layout.scss'

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [aboutOpen, setAboutOpen] = useState(false)


  return (
    <div className="layout">
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
              <li><Link to="/">@</Link></li>
            </ul>
            <ul className="nav-sites">
              <li id='blog'><Link to="/blog">blog</Link></li>
              <li id='space'><Link to="/space">space</Link></li>
              <li id='work'><Link to="/work">work</Link></li>
            </ul>
          </div>

          <ul className='color-modes'>
            <li><button>🌈</button></li>
            <li><button>💡</button></li>
          </ul>
        </nav>
      </header>

      <div>{children}</div>

      <div className="heightfill"></div>

      <div className="footer">
        <div className="contact">
          <div className="mail"><a href="mailto:platzhalter@gmail.com">mail adress</a></div>
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
