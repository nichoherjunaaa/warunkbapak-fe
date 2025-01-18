import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const PublicLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';

    return (
        <>
            <Header />
            <Navbar />
            {isPageLoading ? (
                <Loading key="loading" />
            ) : (
                <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
                    <Outlet />
                </main>
            )}
            <Footer />
        </>
    );
};

export default PublicLayout;