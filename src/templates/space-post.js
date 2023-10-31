import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout/Layout";
import TextSection, { HTMLContent } from "../components/content/text-section";
import ImageSection from "../components/content/image-section";

// import '../styles/work-post.scss'

const SpacePost = ({ data }) => {
  // const { markdownRemark: post } = data;

  return (
    <Layout>

      {/* {
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
      } */}

    </Layout>
  )
}



export default SpacePost;

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
