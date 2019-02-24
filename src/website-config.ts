export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  facebook?: string;
  twitter?: string;
  medium?: string;
  github?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
}

const config: WebsiteConfig = {
  title: 'Necmettin Karakaya',
  description: 'I build software to help business grow.',
  coverImage: 'img/blog-cover.jpg',
  logo: 'logo/nk-logo-white-200.png',
  lang: 'en',
  siteUrl: 'https://necmttn.io',
  facebook: 'https://www.facebook.com/necmettin.karayaka',
  twitter: 'https://twitter.com/necmttn',
  medium: 'https://medium.com/necmttn',
  github: 'https://github.com/necmttn',
  showSubscribe: true,
  mailchimpAction:
    'https://rocks.us19.list-manage.com/subscribe/post?u=3d422bed821565475dc0b4aff&amp;id=641fdd2880',
  mailchimpName: 'b_3d422bed821565475dc0b4aff_641fdd2880',
};

export default config;
