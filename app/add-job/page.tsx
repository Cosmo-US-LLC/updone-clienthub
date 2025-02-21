"use client";
import dynamic from 'next/dynamic';
import useIsMobile from '../lib/hooks/useMobile';
import { Loader } from '../_components/ui/dashboard-loader';
const AddJobDesktop = dynamic(() => import('../_components/booking/desktop'), { ssr: false });
const BookingMobileScreen = dynamic(() => import('../_components/booking/mobile'), { ssr: false });

const Page = () => {
    const isMobile = useIsMobile();


    if (isMobile === true) {
        return (
            <div>
                <BookingMobileScreen />
            </div>
        );
    } else if (isMobile === false) {
        return (
            <div>
                <AddJobDesktop />
            </div>
        );
    } else {
        return (
            <Loader />
        )
    }
};

export default Page;
