import { useContext, useState } from "react";
import Container from "../widgets/Container";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
    const { userID,loggedUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogOut = () => {
        localStorage.removeItem("userID");
        window.location.href = "/";
    };


    return (
        <div className="mb-5 bg-blue-300 ">
            <Container>
                <nav className="flex items-center justify-between flex-wrap  shadow-sm py-2 px-3 ">
                    <div className="block lg:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-black hover:border-black"
                            onClick={handleMenuToggle}
                        >
                            <svg
                                className="fill-current h-3 w-3"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                {isMenuOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4 5h12v1H4V5zm0 4h12v1H4V9zm0 4h12v1H4v-1z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div
                        className={`${
                            isMenuOpen ? "block" : "hidden"
                        } w-full flex-grow lg:flex lg:items-center lg:w-auto`}
                    >
                        <div className="text-lg font-medium lg:flex-grow ">
                            <Link
                                to="/dashboard"
                                className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-700 mr-4 "
                            >
                                لوحة القيادة
                            </Link>
                            {(loggedUser === 1 || loggedUser === 2) && (<Link
                                to="users_list"
                                className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-700 "
                            >
                                المستخدمون
                            </Link>)}
                            <Button
                                onClick={handleLogOut}
                                className="block mt-4 lg:inline-block lg:mt-0 text-white bg-red-500"
                                style={{ marginLeft: '2rem' }}
                              
>
  تسجيل الخروج
</Button>
                        </div>
                    </div>
                    <div className="flex items-center flex-shrink-0 ">
                        <span className="font-semibold text-xl tracking-tight mr-4 border py-2 px-2 rounded-lg text-gray-800">
                      مفتاح الدار للخدمات العقارية
                        </span>
                    </div>
                </nav>
            </Container>
        </div>
    );
};

export default Header;
