import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const user = useSelector(state => state.userState.user)
    return (
        <header className="bg-neutral py-2 text-neutral-content">
            <div className="mx-auto max-w-6xl px-8 flex justify-self-auto sm:justify-end">
                {user ? (
                    <div className="flex gap-x-2 sm:gap-x-8 items-center">
                        <p className="text-xs sm:text-sm">Hello, {user.name}</p>
                    </div>
                ) : (
                    <div className="flex gap-x-6 justify-center items-center">
                        <Link to='/login' className="link link-hover text-xs sm:text-sm">
                            Sign In
                        </Link>
                        <Link to='/register' className="link link-hover text-xs sm:text-sm">
                            Create Account
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header