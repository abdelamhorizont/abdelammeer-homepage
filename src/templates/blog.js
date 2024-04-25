import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";
import { ProjectPreview } from '../components/project/projectPreview';

// import Tags from "../components/tags/tags";

// import '../styles/reset.css'
// import '../styles/global.scss'
// import '../styles/typo.scss'

// import '../styles/blog.scss'

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
      edges {
        node {
          frontmatter {
            title
            type
            date(formatString: "YYYY")
            cover {
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
    `)

  return (
    <Layout activeSite={'blog'}>
      <div className="blog-page">
        <div className="project-list">
          {
            data.allMarkdownRemark.edges.map(edge => {
              return (
                <ProjectPreview content={edge.node} />
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}


export default Blog;

// export const pageQuery = graphql`
//   query BlogPageTemplate {
//     allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
//       edges {
//         node {
//           frontmatter {
//             title
//             templateKey
//           }
//         }
//       }
//     }
//   }
// `

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
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
//             featuredimage
//           }
//         }
//       }
//     }
//   }
// `;

//old query (inside component)

// const data = useStaticQuery(graphql`
// query {
// allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-page"}}}) {
//   edges {
//     node {
//       html
//       frontmatter {
//         title
//         anima_ona_image {
//           caption
//           image {
//             childImageSharp {
//               gatsbyImageData
//             }
//           }
//         }
//         listedInfos {
//           column {
//             title
//             list {
//               listElement {
//                 year
//                 title
//                 location
//                 link {
//                   link
//                   linkText
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// }
// `)