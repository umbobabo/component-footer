/* eslint-disable id-match */
/* eslint-disable camelcase */
import { createI13nNode } from 'react-i13n';
import React from 'react';
import Icon from '@economist/component-icon';
const iconSize = '48px';
export function targetIfNeeded({ internal }) {
  if (internal === false) {
    return { target: '_blank' };
  }
  return {};
}

function createI13nModel({ title, href }, i13n, { position }) {
  return ({
    tedl: {
      id: `${ title.replace(/ /g, '_').toLowerCase() }_footer-link`,
      module_id: i13n ? i13n.module.id : null,
      position,
      type: 'complementary',
      attributes: {
        name: title,
        destination: href,
      },
    },
  });
}

const I13nLink = createI13nNode('a', {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true,
});
export function renderListOfLinks(listOfLinks, {
  useIcons = false,
  iconColor = '#B6B6B6',
} = {}, i13n, { position }) {
  const Link = i13n ? I13nLink : 'a';
  return listOfLinks.map((link, index) => {
    let linkContents = link.title;
    if (useIcons) {
      linkContents = <Icon icon={link.meta} color={iconColor} size={iconSize} />;
    }
    if (link.internal === false) {
      return (
        <li className="list__item" key={index}>
          <Link
            className="ec-footer__link ec-footer__link--external"
            href={link.href}
            target="_blank"
            i13nModel={createI13nModel(link, i13n, { position: `${ position }.${ index + 1 }` })}
          >
            {linkContents}
          </Link>
        </li>
      );
    }
    return (
      <li className="list__item" key={index}>
        <Link
          className="ec-footer__link"
          href={link.href}
          key={index}
          i13nModel={createI13nModel(link, i13n, { position: `${ position }.${ index + 1 }` })}
        >
          {linkContents}
        </Link>
      </li>
    );
  });
}

export function renderSocialListContent(listOfLinks, i13n, { position }) {
  const allExceptMail = listOfLinks.filter(({ meta }) => meta !== 'mail');
  return renderListOfLinks(allExceptMail, { useIcons: true }, i13n, { position });
}

export function renderNewsletterLink(social, i13n, { position }) {
  const newsletter = social.filter(({ meta }) => meta === 'mail')[0] || null;
  if (!newsletter) {
    return [];
  }
  const Link = i13n ? I13nLink : 'a';
  return (
    <Link
      className="ec-footer__link ec-footer__subscribe-newsletter-link"
      href={newsletter.href} {...targetIfNeeded(newsletter)}
      i13nModel={createI13nModel(newsletter, i13n, { position })}
    >
      <Icon icon="mail"
        className="ec-footer__subscribe-newsletter-icon" color="#B6B6B6"
        size={iconSize}
      />
      {newsletter.title}
    </Link>
  );
}

export default function Footer({
  data = null, // eslint-disable-line
  quote = null,
  quoteNoMobile = false,
  i13n,
}) {
  if (quote) {
    const quoteParagraph = () => ({
      __html: quote, // eslint-disable-line
    });
    let quoteClassNames = [ 'ec-footer__quote' ];
    if (quoteNoMobile) {
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
  const listsOfLinks = data; // eslint-disable-line
  const currentYear = new Date().getFullYear();
  const content = (
    <div className="ec-footer__wrapper">
      <div className="ec-footer__menu">
        <div className="ec-footer__list ec-footer__list--subs">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.customer, {}, i13n, { position: 1 })}
          </ul>
        </div>
        <div className="ec-footer__list ec-footer__list--social">
          <h4 className="ec-footer__header">Keep updated</h4>
          <ul className="list">
            {renderSocialListContent(listsOfLinks.social, i13n, { position: 2 })}
          </ul>
          {renderNewsletterLink(listsOfLinks.social, i13n, { position: 3 })}
        </div>
        <div className="ec-footer__list ec-footer__list--economist">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.economist, {}, i13n, { position: 4 })}
          </ul>
        </div>
      </div>
      {quote}
      <div className="ec-footer__footnote">
        <div className="ec-footer__list ec-footer__list--footnote">
          <ul className="list">
            {renderListOfLinks(listsOfLinks.business, {}, i13n, { position: 5 })}
          </ul>
        </div>
        <p className="ec-footer__copyright">
          Copyright © The Economist Newspaper Limited {currentYear}. All rights reserved.
        </p>
      </div>
    </div>
  );
  if (i13n) {
    const I13nFooter = createI13nNode('footer', {
      isLeafNode: true,
      bindClickEvent: true,
      follow: true,
    });
    return (
      <I13nFooter className="ec-footer" i13nModel={i13n}>{content}</I13nFooter>
    );
  }
  return (
    <footer className="ec-footer">{content}</footer>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Footer.propTypes = {
    data: React.PropTypes.shape({ // eslint-disable-line
      customer: React.PropTypes.arrayOf(React.PropTypes.object),
      economist: React.PropTypes.arrayOf(React.PropTypes.object),
      social: React.PropTypes.arrayOf(React.PropTypes.object),
      business: React.PropTypes.arrayOf(React.PropTypes.object),
    }),
    quote: React.PropTypes.string,
    quoteNoMobile: React.PropTypes.bool,
    i13n: React.PropTypes.shape({
      module: React.PropTypes.shape({
        id: React.PropTypes.string,
        items: React.PropTypes.arrayOf(React.PropTypes.object),
        name: React.PropTypes.string,
        placement: React.PropTypes.string,
        sub_type: React.PropTypes.string,
        type: React.PropTypes.string,
      }),
    }),
  };
}
