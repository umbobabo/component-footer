/* eslint-disable id-match */
import React from 'react';
import { renderNewsletterLink, renderSocialListContent } from '../utils/helpers';

export default function SocialLinks(links, LinkComponent, i13n) {
  if (!links) {
    return null;
  }
  return (
    <div className="ec-footer__list ec-footer__list--social">
      <h4 className="ec-footer__header">Keep updated</h4>
      <ul className="list">{renderSocialListContent(links, LinkComponent, i13n)}</ul>
      {renderNewsletterLink(links, LinkComponent, i13n)}
    </div>
  );
}
