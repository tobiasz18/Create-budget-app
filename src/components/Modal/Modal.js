import PropTypes from "prop-types";
import React from 'react';
import { createPortal } from 'react-dom';
import { Wrapper, Content, CloseIcon } from './Modal.css';
import { useHistory } from 'react-router-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children }) => {
  const history = useHistory();

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={back}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseIcon onClick={back}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,
    modalRoot);
};

Modal.propTypes = {
  children: PropTypes.any
};

export default Modal;