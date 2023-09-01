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
          <ul className="nav-meta">
            <li id="about-buttons">
              <Link className="rounded-button" to="/">about</Link>
              <Link className="rounded-button" to="/">@</Link>
            </li>
            <li className="rounded-button" id='logo'><Link to="/">abdelammeer</Link></li>
            <li className="rounded-button" id='color-mode'>
              <button>🌈</button>
              <button>💡</button>
            </li>
          </ul>

          <ul className="nav-sites">
            <li id='blog'><Link to="/blog/blog">garden</Link></li>
            {/* <li id='space'><Link to="/space/space"><span>s</span><span>p</span><span>a</span><span>c</span><span>e</span></Link></li> */}
            <li id='space'><Link to="/space/space">space</Link></li>
            <li id='work'><Link to="/work/work">work</Link></li>
          </ul>

        </nav>
      </header>

      <div>{children}</div>

      <div className="footer">
        <div className="contact">
          <div className="title"><h1>Logo</h1></div>
          <div className="adress"><h2>Strohberg 20, 70180 Stuttgart</h2></div>

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
