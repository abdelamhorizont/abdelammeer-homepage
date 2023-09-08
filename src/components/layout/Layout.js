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
            <li id='blog'><Link to="/blog">blog</Link></li>
            {/* <li id='space'><Link to="/space/space"><span>s</span><span>p</span><span>a</span><span>c</span><span>e</span></Link></li> */}
            <li id='space'><Link to="/space">space</Link></li>
            <li id='work'><Link to="/work">work</Link></li>
          </ul>

        </nav>
      </header>

      <div>{children}</div>

      <div className="footer">
      {/* <p>
         The Mediterranean Sea as a border, as a place, as a space - for wind, waves and ground, for journeys, for escape, for sea dwellers, cargo ships and narratives, for longing, for memories, for stagnation, for movement and currents.
         
         in this seminar we will take time to reflect, to remember, to read and write, draw and film, experiment on analogue and digital moving image — on a personal level then abstract and connect to global issues, deal with the possibilities to pinpoint a topic for individual or a collective work as well as a presentation method through projections on different materials with the aim visualize in time and space.

         We will read texts from ‚Undrowned‘, Black Feminist Lessons from Marine Mammals by Alexis Pauline Gumbs, listen to ‚Saying Water‘, a monologue by Roni Horn, follow investigations of Forensic Architecture and Migrant Journal, browse through geographic maps, charts and data sources. — and then we will go to the beach. I mean, we have to. We will go to southern france for a workshop and visit the Rencontres d’Arles. More on that later this afternoon.

         „If you happen to be in the ocean and you see someone breathing, what do you do? If you see someone like you, a mammal, but unlike you—not bound by boats and masks and land—you might wonder who they are, what they are doing, how do they do it. How do they live in salt and depth and motion? You very well might wonder.“ — Black Feminist Lessons from Marine Mammals by Alexis Pauline Gumbs,

         "So what do we mean when we say “water”? Ocean? The rain falling from the sky? The mineral water in the glass? Or ourselves, because our bodies are mostly made of water? Water is omnipresent and the origin of all life. But when we say «water», the water always connects us with something else. We mean reflections on the water or what we suspect beneath its surface. We mean travel memories, the habitat of plants and animals and the weather. We mean environmental disasters, water shortages and the drinking water trade. And we mean global economy, human rights and their violations in the Mediterranean. The water leads us to complex topics that affect culture, nature, politics, economy, body and mind." — Roni Horn

         “I see everything,” she says, as if it was a curse. Brilliant sunshine, clear blue skies. The sea is calm, framed by a piece of railing. Buzzing voices. A peaceful moment if it weren’t for the fact that the sea is standing upright, vertical, like a waterfall. A rush of images, twirling, upside down, jolting. People in the boat, in the water, screams, life jackets, emergency whistles. Fluorescent orange, geometrical shapes cast by the sun. There’s no horizon any more, no sky, no up or down, only deepness and nothing to hold on to. Even time’s flow comes to a halt, contracting into the brutal present. She is filming and speaking. To him, to herself, to us, perhaps. Floating legs in sweat pants, jeans, thronged together. A blouse with butterflies, it looks like their wings are flapping in the water. The snake-like belt of a coat, a crumpled-up plastic cup, a pack of cigarettes. Fuck you all! She speaks, she rages, and she films to beat being tired, being cold, the fact that help isn’t coming. To beat dying, just for something to remain. — Amel Alzakout
      </p> */}
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
