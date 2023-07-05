import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import { signIn } from "../../utils/dataFetchingFunctions";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";


const Login = () => {
    const { setIsLoading, isLoading, setIsSignedInAlready,setUserID, setAuthKey,userRole,setUserRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/dashboard";
    const [error, setError] = useState(false);

    const handleSingin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const uid = e.target.uid.value;
        const password = e.target.password.value;
        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("password", password);

        const isSignedIn = await signIn(formData,uid);
      

        // If Login Failed

        if (isSignedIn.status !== true) {
            setIsLoading(false);
            setIsSignedInAlready(false);
            setError(true);
            return;
        }

        // If Logged in
        setUserID(uid);
        setAuthKey(isSignedIn.auth_key);
        setUserRole(isSignedIn.role);
        setIsSignedInAlready(true);
        setError(false);
        setIsLoading(false);
        navigate(from, { replace: true });
    };

    return (
        <div className="grid place-items-center h-screen" dir="rtl">
            <Card className="mx-auto w-full max-w-[24rem] ">
                <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white">
                    تسجيل الدخول
                    </Typography>
                </CardHeader>
                <form onSubmit={handleSingin}>
                    <CardBody className="flex flex-col gap-4">
                        <Input required label="معرف المستخدم" type="number" name="uid" size="lg" />
                        <Input required label="كلمة المرور" type="password" name="password" size="lg" />
                        <div className="-ml-2.5">
                            <Checkbox label="تذكرنى" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {error && <p className="text-sm text-red-600 font-medium mb-2">فشل في تسجيل الدخول ، حاول مرة أخرى</p>}
                        {isLoading ? (
                            <Button disabled variant="gradient" className="" fullWidth>
                                <Spinner className="mx-auto" />
                            </Button>
                        ) : (
                            <Button type="submit" variant="gradient" fullWidth>
                                الدخول
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
