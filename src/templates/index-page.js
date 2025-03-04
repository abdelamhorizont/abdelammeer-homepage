import React, { useEffect, useState, useMemo } from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion"

import Layout from "../components/layout/Layout";
import { ProjectPreview } from '../components/project/projectPreview';
import ImageSection from "../components/content/image-section";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'
import '../styles/space.scss'
import '../styles/blog.scss'
import '../styles/work.scss'

const IndexPage = ({ data, location }) => {
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
  const [theme, setTheme] = useState(location.state?.theme || 'light-theme')

  const passTheme = (theme) => {
    setTheme(theme)
  }

  useEffect(() => {
    setTheme(theme)
  }, [])

    useMemo(() => theme, [theme])


  return (
    <Layout colorTheme={theme} passTheme={passTheme}>
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
                            const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            // const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == ('blog-post' || 'work-post' || 'space-post')).filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            // console.log(project?.node?.frontmatter?.title);

                            return (
                              <motion.div
                                variants={item}
                                // clasName={'post-link'}
                                className={project?.node?.frontmatter?.title_section?.type + ' post-link'}
                              >
                                <ProjectPreview colorTheme={theme} content={project?.node} />
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

              if (content.type == "image-section") {
                return (
                  <div className="vibes-swiper">
                    <ImageSection type={"carousel"} content={content.images} columnStart={1} columnEnd={12} />
                  </div>
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
          images {
            caption
            type
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            newVideoFile {
              publicURL
            }
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
