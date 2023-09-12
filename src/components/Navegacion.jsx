import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {AcmeLogo} from "../assets/AcmeLogo.jsx";
import {useContext} from "react";
import {PageContext} from "../App.jsx";
import Materiales from "./Materiales.jsx";
import Materias from "./Materias.jsx";
export default function Navegacion() {
    const { page, setPage } = useContext(PageContext);
    const ref = {
        "Material": <Materiales />,
        "Materia": <Materias />
    }
    const onClickLink = (e) => {
        setPage(ref[e.target.text]);
    }
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">JavePlatform</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#" onClick={onClickLink}>
                        Material
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" aria-current="page" color="foreground" onClick={onClickLink}>
                        Materia
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#" color="secondary">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="secondary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}