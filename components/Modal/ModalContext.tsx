import React, { createContext, useContext, useState } from 'react';

interface ProviderProps {
  children: JSX.Element;
}

const initalValues = {
  hideAllModals: (): void => undefined,
  showLoginModal: (): void => undefined,
  showNewTaskModal: (): void => undefined,
  showEditTaskModal: (): void => undefined,
  showDeleteTaskModal: (): void => undefined,
  showCreateFolderModal: (): void => undefined,
  showUploadModal: (): void => undefined,
  showMarketModal: (): void => undefined,
  showReportModal: (): void => undefined,
  openLoginModal: false,
  openNewTaskModal: false,
  openEditTaskModal: false,
  openDeleteTaskModal: false,
  openCreateFolderModal: false,
  openUploadModal: false,
  openMarketModal: false,
  openReportModal: false,
};

const ModalContext = createContext(initalValues);

export const ModalContextProvider: React.FC<ProviderProps> = ({ children }) => {
  // TODO: need rework for multiple modals, implement some DRY principle

  // STATES
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState<boolean>(false);
  const [openDeleteTaskModal, setDeleteEditTaskModal] = useState<boolean>(false);
  const [openCreateFolderModal, setCreateFolderModal] = useState<boolean>(false);
  const [openUploadModal, setUploadModal] = useState<boolean>(false);
  const [openMarketModal, setMarketModal] = useState<boolean>(false);
  const [openReportModal, setReportModal] = useState<boolean>(false);

  // FUNCTION FOR OPENING EVERY MODAL

  const showLoginModal = () => {
    setOpenLoginModal(true);
  };

  const showNewTaskModal = () => {
    setOpenNewTaskModal(true);
  };

  const showEditTaskModal = () => {
    setOpenEditTaskModal(true);
  };

  const showDeleteTaskModal = () => {
    setDeleteEditTaskModal(true);
  };

  const showCreateFolderModal = () => {
    setCreateFolderModal(true);
  };

  const showUploadModal = () => {
    setUploadModal(true);
  };

  const showMarketModal = () => {
    setMarketModal(true);
  };

  const showReportModal = () => {
    setReportModal(true);
  };

  // HIDE ALL MODALS

  const hideAllModals = () => {
    setOpenLoginModal(false);
    setOpenNewTaskModal(false);
    setOpenEditTaskModal(false);
    setDeleteEditTaskModal(false);
    setCreateFolderModal(false);
    setUploadModal(false);
    setMarketModal(false);
    setReportModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        hideAllModals,
        openLoginModal,
        showLoginModal,
        showNewTaskModal,
        openNewTaskModal,
        showEditTaskModal,
        openEditTaskModal,
        openDeleteTaskModal,
        showDeleteTaskModal,
        openCreateFolderModal,
        showCreateFolderModal,
        openUploadModal,
        showUploadModal,
        showMarketModal,
        openMarketModal,
        showReportModal,
        openReportModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
