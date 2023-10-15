import {Button, Chip, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {AcmeLogo} from "../assets/AcmeLogo.jsx";
import { Link as RouterLink } from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import { AppContext } from './UserContextWrapper.jsx'
export default function Navegacion() {

    const {user, setUser} = useContext(AppContext);
    const [logged, setLogged] = useState(<></>);

    useEffect(() => {
    if (user === '') {
        setLogged(<>
            <NavbarItem className="hidden lg:flex">
                <RouterLink to={"/login"}>
                    <Chip color={"secondary"}>Login</Chip>
                </RouterLink>
            </NavbarItem>
            <NavbarItem>
                <RouterLink to={"/register"}>
                    <Chip color={"secondary"} variant={"flat"}>Sign up</Chip>
                </RouterLink>
            </NavbarItem>
        </>)
    } else {
            fetch(`${import.meta.env.VITE_API_URL}/api/users/` + user, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then(res => res.json())
                .then(json => {
                    setLogged(
                        <>
                            <Chip color={"success"}>Bienvenido, {json.data[0].name}</Chip>
                        </>
                    )
                })
                .catch(err => console.log(err));
    }
    }, []);

    const onClickLink = () => {}
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <AcmeLogo />
                <RouterLink to={"/"}><p className="font-bold text-inherit">JavePlatform</p></RouterLink>

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <RouterLink to={"/materiales"}>Material</RouterLink>
                </NavbarItem>
                <NavbarItem>
                    <RouterLink to={"/materias"}>Materia</RouterLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {logged}
            </NavbarContent>
        </Navbar>
    )
}