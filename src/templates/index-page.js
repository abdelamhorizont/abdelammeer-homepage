import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion"

import Layout from "../components/layout/Layout";
import { ProjectPreview } from '../components/project/projectPreview';

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'
import '../styles/space.scss'
import '../styles/blog.scss'
import '../styles/work.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const page = {
    hidden: {
      scale: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  }

  const section = {
    hidden: {
      scale: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    transition: { duration: 1 },
  }

  return (
    <Layout>
      <div className="index-page">
        <motion.ul className="section-list"
          initial="hidden"
          animate="visible"
          variants={page}>
          {
            frontmatter.variable_content.map(content => {
              if (content.type == "reference-section") {
                return (
                  <>
                    {
                      content.reference_section_type == ("blog" || "work") ?
                        <>
                          {content.references?.map((node) => {
                            // const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == ('blog-post' || 'work-post' || 'space-post')).filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            console.log(project?.node?.frontmatter?.title);
                            
                            return (
                              <motion.div
                                variants={item}
                                // clasName={'post-link'}
                                className={project?.node?.frontmatter?.title_section?.type + ' post-link'}
                              >
                                <ProjectPreview content={project?.node} />
                              </motion.div>
                            )
                          })}
                        </>
                        :
                        <div></div>
                    }
                  </>
                )
              }

            })
          }
        </motion.ul>


        {/* cookie */}
      </div>
    </Layout>
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
          references {
            reference
            type
          }
          type
          reference_section_type
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
            templateKey
            title
            cover_image {
              caption
              iframe_link
              imageFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              videoFile {
                publicURL
              }
            }
            title_section {
              title
              type
              format
              date(formatString: "YYYY")
              images {
                imageFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            type
            date(formatString: "YYYY")
            Description
          }  
          fields {
            slug
          }
        }
      }
    }
  }
`
