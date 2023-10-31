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

import '../styles/index.scss'

const AboutPage = () => {
//   const data = useStaticQuery(graphql`
//   query {
//   allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-page"}}}) {
//     edges {
//       node {
//         html
//         frontmatter {
//           title
//           anima_ona_image {
//             caption
//             image {
//               childImageSharp {
//                 gatsbyImageData
//               }
//             }
//           }
//           listedInfos {
//             column {
//               title
//               list {
//                 listElement {
//                   year
//                   title
//                   location
//                   link {
//                     link
//                     linkText
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
//   `)

  return (
    <div className="about-page">
      blogooo
    </div>
  )
}



export default AboutPage;

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