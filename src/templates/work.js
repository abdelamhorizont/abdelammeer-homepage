import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";
import { ProjectPreview } from '../components/project/projectPreview';

// import '../styles/reset.css'
// import '../styles/global.scss'
// import '../styles/typo.scss'

// import '../styles/index.scss'

const Work = () => {
  const data = useStaticQuery(graphql`
    query {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-post"}}}) {
      edges {
        node {
          frontmatter {
            title
            type
            date(formatString: "YYYY")
            collaborators
            cover {
              fallbackImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
    `)

  return (
    <Layout activeSite={'work'}>
      <div className="work-page">
        <div className="project-list">
          {
            data.allMarkdownRemark.edges.map(edge => {
              return (
                <ProjectPreview content={edge.node} />
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}



export default Work;
