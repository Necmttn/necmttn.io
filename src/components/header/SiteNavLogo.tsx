import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { css } from 'emotion';

import config from '../../website-config';

const SiteNavLogoStyles = css`
  flex-shrink: 0;
  display: block;
  margin-right: 24px;
  padding: 11px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.5px;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 36px;
  }
`;

interface SiteNavLogoProps {
  link: string;
  logo?: {
    childImageSharp: {
      fixed: any;
    };
  };
}

const SiteNavLogo: React.FunctionComponent<SiteNavLogoProps> = props => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        logo: file(relativePath: { eq: "logo/nk-logo-white-200.png" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={data => (
      <Link className={`${SiteNavLogoStyles} site-nav-logo`} to={props.link}>
        {console.log(data)}
        {data.logo ? (
          <img src={data.logo.childImageSharp.fixed.src} alt={config.title} />
        ) : (
          config.title
        )}
      </Link>
    )}
  />
);

export default SiteNavLogo;
