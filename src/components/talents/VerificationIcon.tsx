import React from 'react';

interface VerificationIconProps {
    id_is_verified: boolean;
    contact_is_verified: boolean;
    height: number;
    width: number;
}

const VerificationIconMobile: React.FC<VerificationIconProps> = ({ id_is_verified, contact_is_verified, height, width }) => {
    let src: string;

    if (id_is_verified && contact_is_verified) {
        src = '/images/home/verified.icon.svg';
    } else if (id_is_verified || contact_is_verified) {
        src = '/images/home/semi-verified-shield.svg';
    } else {
        src = '/images/home/not-verified-shield.svg';
    }

    return <img alt="verified-icon" height={height} width={width} src={src} />;
};

export default VerificationIconMobile;
