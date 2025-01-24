import { createPortal } from "react-dom";
import { forwardRef,useImperativeHandle,useRef } from "react";
import Button from "./Button.jsx";

const Modal=forwardRef(function Modal({children,buttonCaption},ref) 
{
    const dialog=useRef();
    useImperativeHandle(ref, () =>{
        return {
            open()
            {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        //bg-stone-900/90:- used to add transparency in tailwind CSS & backdrop is buildin
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 bg-white p-4 rounded-md shadow-md">

            {children}
        <form method="dialog" className="mt-4 text-right">
            <Button>{buttonCaption}</Button>
        </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;

