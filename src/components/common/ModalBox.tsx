import { MouseEventHandler, PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";


interface ModalBoxProps {
  title?: string;
  closeCallback: () => void;
}

const ModalBox: React.FC<PropsWithChildren<ModalBoxProps>> = ({ children, title, closeCallback }) => {
  
  useEffect(() => {
    function handleEscapeKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') closeCallback();
    }
    
    window.addEventListener('keydown', handleEscapeKeyDown);
    return () => { window.removeEventListener('keydown', handleEscapeKeyDown) }
  }, []);
  
  const handleContentClick: MouseEventHandler<HTMLDivElement> = (ev) => ev.stopPropagation();

  return ReactDOM.createPortal(
    <div className='modal-box-container' onClick={closeCallback}>
      <div className='modal-box' onClick={handleContentClick}>
        <div className='modal-box-header'>
          {title && <h1>{title}</h1>}
          <button onClick={closeCallback}>X</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalBox;
