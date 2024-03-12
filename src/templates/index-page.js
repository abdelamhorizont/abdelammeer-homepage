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
        <motion.ul className="project-list"
          initial="hidden"
          animate="visible"
          variants={page}>
          {
            frontmatter.variable_content.map(content => {
              if (content.type == "reference-section") {
                return (
                  <>
                    {
                      content.reference_section_type == "blog" ?
                        <motion.li className={`blog-section ${content.hero && 'full-width'}`}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={section}
                        >
                          {content.references?.map((node) => {
                            const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'blog-post').filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            return (
                              <motion.div
                                variants={item}>
                                <ProjectPreview content={project?.node} />
                              </motion.div>
                            )
                          })}
                        </motion.li>

                        :

                        content?.reference_section_type == "space" ?
                          <motion.div className={`space-section ${content.hero && 'full-width'}`}
                            initial="hidden"
                            whileInView="visible"
                            variants={section}
                            viewport={{ once: true }}
                          >
                            {content?.references?.map(node => {
                              const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'space-post').filter(edge => edge.node.frontmatter.title == node.reference)[0]
                              return (
                                <ProjectPreview content={project.node} type={'iframe'} />
                              )
                            })}
                          </motion.div>

                          :
                          content.reference_section_type == "work" ?
                            <motion.div className={`work-section ${content.hero && 'full-width'}`}
                              initial="hidden"
                              whileInView="visible"
                              variants={section}
                              viewport={{ once: true }}
                            >
                              <div className="project-list">
                                {content.references?.map(node => {
                                  const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'work-post').filter(edge => edge.node.frontmatter.title == node.reference)[0]
                                  return (
                                    <motion.div
                                      className={node.full_width && 'full-width'}
                                      variants={item}>
                                      <ProjectPreview content={project?.node} />
                                    </motion.div>
                                  )
                                })}
                              </div>
                            </motion.div>
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
      </div >
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
            full_width
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
            title_section {
              title
              type
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
            cover {
              iframe
              videoFile {
                publicURL
              }
              fallbackImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
              caption
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
