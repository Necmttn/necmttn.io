import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { injectIntl, IntlFormat, InjectedIntlProps } from 'react-intl';

import logo from '../../content/img/x-tech-logo.svg';
import t from '../../content/i18n';
import TextScramble from '../TextScrabble';

const StyledSplash = styled.section`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 70px;
  width: auto;
  background-color: #ffffff;

  .hey {
    min-width: 100px;
  }

  .logo {
    width: 200px;
    padding: 20px;
  }

  .intro {
    width: 100vw;
    min-height: 802px;
    background-size: auto;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;

    .content {
      position: absolute;
      top: 242px;
      left: 96px;
      max-width: 45vw;
      @media (max-width: 768px) {
        max-width: 60vw;
      }
      h2 {
        line-height: 30px;
      }
      a {
        border-bottom: 3px solid #9dffc8;
        text-decoration: none;
        color: #000;
      }
    }
  }

  .intro > .intro-title {
    position: absolute;
    top: 242px;
    left: 96px;
    font-family: Cabin;
    font-size: 64px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 0;
  }
`;

export interface SplashProps {
  bg: String;
}

class Splash extends React.Component<SplashProps & InjectedIntlProps, {}> {
  hey: React.RefObject<{}> | any;
  title: React.RefObject<{}> | any;
  constructor(props) {
    super(props);
    this.title = React.createRef();
    this.hey = React.createRef();
  }

  componentDidMount() {
    const hey = new TextScramble(this.hey.current);
    const title = new TextScramble(this.title.current);

    const heys = ['Hey', '你好', 'Merhaba', '¡Hola', 'привет', 'もしもし'];
    const titles = [
      this.props.intl.formatMessage({ id: 'general.splash.maker' }),
      this.props.intl.formatMessage({ id: 'general.splash.developer' }),
      this.props.intl.formatMessage({ id: 'general.splash.video' }),
      this.props.intl.formatMessage({ id: 'general.splash.photo' }),
      this.props.intl.formatMessage({ id: 'general.splash.mentor' }),
    ];

    let counterHey = 0;
    let counterTitle = 0;
    const nextHey = () => {
      hey.setText(heys[counterHey]).then(() => {
        setTimeout(nextHey, 800);
      });
      counterHey = (counterHey + 1) % heys.length;
    };

    const nextTitle = () => {
      title.setText(titles[counterTitle]).then(() => {
        setTimeout(nextTitle, 5000);
      });
      counterTitle = (counterTitle + 1) % titles.length;
    };

    nextTitle();
    nextHey();
  }

  render() {
    const { bg } = this.props;
    return (
      <StyledSplash>
        <div className="intro" style={{ backgroundImage: `url(${bg})` }}>
          <div className="content">
            <div className="intro-title">
              <h1 ref={this.hey}>Hey</h1>
              <h2>
                {t['general.splash.this_is']()}, {t['general.splash.who_am_i']()}{' '}
                <span ref={this.title} />
                <br />
              </h2>
            </div>
            <div className="intro-text">
              <p>
                {t['general.splash.where_i_am']()}
                {''}
                {t['general.splash.how_i_spent_time']()}{' '}
                <a href="/projects">{t['general.splash.web_apps']()}</a>
              </p>
              <p>
                {t['general.splash.open_source_1']()}{' '}
                <a href="https://github.com/necmttn">Github</a>{' '}
                {t['general.splash.open_source_2']()}
              </p>
              <p>
                {t['general.splash.sales_pitch_1']()}{' '}
                <a href="https://www.upwork.com/fl/necmttn">{t['general.splash.applications']()}</a>
                {'. '}
                {t['general.splash.sales_pitch_2']()}
              </p>
            </div>

            <div className="intro-invitation">
              <Link to="/contact">{t['general.splash.lets-chat']()}</Link>
            </div>
          </div>
        </div>
      </StyledSplash>
    );
  }
}

export default injectIntl(Splash);
