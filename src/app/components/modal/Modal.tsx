"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    isClosable?: boolean;
    heightFull?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, isClosable = true, heightFull}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 md:py-[40px] py-[20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key="modal-content"
                        // className={`bg-[linear-gradient(130deg,_rgba(249,241,249,1)_0%,_rgba(234,243,253,1)_35%,_rgba(237,251,242,1)_100%)] w-full max-w-lg mx-4 md:mx-0 shadow-lg px-[20px] py-[20px] rounded-[16px] overflow-y-scroll flex flex-col ${heightFull ? 'h-full' : ''}`}
                        className={`bg-[white] w-full max-w-lg mx-4 md:mx-0 shadow-lg px-[20px] py-[20px] rounded-lg overflow-y-scroll flex flex-col ${heightFull ? 'h-full' : ''}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between ${isClosable && title ? 'mb-[15px]' : ''}`}>
                            {
                                title ? (
                                    <h2 className="font-bold text-[#0A1317] text-[15px] flex items-center justify-center">{title}</h2>
                                ) : (
                                    // <div
                                    //     className="w-[10px] h-[20px] cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
                                    // >
                                    //     <img src="/images/meta/back.svg" className="w-[100%] h-[100%]" alt="close" />
                                    // </div>
                                    <></>
                                )
                            }
                            {
                                isClosable ? (
                                    <div
                                        className="w-[20px] h-[20px] cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
                                        onClick={onClose}
                                    >
                                        <img src="/images/modal/close.svg" className="w-[15px] h-[15px]" alt="close" />
                                    </div>
                                ) : null
                            }
                        </div>

                        {/* Content */}
                        <div className="flex-1">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
