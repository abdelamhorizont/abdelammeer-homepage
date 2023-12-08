import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

import '../styles/blog.scss'

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const myimage = getImage(post.frontmatter.cover?.fallbackImage)

  return (
    <Layout>
      <div className="blog-post">
        <div className='blogpostcover'>

          <h2> {post.frontmatter.date} </h2>
          <h1 className="headline">{post.frontmatter.title}</h1>
          <h2> {post.frontmatter.type} </h2>

          <div className="cover-image">
            <GatsbyImage
              image={myimage}
              alt={''}
            />
            <p className="caption">created by Kristian Vrhar on stable diffusion</p>
          </div>
        </div>

        <div className="blog-post-content">
          <div className="description">
          <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              console.log(content.end);

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



export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        type
        date(formatString: "YYYY")
        templateKey
        cover {
          fallbackImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
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
