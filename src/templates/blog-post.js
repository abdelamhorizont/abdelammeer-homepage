import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";
import { ProjectPreview } from '../components/project/projectPreview';

import '../styles/blog.scss'

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data;
  const myimage = getImage(post.frontmatter?.cover_image[0]?.imageFile)
  const [theme, setTheme] = useState(location.state?.theme || 'light-theme')

  const passTheme = (theme) => {
    setTheme(theme)
  }

  return (
    <Layout colorTheme={theme} passTheme={passTheme} activeSite={'blog'}>
    {/* <Layout activeSite={'blog'}> */}
      <div className="blog-post">

        <div className='postcover'>
          <h2 className="year"> {post.frontmatter.title_section.date} </h2>
          <div className="cover-image">
            {/* <GatsbyImage
              image={myimage}
              alt={''}
            /> */}
            {/* <ImageSection content={post.frontmatter?.cover_image[0]} /> */}
            <ImageSection content={post.frontmatter?.cover_image[0]} columnStart={1} columnEnd={12} />

            <p className="caption">{post.frontmatter.cover_image[0]?.caption}</p>
          </div>
          <div className="project-description">
            <h1 className="headline">{post.frontmatter.title}</h1>
          </div>
          <h2 className="type"> {post.frontmatter.title_section.format} </h2>
        </div>


        <div className="blog-post-content">
          <div className="description prom-text">
            <TextSection content={post.frontmatter.Description} />
          </div>

          {
            post.frontmatter?.variable_content?.map((content) => {
              // const gridStyle = {gridColumn: 4 + "/" + 9}
              const gridStyle = { gridColumn: content.column_start ? content.column_start + "/" + content.column_end : "4/11" }

              if (content.type == 'text-section') {
                return (
                  <div style={{ gridColumn: content.column_start ? content.column_start + "/" + content.column_end : "4/11" }} className={`text-section`}>
                    {content?.title &&
                      <h1 className="content-title">{content?.title}</h1>
                    }
                    <TextSection content={content.text} />
                  </div>
                )
              } else if (content.type == 'image-section') {
                return (
                  <div style={{ gridColumn: content.column_start ? content.column_start + "/" + content.column_end : "4/11" }} className={`image-section`}>
                    {content?.title &&
                      <h1 className="content-title">{content?.title}</h1>
                    }
                    <ImageSection content={content} type={content.column_start ? "grid" : "block"} />
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
          type
          format
          date(formatString: "YYYY")
        }
        title
        templateKey
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
        Description
        variable_content {
          type
          column_end
          column_start
          text
          title
          images {
            caption
            type
            iFrame_link                        
            imageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            newVideoFile {
              publicURL
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
