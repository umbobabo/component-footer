import React from 'react';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';

export default class Footer extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
    };
  }
  targetIfNeeded({ internal }) {
    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  }
  renderListContent(array) {
    return array.map((item) => {
      if (item.internal === false) {
        return <a className="ec-footer__link ec-footer__link--external" href={item.href} target="_blank">{item.title}</a>
      }
      return <a className="ec-footer__link" href={item.href}>{item.title}</a>;
    });
  }
  renderSocialListContent(array) {
    return array
    .filter(({meta}) => meta !== 'mail')
    .map((item) => {
      const className = [
        'ec-footer__link',
      ];
      return (
        <a href={item.href} title={item.title} className={className.join(' ')} {...this.targetIfNeeded(item)}>
          <Icon icon={item.meta} color="#B6B6B6" />
        </a>
      );
    });
  }
  renderNewsletterLink(social) {
    const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
    if (!newsletter) { return []; }
    return (
      <a className="ec-footer__link ec-footer__subscribe-newsletter-link" href={newsletter.href} {...this.targetIfNeeded(newsletter)}>
        <Icon icon="mail" className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"/>
        {newsletter.title}
      </a>
    )
  }
  render() {
    /*eslint-disable */
    const html = {
      __html: `Published since September 1843 to take part in <br/><em>“a severe contest between intelligence, which presses forward,<br/>and an unworthy, timid ignorance obstructing our progress.”</em>`,
    }
    const quote = (
      <p className="ec-footer__quote-paragraph" dangerouslySetInnerHTML={html} />
    );
    /*eslint-enable */

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
          <div className="ec-footer__quote">{quote}</div>
          <div className="ec-footer__footnote">
            <List className="ec-footer__list">
              {this.renderListContent(context.business)}
            </List>
            <p className="ec-footer__copyright">Copyright © The Economist Newspaper Limited 2005. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
}
