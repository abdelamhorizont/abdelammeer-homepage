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

          {<h2> 2022/2023 </h2>}

          <h1 className="headline">{post.frontmatter.title}</h1>

          {<h2> Seminar HfG Karlsruhe </h2>}

          <div className="cover-image">
            <GatsbyImage
              image={myimage}
              alt={''}
            />
            <p>created by Kristian Vrhar on stable diffusion</p>
          </div>
        </div>

        <div className="blog-post-content">
          <div className="description">
          <TextSection content={post.frontmatter.Description} columns={'2'} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              if (content.type == 'text-section') {
                return (
                  <TextSection content={content.text} columns={'2'} />
                )
              } else if (content.type == 'image-section') {
                return (
                  <ImageSection content={content} columns={content.columns} />
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
          column-start
          column-end
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
