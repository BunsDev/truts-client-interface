import React, { useEffect } from 'react'
import cookie from 'cookie-cutter'
import { useRouter } from 'next/router'

const API = process.env.API

export default function Redirect() {

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    const router = useRouter()
    const slug = router.query.slug

    useEffect(() => {
        setCookie('target', slug, 1);
        window.location.href = `${API}/auth/discord`
    }, [slug])

    if (!slug) {
        return (
            <h1>

            </h1>
        )
    }

    return (
        <div>
            {

            }
        </div>
    )
}


