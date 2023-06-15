import React from "react";
import styled from "styled-components";

import {ReactComponent as CloseIcon} from 'assets/close.svg';
import {ModalState} from "features/confirmation-modal/types";

const DialogModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({theme}) => theme.colors.contrastAccent};
  width: 95%;
  max-width: 407px;
  border-radius: 5px;
  overflow: hidden;
`;

const ModalTitle = styled.h2`
  margin: 0;
  padding: 10px 16px;
  background: ${({theme}) => theme.colors.modalBackground};
  color: ${({theme}) => theme.colors.dangerColor};
  font-size: 16px;
  display: flex;
  cursor: default;
  justify-content: space-between;

  svg {
    height: 20px;
    cursor: pointer;
  }
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  padding: 10px 16px;

`;

const SubmitButton = styled.div`
  margin-left: 10px;
  font-size: 14px;
  background: ${({theme}) => theme.colors.dangerColor};
  border-radius: 2px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.contrastAccent};
  padding: 5px 10px;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

const CancelButton = styled.div`
  text-decoration-line: underline;
  padding: 5px 10px;
  color: ${({theme}) => theme.colors.main};
  transition: opacity 0.2s ease-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 10px;
`;

interface confirmationModalProps {
    state: ModalState
    onSubmit: () => void
    onClose: () => void
}

export const ConfirmationModal: React.FC<confirmationModalProps> = ({state, onSubmit, onClose}) => {
    if (!state.isOpen) return null
    return (
        <DialogModal onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>
                    {state.title}
                    <CloseIcon onClick={onClose}/>
                </ModalTitle>
                <ModalText>{state.text}</ModalText>
                <ButtonWrapper>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
                </ButtonWrapper>
            </ModalContent>
        </DialogModal>
    );
};
