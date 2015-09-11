import React from 'react';
import clone from 'lodash.clone';
import defaults from 'lodash.defaults';

const defaultStyle = {
  text: {
    display: 'none',
  },
};
export default class Icon extends React.Component {

  static get propTypes() {
    return {
      type: React.PropTypes.string,
      style: React.PropTypes.any,
      children: React.PropTypes.any,
    };
  }

  render() {
    const values = clone(this.props);
    values.style = defaults(values.style || {}, defaultStyle);

    const props = {
      width: '100%',
      height: '100%',
      fill: '#000000',
    };

    const href = '/assets/icons.svg#' + this.props.type;
    const useTag = '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + href + '" />';
    return (
      <a {...values}>
        <svg
          {...props}
          role="img"
          className="Icon"
          dangerouslySetInnerHTML={{ __html: useTag }} />
      </a>
    );
  }
}
