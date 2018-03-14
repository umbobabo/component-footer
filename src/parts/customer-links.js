/* eslint-disable id-match */
import React from 'react';
import { renderListOfLinks } from '../utils/helpers';

export default function CustomerLinks(links, config, LinkComponent, i13n) {
  if (!links) {
    return null;
  }
  return (
    <div className="ec-footer__list ec-footer__list--subs">
      <ul className="list">{renderListOfLinks(links, config, LinkComponent, i13n)}</ul>
    </div>
  );
}
