import 'babel-polyfill';
import Footer from '../src';
import Icon from '@economist/component-icon';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
chai.use(chaiEnzyme()).should();

describe('Footer', () => {
  it('renders a React element', () => {
    React.isValidElement(<Footer />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let footer = null;
    const links = {
      customer: [
        {
          title: 'Subscribe',
          href: 'http://www.economistgroupmedia.com',
        },
      ],
      economist: [
        {
          title: 'Advertise',
          href: 'products/subscribe',
        },
      ],
      social: [
        {
          title: 'Facebook',
          meta: 'facebook',
          href: 'https://www.economist.com',
          internal: false,
        },
      ],
      business: [
        {
          title: 'Terms of Use',
          href: 'node/21013093',
        },
      ],
    };
    const quote = 'foo bar baz';
    beforeEach(() => {
      rendered = shallow(
        <Footer
          data={links}
          quote={quote}
        />
      );
      footer = rendered.find('.ec-footer');
    });

    it('renders a top level footer.ec-footer', () => {
      footer.should.have.tagName('footer');
      footer.should.have.className('ec-footer');
    });

    it('renders with the supplied "customer" content', () => {
      footer.find('.ec-footer__list--subs .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--subs .ec-footer__link').should.have.text('Subscribe');
    });

    it('renders with the supplied "economist" content', () => {
      footer.find('.ec-footer__list--economist .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--economist .ec-footer__link').should.have.text('Advertise');
    });

    it('renders <Icon /> with the supplied "social" content', () => {
      footer.find('.ec-footer__list--social .ec-footer__link').should.contain(
        <Icon
          icon="facebook"
          size="38px"
          color="#B6B6B6"
        />
      );
    });

    it('renders with the supplied "business" content', () => {
      footer.find('.ec-footer__list--footnote .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--footnote .ec-footer__link').should.have.text('Terms of Use');
    });
  });
});
