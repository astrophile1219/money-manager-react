import React from 'react'

const Validation = (email) => {
    if (email.trim()) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
    return false;
}

export default Validation