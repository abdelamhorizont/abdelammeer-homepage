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
        variable_content {
          reference_content {
            reference
            type
          }
          column_end
          column_start
          text
        }
      }
    }
    allMarkdownRemark {
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
`
