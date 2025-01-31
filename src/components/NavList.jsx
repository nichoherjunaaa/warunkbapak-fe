import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const links = [
    { id: 1, url: '', text: "Beranda" },
    { id: 2, url: 'products', text: "produk" },
    { id: 3, url: 'orders', text: "pesanan" },
    { id: 4, url: 'checkout', text: "checkout" },

]
const NavList = () => {
    const user = useSelector(state => state.userState.user)
    return (
        <>
            <ul className="flex flex-col gap-2 md:flex-row md:gap-2">
                {links.map((link) => {
                    const { id, url, text } = link
                    if ((url === 'orders' || url === 'checkout') && !user) {
                        return null
                    }
                    return (
                        <li key={id}>
                            <NavLink className="capitalize" to={url}>
                                {text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default NavList