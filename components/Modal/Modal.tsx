import React, {Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalContext } from './ModalContext'
import { ModalType } from '../Utils/enums'

interface ModalProps {
    children: JSX.Element
    openModal: boolean
    modalType?: ModalType
    onModalEnter: () => void
}


const Modal: React.FC<ModalProps> = ({children, openModal, modalType, onModalEnter}) => {

    const cancelButtonRef = useRef(null)

    const {hideAllModals} = useModalContext()

  return (
    <Transition.Root show={openModal} as={Fragment} beforeEnter={onModalEnter}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={hideAllModals}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center md:p-4 text-center items-end sm:items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`${modalType ? modalType : "bg-slate-50"} relative  overflow-hidden rounded-sm text-left shadow-xl sm:my-8 w-full sm:max-w-lg`}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal