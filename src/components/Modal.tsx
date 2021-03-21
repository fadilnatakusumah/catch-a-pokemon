import styled from "@emotion/styled";
import { useState } from "react"


const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  >.modal-backdrop{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }

  >.modal-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const WrapperModal = ({ children, ...props }: any): JSX.Element | null => (
    showModal ? (
      <ModalWrapper>
        <div className="modal-backdrop" onClick={onToggleModal}></div>
        <div {...props} className="modal-content">
          {children}
        </div>
      </ModalWrapper>
    ) : null
  )

  const onToggleModal = () => setShowModal(!showModal);

  return {
    WrapperModal,
    showModal,
    onToggleModal
  }
}

