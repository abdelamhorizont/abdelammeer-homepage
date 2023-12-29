import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

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
              videoFile {
                publicURL
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
              const myimage = getImage(edge.node.frontmatter.cover?.fallbackImage)
              return (
                <Link to={edge.node.fields.slug}>
                  <div className="project-preview">
                    <GatsbyImage
                      image={myimage}
                      alt={''}
                      className="preview-image"
                    />

                    <div className="project-text">
                      <h2>{edge.node.frontmatter.date}</h2>
                      <h1 className="headline">{edge.node.frontmatter.title}</h1>
                      <h2>{edge.node.frontmatter.type}</h2>
                      {edge.node.frontmatter?.collaborators &&
                        <h2 className="collaborators">with {edge.node.frontmatter?.collaborators} </h2>
                      }
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}



export default Work;
