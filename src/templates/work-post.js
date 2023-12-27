import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

import '../styles/work.scss'

const WorkPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const myimage = getImage(post.frontmatter.cover?.fallbackImage)

  return (
    <Layout activeSite={'work'}>
      <div className="work-post">
        <div className='workpostcover'>

          <div className="cover-image">
            {/* <ImageSection type={"image"} content={myimage} columnStart={1} columnEnd={12} /> */}

            {/* <GatsbyImage
              image={myimage}
              alt={''}
            /> */}

            {/* <p className="caption">created by Kristian Vrhar on stable diffusion</p> */}

            <ImageSection type={"carousel"} content={post.frontmatter.cover?.images} columnStart={1} columnEnd={12} />

            {/* {
              post.frontmatter.cover?.images &&
              post.frontmatter.cover?.images.map((image) => {
                const myimg = getImage(image.imageFile)

                return (
                  <GatsbyImage
                    image={myimg}
                    alt={''}
                  />
                )
              })
            } */}

          </div>

          <div className="cover-title">
            <div><h2> {post.frontmatter.date} </h2></div>
            <div className="headline"><h1>{post.frontmatter.title}</h1></div>
            <div><h2> {post.frontmatter.type} </h2></div>
            {post.frontmatter?.collaborators &&
              <div className="collaborators"><h2>with {post.frontmatter?.collaborators} </h2></div>
            }
          </div>

        </div>

        <div className="work-post-content">
          <div className="description">
            <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              if (content.type == 'text-section') {
                return (
                  <TextSection content={content.text} columnStart={content.column_start} columnEnd={content.column_end} />
                )
              } else if (content.type == 'image-section') {
                return (
                  <ImageSection content={content} type={"grid"} columnStart={content.column_start} columnEnd={content.column_end} />
                )
              }
            })
          }
        </div>
      </div>

    </Layout>
  )
}



export default WorkPost;

export const pageQuery = graphql`
  query WorkPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        type
        date(formatString: "YYYY")
        templateKey
        cover {
          iframe
          fallbackImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          images {
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            videoFile {
              publicURL
            }
            caption
          }
          videoFile {
            publicURL
          }
        }
        collaborators
        Description
        variable_content {
          type
          column_end
          column_start
          text
          images {
            image {
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
              caption
            }
          }
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query BlogPostByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "YYYY")
//         title
//         description
//         variable_content {
//           type
//           columns
//           text
//           images {
//             image {
//               image {
//                 childImageSharp {
//                   gatsbyImageData
//                 }
//               }
//               caption
//             }
//           }
//         }
//         projectInfos
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
//           }
//         }
//       }
//     }
//   }
// `
