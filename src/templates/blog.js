import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/blog.scss'

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
    `)

  // const { frontmatter } = data.allMarkdownRemark
  console.log(data.allMarkdownRemark)

  return (
    <div className="blog-page">
      <Layout>
        {
          data.allMarkdownRemark.edges.map(edge => {
            console.log(edge);
            return (
              <Link
              to={edge.node.fields.slug}>
                <h1>{edge.node.frontmatter.title}</h1>
              </Link>
            )
          })
        }
      </Layout>
    </div>
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