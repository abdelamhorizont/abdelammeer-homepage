import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

import Layout from "../components/layout/Layout";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <motion.div>
      <Layout>
        {/* cookie */}
      </Layout>
    </motion.div>
  )
}


export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
      }
    }
  }
`
