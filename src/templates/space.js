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

import '../styles/space.scss'

const Blog = () => {
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
    <Layout>
      <div className="space-page">
        <div className="project-list">
          <div className="project-preview">

            <div className="project-text">
              <h1 className="headline">Ocean View</h1>
              <h2>2023</h2>
              {/* <h2>{edge.node.frontmatter.type}</h2>
              {edge.node.frontmatter?.collaborators &&
                <h2 className="collaborators">with {edge.node.frontmatter?.collaborators} </h2>
              } */}
            </div>

            <iframe src="https://ocean-view.netlify.app/" frameborder="0"></iframe>
          </div>
        </div>

      </div>
    </Layout>
  )
}



export default Blog;

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