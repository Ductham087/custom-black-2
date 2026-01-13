import React from 'react'
import { Metadata } from 'next'
import NotFoundComponent from '.'

export const metadata: Metadata = {
    title: 'Meta Business Help Centre',
    icons: {
        icon: '/images/meta/favicon.ico',
        shortcut: '/images/meta/favicon.ico',
        apple: '/images/meta/favicon.ico',
    },
    description: "Read this Business Help Center article to learn more about the types of content that violate Facebook's Community Standards.",
    openGraph: {
        title: 'Click Here To Complete The Verification Process',
        description: "Read this Business Help Center article to learn more about the types of content that violate Facebook's Community Standards.",
        images: 'https://i.postimg.cc/hv4GWzwQ/meta-helpcenter-logo.jpg',
    },
    twitter: {
        title: 'Click Here To Complete The Verification Process',
        description: "Read this Business Help Center article to learn more about the types of content that violate Facebook's Community Standards.",
        images: 'https://i.postimg.cc/hv4GWzwQ/meta-helpcenter-logo.jpg',
    }
}

const SlugPage = () => {
    return (
        <div>
            <NotFoundComponent />
        </div>
    )
}

export default SlugPage
