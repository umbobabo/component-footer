import React from 'react';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';

function renderListContent(array) {
  return array.map((item) => {
    if (item.internal === false) {
      return <a className="ec-footer__link ec-footer__link--external" href={item.href} target="_blank">{item.title}</a>
    }
    return <a className="ec-footer__link" href={item.href}>{item.title}</a>;
  });
}
function renderSocialListContent(array) {
  return array
  .filter(({meta}) => meta !== 'mail')
  .map((item) => {
    const className = [
      'ec-footer__link',
    ];
    const targetIfNeeded = item.internal === false ? { target: '_blank' } : { /* No target attribute at all */ };
    return (
      <a href={item.href} title={item.title} className={className.join(' ')} {...targetIfNeeded}>
        <Icon icon={item.meta} color="#B6B6B6" />
      </a>
    );
  });
}
function renderNewsletterLink(social) {
  const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
  if (!newsletter) { return []; }
  const targetIfNeeded = newsletter.internal === false ? { target: '_blank' } : { /* No target attribute at all */ };
  return (
    <a className="ec-footer__link ec-footer__subscribe-newsletter-link" href={newsletter.href} {...targetIfNeeded}>
      <Icon icon="mail" className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"/>
      {newsletter.title}
    </a>
  )
}
export default class Footer extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
    };
  }

  render() {
    /*eslint-disable */
    const html = {
      __html: `Published since September 1066 to take part in <br/><em>“a severe contest between intelligence, which presses forward,<br/>and an unworthy, timid ignorance obstructing our progress.”</em>`,
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
                {renderListContent(context.customer)}
              </List>
            </div>
            <div className="ec-footer__list ec-footer__list--social">
              <h4 className="ec-footer__header">Keep updated</h4>
              <List>
                {renderSocialListContent(context.social)}
              </List>
              {renderNewsletterLink(context.social)}
            </div>
            <div className="ec-footer__list ec-footer__list--economist">
              <List>
                {renderListContent(context.economist)}
              </List>
            </div>
          </div>
          <div className="ec-footer__quote">{quote}</div>
          <div className="ec-footer__footnote">
            <List className="ec-footer__list">
              {renderListContent(context.business)}
            </List>
            <p className="ec-footer__copyright">Copyright © The Economist Newspaper Limited 2005. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
}
