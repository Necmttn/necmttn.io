import { graphql } from 'gatsby';
import * as React from 'react';
import { css } from 'emotion';
import Helmet from 'react-helmet';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
// import ChallengeCard from '../components/ChallengeCard';
import ProjectCard from '../components/ProjectCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import config from '../website-config';
import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from '../styles/shared';

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card:nth-child(6n + 1):not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content {
      flex: 0 1 357px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) h2 {
      font-size: 2.6rem;
    }

    .post-card:nth-child(6n + 1):not(.no-image) p {
      font-size: 1.8rem;
      line-height: 1.55em;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  }
`;

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
    langKey: string;
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
  };
}

export interface IndexProps {
  pageContext: {
    langKey: string;
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    header: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMdx: {
      edges: {
        node: PageContext;
      }[];
    };
  };
}

const IndexPage: React.FunctionComponent<IndexProps> = props => {
  const width = props.data.header.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
  const height = String(Number(width) / props.data.header.childImageSharp.fluid.aspectRatio);
  console.log(props);
  return (
    <IndexLayout langKey="en" className={`${HomePosts}`}>
      <Helmet>
        <html lang={config.lang} />
        <title>{`Projects - ${config.title}`}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Projects - ${config.title}`} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={config.siteUrl + props.data.header.childImageSharp.fluid.src}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Projects - ${config.title}`} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={config.siteUrl + props.data.header.childImageSharp.fluid.src}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
      </Helmet>
      <Wrapper>
        <header
          className={`${SiteHeader} ${outer}`}
          style={{
            backgroundImage: `url('${props.data.header.childImageSharp.fluid.src}')`,
          }}
        >
          <div className={`${inner}`}>
            <SiteHeaderContent>
              <SiteTitle>
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '120px' }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
            <SiteNav {...props.pageContext} isHome slug="/projects" />
          </div>
        </header>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {!props.data.allMdx
                ? null
                : props.data.allMdx.edges.map(post => {
                    return <ProjectCard key={post.node.fields.slug} post={post.node} />;
                  })}
            </div>
          </div>
        </main>
        {props.children}

        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    logo: file(relativePath: { eq: "logo/nk-logo-white-200.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/project.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { langKey: { eq: "en" } }
        frontmatter: { layout: { eq: "project" }, draft: { ne: true } }
      }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
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
                      src
                    }
                  }
                }
              }
            }
            meta {
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
            }
          }
          excerpt
          fields {
            layout
            slug
            langKey
          }
        }
      }
    }
  }
`;
