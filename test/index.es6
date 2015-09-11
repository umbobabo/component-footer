import Footer from '../index.es6';
import React from 'react/addons';

describe(`A Footer`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Footer.should.be.a('function').and.respondTo('render');
    });
    it('renders a React element', () => {
      React.isValidElement(<Footer/>).should.equal(true);
    });
  });
});
