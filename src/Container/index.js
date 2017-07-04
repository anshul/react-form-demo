import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const Container = props =>
  <s.Container>
    {props.children}
  </s.Container>;

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Container;
