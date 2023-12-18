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

import '../styles/space.scss'

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
    <Layout>
      <div className="space-page">
        <div className="project-list">

          {
            data.allMarkdownRemark.edges.map(edge => {
              const myimage = getImage(edge.node.frontmatter.cover?.fallbackImage)

              return (
                <Link to={edge.node.fields.slug}>
                  <div className="project-preview">

                    <div className="project-text">
                      <h1 className="headline">{edge.node.frontmatter.title}</h1>
                      <h2>{edge.node.frontmatter.date}</h2>
                      <h2>{edge.node.frontmatter.type}</h2>

                      {edge.node.frontmatter?.collaborators &&
                        <h2 className="collaborators">with {edge.node.frontmatter?.collaborators} </h2>
                      }
                    </div>

                    <iframe src={edge.node.frontmatter.iframe} frameborder="0"></iframe>
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



export default Space;

