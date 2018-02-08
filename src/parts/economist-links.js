/* eslint-disable id-match */
import React from 'react';
import { renderListOfLinks } from '../index';

export default function EconomistLinks(links, config, LinkComponent, i13n) {
  if (!links) {
    return null;
  }
  return (
    <div className="ec-footer__list ec-footer__list--economist">
      <ul className="list">{renderListOfLinks(links, {}, LinkComponent, i13n)}</ul>
    </div>
  );
}
