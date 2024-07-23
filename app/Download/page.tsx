'use client'
import ClientD from './ClientD'
import { Suspense } from 'react';

const Page = () => {
    return (
        <>
         <Suspense fallback={`Wait...`}>
           <ClientD/>
         </Suspense>
        </>
    );
};

export default Page;
