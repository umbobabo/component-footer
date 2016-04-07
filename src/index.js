import React from 'react';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';
const iconSize = '38px';
export default class Footer extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.object, // eslint-disable-line id-blacklist
      quote: React.PropTypes.string,
      quoteNoMobile: React.PropTypes.bool,
    };
  }
  targetIfNeeded({ internal }) {
    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  }
  renderListOfLinks(listOfLinks, { useIcons = false, iconColor = '#B6B6B6' } = {}) {
    return listOfLinks.map((link, index) => {
      let linkContents = link.title;
      if (useIcons) {
        linkContents = <Icon icon={link.meta} color={iconColor} size={iconSize} />;
      }
      if (link.internal === false) {
        return (
          <a
            className="ec-footer__link ec-footer__link--external"
            href={link.href}
            key={index}
            target="_blank"
          >
            {linkContents}
          </a>
        );
      }
      return (
        <a className="ec-footer__link" href={link.href} key={index}>
          {linkContents}
        </a>
      );
    });
  }
  renderSocialListContent(listOfLinks) {
    const allExceptMail = listOfLinks.filter(({ meta }) => meta !== 'mail');
    return this.renderListOfLinks(allExceptMail, { useIcons: true });
  }
  renderNewsletterLink(social) {
    const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
    if (!newsletter) {
      return [];
    }
    return (
      <a className="ec-footer__link ec-footer__subscribe-newsletter-link"
        href={newsletter.href} {...this.targetIfNeeded(newsletter)}
      >
        <Icon icon="mail"
          className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"
          size={iconSize}
        />
        {newsletter.title}
      </a>
    );
  }
  render() {
    let quote = null;
    if (this.props.quote) {
      const quoteParagraph = () => ({
        __html: this.props.quote, // eslint-disable-line
      });
      let quoteClassNames = [ 'ec-footer__quote' ];
      if (this.props.quoteNoMobile) {
        quoteClassNames = quoteClassNames.concat([ 'ec-footer__quote--no-mobile' ]);
      }
      /* eslint-disable react/no-danger */
      quote = (
        <div className={quoteClassNames.join(' ')}>
          <p
            className="ec-footer__quote-paragraph"
            dangerouslySetInnerHTML={quoteParagraph()}
          />
        </div>
      );
      /* eslint-enable react/no-danger */
    }

    const listsOfLinks = this.props.data;
    const currentYear = new Date().getFullYear();
    return (
      <footer className="ec-footer">
        <div className="ec-footer__wrapper">
          <div className="ec-footer__menu">
            <div className="ec-footer__list ec-footer__list--subs">
              <List>
                {this.renderListOfLinks(listsOfLinks.customer)}
              </List>
            </div>
            <div className="ec-footer__list ec-footer__list--social">
              <h4 className="ec-footer__header">Keep updated</h4>
              <List>
                {this.renderSocialListContent(listsOfLinks.social)}
              </List>
              {this.renderNewsletterLink(listsOfLinks.social)}
            </div>
            <div className="ec-footer__list ec-footer__list--economist">
              <List>
                {this.renderListOfLinks(listsOfLinks.economist)}
              </List>
            </div>
          </div>
          {quote}
          <div className="ec-footer__footnote">
            <div className="ec-footer__list ec-footer__list--footnote">
              <List>
                {this.renderListOfLinks(listsOfLinks.business)}
              </List>
            </div>
            <p className="ec-footer__copyright">
              Copyright © The Economist Newspaper Limited {currentYear}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
