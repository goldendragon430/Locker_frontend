import { Link, useLocation } from 'react-router-dom';
import LogoImg from '../../assets/img/logo.png'
import FullLogoImg from '../../assets/img/full_logo.png'
import { FiMenu } from "react-icons/fi";
import { useState } from 'react';
import { Button, Dropdown, Space } from "antd";



const Navbar = () => {
    let location = useLocation();
    const navs = [
        {
            name: "CREATE LOCK",
            path: "/"
        },
        {
            name: "LOCKS",
            path: "/liquidity_locks"
        },
        {
            name: "VESTING",
            path: "/token_locks"
        },
        {
            name: "ABOUT US",
            path: "/about"
        },
    ]

    const items = navs.map((nav, index) => ({
        label: <a href={`${nav.path}`}>{nav.name}</a>,
        key: index,
        value: nav,
    }));

    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const handleMenuToggle = () => {
        setIsMenuHidden(!isMenuHidden)
    }

    return (
        <div className='sticky top-0 z-50 w-full bg-dark2 shadow'>
            <div className='flex flex-row items-center mx-auto gap-2 justify-between px-2 lg:px-16  py-3'>
                <div className='flex flex-row  gap-6'>
                    <Link to="/" className='block'>
                        <img alt='icon' src={LogoImg} className=' object-contain h-12 min-h-fit w-12 min-w-fit' />
                    </Link>
                    <div className='hidden gap-6 items-center lg:flex '>
                        {navs.map((nav) => (
                            <Link key={nav.name} to={nav.path} className={`hover:text-light2 ${(location.pathname == nav.path) ? "text-light3 " : "text-light1"} font-monobold`}>
                                {nav.name}
                            </Link>
                        ))}
                    </div>

                </div>

                <div className='flex flex-row items-center gap-4'>
                    <Dropdown className="lg:hidden block" menu={{ items }}>
                        <Space>
                            <FiMenu className='text-light1' size={25} />
                        </Space>
                    </Dropdown>
                    <w3m-button />
                </div>
            </div>

        </div>
    );
};

export default Navbar;