import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { setLightness } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { Helmet } from 'react-helmet';

import AuthorCard from '../components/AuthorCard';
import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import PostMDXContent from '../components/PostMDXContent';
import PostFullFooter from '../components/PostFullFooter';
import PostFullFooterRight from '../components/PostFullFooterRight';
import ReadNextCard from '../components/ReadNextCard';
import ProjectMeta from '../components/ProjectMeta';
import Subscribe from '../components/subsribe/Subscribe';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteHeader, SiteMain } from '../styles/shared';
import config from '../website-config';

const PostTemplate = css`
  .site-main {
    background #fff;
    padding-bottom: 4vw;
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
  align-items: center;
`;

export const PostFullHeader = styled.header`
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  max-width: 1040px;
  text-align: center;

  @media (max-width: 500px) {
    padding: 14vw 3vw 10vw;
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    font-size: 2.9rem;
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -2vw;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw;
    height: 600px;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    height: 350px;
  }
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

interface PageTemplateProps {
  pathContext: {
    slug: string;
    langKey: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    mdx: {
      code: {
        body: any;
      };
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        timeToRead: string;
        excerpt: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        tags: string[];
        meta: {
          length: string;
          techstack: {
            id: string;
            name: string;
            logo: {
              childImageSharp: {
                fixed: any;
              };
            };
          }[];
        };
        author: {
          id: string;
          name: string;
          bio: string;
          avatar: {
            children: {
              fixed: {
                src: string;
              };
            }[];
          };
        };
        teammembers: {
          id: string;
          bio: string;
          avatar: {
            children: {
              fixed: {
                src: string;
              };
            }[];
          };
        }[];
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: {
        node: {
          frontmatter: {
            title: string;
            timeToRead: number;
          };
          fields: {
            slug: string;
          };
        };
      }[];
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  id: string;
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  code: {
    body: any;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    title: string;
    date: string;
    tags: string[];
    meta: {
      length: string;
      techstack: string[];
      teammembers: string[];
    };
    author: {
      id: string;
      name: string;
      bio: string;
      avatar: {
        children: {
          fixed: {
            src: string;
          };
        }[];
      };
    };
  };
}

const PageTemplate: React.FunctionComponent<PageTemplateProps> = props => {
  const post = props.data.mdx;
  let width = '';
  let height = '';
  if (post.frontmatter.image) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.frontmatter.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && (
          <meta
            property="og:image"
            content={config.siteUrl + post.frontmatter.image.childImageSharp.fluid.src}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && (
          <meta
            name="twitter:image"
            content={config.siteUrl + post.frontmatter.image.childImageSharp.fluid.src}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        {/* <meta name="twitter:data1" content={post.frontmatter.author.id} /> */}
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper className={`${PostTemplate}`}>
        <header className={`${SiteHeader} ${outer}`}>
          <div className={`${inner}`}>
            <SiteNav {...props.pathContext} />
          </div>
        </header>
        <main id="site-main" className={`site-main ${SiteMain}`}>
          <div>
            {/* TODO: no-image css tag? */}
            <article className={`${PostFull} ${!post.frontmatter.image ? NoImage : ''}`}>
              {post.frontmatter.image && (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                  />
                </PostFullImage>
              )}
              <ProjectMeta project={post.frontmatter.meta} />
              <PostMDXContent body={post.code.body} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}

              <div className={`${outer}`}>
                <PostFullFooter className={`${inner}`}>
                  <AuthorCard author={post.frontmatter.author} />
                  <PostFullFooterRight authorId={post.frontmatter.author.id} />
                </PostFullFooter>
              </div>
            </article>
          </div>
        </main>

        {/* Links to Previous/Next posts */}
        <aside className={`read-next ${outer}`}>
          <div className={`${inner}`}>
            <ReadNextFeed>
              {props.data.relatedPosts && (
                <ReadNextCard tags={post.frontmatter.tags} relatedPosts={props.data.relatedPosts} />
              )}

              {/* {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />} */}
            </ReadNextFeed>
          </div>
        </aside>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query($slug: String, $primaryTag: String, $langKey: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mdx(fields: { slug: { eq: $slug }, langKey: { eq: $langKey } }) {
      excerpt
      timeToRead
      code {
        body
      }
      frontmatter {
        title
        # userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        meta {
          length
          techstack {
            id
            name
            logo {
              childImageSharp {
                fixed(quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          teammembers {
            id
            bio
            avatar {
              children {
                ... on ImageSharp {
                  fixed(quality: 100) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
        author {
          id
          name
          bio
          avatar {
            children {
              ... on ImageSharp {
                fixed(quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMdx(
      filter: {
        frontmatter: { layout: { eq: "project" }, tags: { in: [$primaryTag] }, draft: { ne: true } }
      }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
            langKey
          }
        }
      }
    }
  }
`;
