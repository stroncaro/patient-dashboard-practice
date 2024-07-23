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
    <div
      className="flex justify-center items-center fixed top-0 left-0 size-full bg-black bg-opacity-30 fade-in-fast"
      onClick={closeCallback}
    >
      <div
        className="rounded-xl shadow-xl bg-white slide-down-fast"
        onClick={handleContentClick}
      >
        <div className="flex justify-end items-center pl-6 pr-2 py-2 rounded-t-xl text-lg font-bold bg-primary text-white">
          {title && <h1>{title}</h1>}
          <button
            className="flex justify-center items-center size-6 ml-auto border rounded-xl border-white text-sm hover:bg-white hover:text-primary"
            onClick={closeCallback}
          >
            X
          </button>
        </div>
        <div className="px-6 py-4 text-black">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalBox;
