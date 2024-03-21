import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const AboutPage = () => {

  return (
    <div className="about-page">

    </div>
  )
}



export default AboutPage;

export const aboutPageQuery = graphql`
query AboutPageTemplate {
  markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;