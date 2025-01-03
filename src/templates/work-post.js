import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

import '../styles/work.scss'

const WorkPost = ({ data }) => {
  const { markdownRemark: post } = data;
  // const myimage = getImage(post.frontmatter.cover?.fallbackImage)
  // console.log(post.frontmatter.cover_image);

  return (
    <Layout activeSite={'work'}>
      <div className="work-post">

        <div className='postcover'>
          <div className="cover-image">
            <ImageSection type={"carousel"} content={post.frontmatter.cover_image} columnStart={1} columnEnd={12} />
          </div>

          {/* <div><h2> {post.frontmatter.title_section.date} </h2></div> */}
          <h2 className="year"> {post.frontmatter.title_section.date} </h2>
          <div className="project-description">
            <h1 className="headline">{post.frontmatter.title}</h1>
          </div>
          <h2 className="type"> {post.frontmatter.title_section.format} </h2>
          {post.frontmatter?.title_section.collaborators &&
            <div className="collaborators"><h3>with {post.frontmatter?.title_section.collaborators} </h3></div>
          }


          {/* <div>
            <div><h2> {post.frontmatter.title_section.format} </h2></div>
          </div> */}

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
        title_section {
          type
          format
          date(formatString: "YYYY")
          collaborators
          images {
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
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
        templateKey
        Description
        variable_content {
          type
          column_end
          column_start
          text
          images {
            caption
            type
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
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
