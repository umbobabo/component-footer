import React from 'react';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';

export default class Footer extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
      quote: React.PropTypes.string,
    };
  }
  targetIfNeeded({ internal }) {
    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  }
  renderListContent(array, { useIcons = false, iconColor = '#B6B6B6' } = {}) {
    return array.map((item) => {
      let linkContents = item.title;
      if (useIcons) {
        linkContents = <Icon icon={item.meta} color={iconColor} />;
      }
      const commonProps = {
        href: item.href,
        key: `${item.title}-${item.meta}-${item.internal}-${item.href}`
      };
      if (item.internal === false) {
        return (
          <a className="ec-footer__link ec-footer__link--external"
          {...commonProps} target="_blank"
          >{linkContents}</a>);
      }
      return <a className="ec-footer__link" {...commonProps}>{linkContents}</a>;
    });
  }
  renderSocialListContent(array) {
    const allExceptMail = array.filter(({ meta }) => meta !== 'mail');
    return this.renderListContent(allExceptMail, { useIcons: true });
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
        <Icon icon="mail" className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"/>
        {newsletter.title}
      </a>
    );
  }
  render() {
    let quote = null;
    if (this.props.quote) {
      /*eslint-disable */
      const dangerousInnerHTML = {
        __html: this.props.quote,
      };
      /*eslint-enable */
      quote = (
        <div className="ec-footer__quote">
          <p className="ec-footer__quote-paragraph" dangerouslySetInnerHTML={ dangerousInnerHTML } />
        </div>
      );
    }

    const context = this.props.data;
    return (
      <footer className="ec-footer">
        <div className="ec-footer__wrapper">
          <div className="ec-footer__menu">
            <div className="ec-footer__list ec-footer__list--subs">
              <List>
                {this.renderListContent(context.customer)}
              </List>
            </div>
            <div className="ec-footer__list ec-footer__list--social">
              <h4 className="ec-footer__header">Keep updated</h4>
              <List>
                {this.renderSocialListContent(context.social)}
              </List>
              {this.renderNewsletterLink(context.social)}
            </div>
            <div className="ec-footer__list ec-footer__list--economist">
              <List>
                {this.renderListContent(context.economist)}
              </List>
            </div>
          </div>
          {quote}
          <div className="ec-footer__footnote">
            <div className="ec-footer__list ec-footer__list--footnote">
              <List>
                {this.renderListContent(context.business)}
              </List>
            </div>
            <p className="ec-footer__copyright">
              Copyright © The Economist Newspaper Limited 2005. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
