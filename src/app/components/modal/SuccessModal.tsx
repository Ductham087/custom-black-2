import React from 'react';
import Modal from './Modal';

interface SuccessModalProps {
    isOpendSuccess: boolean;
    onToggleSuccess: (value: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpendSuccess, onToggleSuccess }) => {

    const [isOpen, setIsOpen] = React.useState(isOpendSuccess);

    React.useEffect(() => {
        setIsOpen(isOpendSuccess);
    }, [isOpendSuccess]);

    const handleClose = () => {
        setIsOpen(false);
        onToggleSuccess(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Request has been sent"
            onClose={handleClose}
        >

            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <div>
                    <div className='rounded-[10px] overflow-hidden mb-[15px]'>
                        <img src="/images/meta/success.png" width="100%" alt="" />
                    </div>
                    <p className='text-[#9a979e] mb-[10px] text-[15px]'>Your request has been added to the processing queue. We will process your request within 24 hours. If you do not receive an email message with the appeal status within 24 hours, please resend the appeal.</p>
                    <a className='w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center transition-opacity duration-300' href="https://www.facebook.com">Return to Facebook</a>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto'>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
