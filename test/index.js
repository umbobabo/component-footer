import 'babel-polyfill';
import Footer from '../src';
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
      footer.find('.ec-footer__list--social .ec-footer__link').should.have.html(
        /* eslint-disable max-len */
        '<a class="ec-footer__link ec-footer__link--external" href="https://www.economist.com" target="_blank"><svg role="img" class="Icon Icon-facebook" fill="#B6B6B6" width="48px" height="48px"><title>facebook icon</title><use xlink:href="/assets/icons.svg#facebook"></use></svg></a>'
        /* eslint-enable max-len */
      );
    });

    it('renders with the supplied "business" content', () => {
      footer.find('.ec-footer__list--footnote .list').should.have.exactly(1).descendants('.list__item');
      footer.find('.ec-footer__list--footnote .ec-footer__link').should.have.text('Terms of Use');
    });

    it('should render with i13n props if provided', () => {
      /* eslint-disable camelcase */
      /* eslint-disable id-match */
      const footerProps = shallow(
        <Footer
          data={links}
          quote={quote}
          i13n={{
            module: {
              id: 'economist-footer',
              type: 'footer',
              sub_type: 'external-links',
              placement: 'footer',
              name: 'mainsite-footer',
              items: [],
            },
          }}
        />
      ).node.props;
      footerProps.isLeafNode.should.equal(true);
      footerProps.bindClickEvent.should.equal(true);
      footerProps.follow.should.equal(true);
      const i13nModel = footerProps.i13nModel;
      i13nModel.should.have.key('module');
      i13nModel.module.should.have.keys([ 'id', 'type', 'sub_type', 'placement', 'name', 'items' ]);
    });
  });
});
