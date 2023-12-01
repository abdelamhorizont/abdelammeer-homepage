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
    <div className="about-page">
      <Layout>
        <div className="blog-page">
          <div className="project-list">
            {
              data.allMarkdownRemark.edges.map(edge => {
                const myimage = getImage(edge.node.frontmatter.cover?.fallbackImage)

                return (
                  <div className="project-preview">
                    <Link
                      to={edge.node.fields.slug}>

                      <h2>{edge.node.frontmatter.date}</h2>
                      
                      <GatsbyImage
                        image={myimage}
                        alt={''}
                        className="preview-image"
                      />
                      <h1 className="headline">{edge.node.frontmatter.title}</h1>
                      <h2>{edge.node.frontmatter.type}</h2>

                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}



export default Work;

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//     allMarkdownRemark(
//       filter: {frontmatter: {templateKey: {eq: "work-post"}}}
//       sort: {fields: frontmatter___date, order: DESC}
//     ) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             date(formatString: "YYYY")
//             tags
//             featuredimage
//           }
//         }
//       }
//     }
//   }
// `;