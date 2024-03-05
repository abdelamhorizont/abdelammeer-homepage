import React, { useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

import Layout from "../components/layout/Layout";
import { ProjectPreview } from '../components/project/projectPreview';

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <div className="index-page">
        <div className="project-list">
          {
            frontmatter.variable_content.map(content => {
              if (content.type == "reference-section") {
                return (
                  <>
                    {
                      content.reference_section_type == "blog" ?
                        <div className="blog-section" style={{ gridColumn: content.column_start + "/" + content.column_end}}> 
                          {content.references?.map(node => {
                            const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'blog-post').filter(edge => edge.node.frontmatter.title_section?.title == node.reference)[0]
                            return (
                              <ProjectPreview content={project?.node} />
                            )
                          })}
                        </div>

                        :

                        content?.reference_section_type == "space" ?
                          <div className="space-section" style={{ gridColumn: content.column_start + "/" + content.column_end}}>
                            {content?.references?.map(node => {
                              const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'space-post').filter(edge => edge.node.frontmatter.title_section?.title == node.reference)[0]
                              return (
                                <ProjectPreview content={project.node} type={'iframe'} />
                              )
                            })}
                          </div>

                          :
                          content.reference_section_type == "work" ?
                            <div className="work-section" style={{ gridColumn: content.column_start + "/" + content.column_end}}>
                              <div className="project-list">
                                {content.references?.map(node => {
                                  const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey == 'work-post').filter(edge => edge.node.frontmatter.title_section?.title == node.reference)[0]
                                  return (
                                    <ProjectPreview content={project.node} fullWidth={node.full_width} />
                                  )
                                })}
                              </div>
                            </div>
                            :
                            <div></div>
                    }
                  </>
                )
              }

            })
          }
        </div>


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
