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

const WorkPage = ({ data }) => {
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
            frontmatter.variable_content?.map(content => {
              if (content.type == "reference-section") {
                return (
                  <>
                    {
                        <>
                          {content.references?.map((node) => {
                            // const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            const project = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.title == node.reference)[0]
                            // console.log(project?.node?.frontmatter?.title);
                            
                            return (
                              <motion.div
                                variants={item}
                                // clasName={'work post-link'}
                                className={project?.node?.frontmatter?.title_section?.type + ' post-link'}
                              >
                                <ProjectPreview content={project?.node} />
                              </motion.div>
                            )
                          })}
                        </>

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


export default WorkPage;

export const pageQuery = graphql`
  query WorkTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "work" } }) {
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

// import React, { useEffect } from "react";
// import { Link, graphql, useStaticQuery } from "gatsby";
// import { getImage, GatsbyImage } from "gatsby-plugin-image";
// import { motion, AnimatePresence } from "framer-motion"

// import Layout from "../components/layout/Layout";
// import { HTMLContent } from "../components/content/text-section";
// import { ProjectPreview } from '../components/project/projectPreview';

// // import '../styles/reset.css'
// // import '../styles/global.scss'
// // import '../styles/typo.scss'

// // import '../styles/index.scss'

// const Work = () => {
//   const data = useStaticQuery(graphql`
//     query {
//     allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-post"}}}) {
//       edges {
//         node {
//           frontmatter {
//             title
//             type
//             date(formatString: "YYYY")
//             collaborators
//             cover {
//               fallbackImage {
//                 childImageSharp {
//                   gatsbyImageData
//                 }
//               }
//             }
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
//     `)

//   return (
//     <Layout activeSite={'work'}>
//       <div className="work-page">
//         <div className="project-list">
//           {
//             data.allMarkdownRemark.edges.map(edge => {
//               return (
//                 <ProjectPreview content={edge.node} />
//               )
//             })
//           }
//         </div>
//       </div>
//     </Layout>
//   )
// }



// export default Work;
