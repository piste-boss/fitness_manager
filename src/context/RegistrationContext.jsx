import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
};

export const RegistrationProvider = ({ children }) => {
    const [registrationData, setRegistrationData] = useState({
        userInfo: {},
        signature: null,
        paymentMethod: null,
    });

    const updateUserInfo = (info) => {
        setRegistrationData((prev) => ({
            ...prev,
            userInfo: { ...prev.userInfo, ...info },
        }));
    };

    const saveSignature = (signatureDataUrl) => {
        setRegistrationData((prev) => ({
            ...prev,
            signature: signatureDataUrl,
        }));
    };

    const setPaymentMethod = (method) => {
        setRegistrationData((prev) => ({
            ...prev,
            paymentMethod: method,
        }));
    };

    const clearRegistration = () => {
        setRegistrationData({
            userInfo: {},
            signature: null,
            paymentMethod: null,
        });
    };

    return (
        <RegistrationContext.Provider
            value={{
                registrationData,
                updateUserInfo,
                saveSignature,
                setPaymentMethod,
                clearRegistration,
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
};
