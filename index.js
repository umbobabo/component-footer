'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _economistComponentList = require('@economist/component-list');

var _economistComponentList2 = _interopRequireDefault(_economistComponentList);

var _economistComponentIcon = require('@economist/component-icon');

var _economistComponentIcon2 = _interopRequireDefault(_economistComponentIcon);

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    _React$Component.apply(this, arguments);
  }

  Footer.prototype.targetIfNeeded = function targetIfNeeded(_ref) {
    var internal = _ref.internal;

    if (internal === false) {
      return { target: '_blank' };
    }
    return {};
  };

  Footer.prototype.renderListContent = function renderListContent(array) {
    return array.map(function (item) {
      if (item.internal === false) {
        return _react2['default'].createElement(
          'a',
          { className: 'ec-footer__link ec-footer__link--external', href: item.href, target: '_blank' },
          item.title
        );
      }
      return _react2['default'].createElement(
        'a',
        { className: 'ec-footer__link', href: item.href },
        item.title
      );
    });
  };

  Footer.prototype.renderSocialListContent = function renderSocialListContent(array) {
    var _this = this;

    return array.filter(function (_ref2) {
      var meta = _ref2.meta;
      return meta !== 'mail';
    }).map(function (item) {
      var className = ['ec-footer__link'];
      return _react2['default'].createElement(
        'a',
        _extends({ href: item.href, title: item.title, className: className.join(' ') }, _this.targetIfNeeded(item)),
        _react2['default'].createElement(_economistComponentIcon2['default'], { icon: item.meta, color: '#B6B6B6' })
      );
    });
  };

  Footer.prototype.renderNewsletterLink = function renderNewsletterLink(social) {
    var newsletter = social.filter(function (_ref3) {
      var meta = _ref3.meta;
      return meta === 'mail';
    })[0] || null;
    if (!newsletter) {
      return [];
    }
    return _react2['default'].createElement(
      'a',
      _extends({ className: 'ec-footer__link ec-footer__subscribe-newsletter-link', href: newsletter.href }, this.targetIfNeeded(newsletter)),
      _react2['default'].createElement(_economistComponentIcon2['default'], { icon: 'mail', className: 'ec-footer__subscribe-newsletter-icon', color: '#B6B6B6' }),
      newsletter.title
    );
  };

  Footer.prototype.render = function render() {
    /*eslint-disable */
    var html = {
      __html: 'Published since September 1843 to take part in <br/><em>“a severe contest between intelligence, which presses forward,<br/>and an unworthy, timid ignorance obstructing our progress.”</em>'
    };
    var quote = _react2['default'].createElement('p', { className: 'ec-footer__quote-paragraph', dangerouslySetInnerHTML: html });
    /*eslint-enable */

    var context = this.props.data;
    return _react2['default'].createElement(
      'footer',
      { className: 'ec-footer' },
      _react2['default'].createElement(
        'div',
        { className: 'ec-footer__wrapper' },
        _react2['default'].createElement(
          'div',
          { className: 'ec-footer__menu' },
          _react2['default'].createElement(
            'div',
            { className: 'ec-footer__list ec-footer__list--subs' },
            _react2['default'].createElement(
              _economistComponentList2['default'],
              null,
              this.renderListContent(context.customer)
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ec-footer__list ec-footer__list--social' },
            _react2['default'].createElement(
              'h4',
              { className: 'ec-footer__header' },
              'Keep updated'
            ),
            _react2['default'].createElement(
              _economistComponentList2['default'],
              null,
              this.renderSocialListContent(context.social)
            ),
            this.renderNewsletterLink(context.social)
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ec-footer__list ec-footer__list--economist' },
            _react2['default'].createElement(
              _economistComponentList2['default'],
              null,
              this.renderListContent(context.economist)
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ec-footer__quote' },
          quote
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ec-footer__footnote' },
          _react2['default'].createElement(
            'div',
            { className: 'ec-footer__list ec-footer__list--footnote' },
            _react2['default'].createElement(
              _economistComponentList2['default'],
              null,
              this.renderListContent(context.business)
            )
          ),
          _react2['default'].createElement(
            'p',
            { className: 'ec-footer__copyright' },
            'Copyright © The Economist Newspaper Limited 2005. All rights reserved.'
          )
        )
      )
    );
  };

  _createClass(Footer, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        data: _react2['default'].PropTypes.object
      };
    }
  }]);

  return Footer;
})(_react2['default'].Component);

exports['default'] = Footer;
module.exports = exports['default'];