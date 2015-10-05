import Footer from '../index.es6';
import List from '@economist/component-list';
import Icon from '@economist/component-icon';
import React from 'react/addons';
import sinon from 'sinon';

describe(`A Footer`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Footer.should.be.a('function').and.respondTo('render');
    });
    it('renders a React element', () => {
      React.isValidElement(<Footer/>).should.equal(true);
    });
  });
  describe('Renders children as commanded', () => {
    const basicData = Object.freeze({
      customer: Object.freeze([]),
      economist: Object.freeze([]),
      social: Object.freeze([]),
      business: Object.freeze([]),
    });
    let footer;
    beforeEach(() => {
      footer = new Footer({ data: basicData });
    });
    it('Calls its renderListContent and renderSocialListContent with the correct parameters', () => {
      sinon.spy(footer, 'renderListContent');
      sinon.spy(footer, 'renderSocialListContent');

      footer.render();

      footer.renderListContent.called.should.equal(true);
      footer.renderSocialListContent.calledOnce.should.equal(true);

      footer.renderListContent.calledWith(basicData.customer).should.equal(true);
      footer.renderListContent.calledWith(basicData.economist).should.equal(true);
      footer.renderListContent.calledWith(basicData.business).should.equal(true);
      footer.renderSocialListContent.calledWith(basicData.social).should.equal(true);
    });
    ['renderListContent', 'renderSocialListContent'].forEach((func) => {
      describe(func, () => {
        it('Returns an array of <a> tags', () => {
          const links = footer[func]([{
            href: 'http://example.com/6',
            title: '6',
            meta: 'six',
          }]);
          links.length.should.equal(1);
          links[0].type.should.equal('a');
          links[0].props.href.should.equal('http://example.com/6');
          if (func === 'renderListContent') {
            links[0].props.children.should.equal('6');
          } else {
            links[0].props.children.type.should.equal(Icon);
            links[0].props.children.props.icon.should.equal('six');
          }
        });
        it('Adds target="_blank" to non-internal links', () => {
          const links = footer[func]([
            {
              href: 'http://example.com/6',
              title: '6',
              meta: 'six',
              internal: false,
            }, {
              href: 'http://example.com/6',
              title: '6',
              meta: 'six',
              internal: true,
            }
          ]);
          links[0].props.target.should.equal('_blank');
          links[1].props.should.not.have.property('target')
        });
      });
    });
  });
});
