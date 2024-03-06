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
    <Layout activeSite={'blog'}>
      <div className="blog-post">
        <div className='blogpostcover'>

          <h2 className="date"> {post.frontmatter.title_section.date} </h2>
        
          <div className="cover-image">
            <GatsbyImage
              image={myimage}
              alt={''}
            />
            <p className="caption">{post.frontmatter.cover?.caption}</p>
          </div>
          
          <h1 className="headline">{post.frontmatter.title_section.title}</h1>
          <h2 className="type"> {post.frontmatter.title_section.type} </h2>
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
                  <div style={{gridColumn: content.column_start + "/" + content.column_end}} className={`html-content`}>
                    <TextSection content={content.text} />
                  </div>
                )
              } else if (content.type == 'image-section') {
                return (
                  <div style={{gridColumn: content.column_start + "/" + content.column_end}} className={`html-content`}>
                  <ImageSection content={content} type={"grid"} columnStart={content.column_start} columnEnd={content.column_end} />
                  </div>
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
          caption
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
