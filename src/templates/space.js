import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import { ProjectPreview } from '../components/project/projectPreview';
import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import Tags from "../components/tags/tags";

// import '../styles/reset.css'
// import '../styles/global.scss'
// import '../styles/typo.scss'

// import '../styles/space.scss'

const Space = () => {
  const data = useStaticQuery(graphql`
  query {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "space-post"}}}) {
    edges {
      node {
        frontmatter {
          title
          type
          date(formatString: "YYYY")
          collaborators
          iframe
          cover {
            iframe
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
    <Layout activeSite={'space'}>
      <div className="space-page">
        <div className="project-list">

          {
            data.allMarkdownRemark.edges.map(edge => {
              return (
                <ProjectPreview content={edge.node} type={"iframe"} />
              )
            })
          }

        </div>

      </div>
    </Layout>
  )
}



export default Space;

