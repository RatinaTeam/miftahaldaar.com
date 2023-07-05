import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner, Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addNewUser } from "../../../utils/dataFetchingFunctions";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { user_roles_translations } from "../../../contexts/OtherContexts";

const AddNewUserModal = ({ openAddNewUser, handleOpenAddNewUser }) => {
    const [selectedRole, setSelectedRole] = useState("");
    const { userID, authKey } = useContext(AuthContext);
    const [loading, setLoading] = useState();
    const [failed, setFailed] = useState();

    const handleFormSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        console.log(form.role);
        const username = form.username.value;
        const password = form.password.value;
        const role = selectedRole;
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);
        formData.append("is_active", true);
        formData.append("role", role);
        const headers = {
            "user-id": userID,
            "auth-key": authKey,
        };

        // Create user with data
        const postUserToDB = async () => {
            // formData.append("role", document.getElementsByName("role").value);
            // console.log(document.getElementsByName("role").value);
            const creatingUser = await addNewUser(formData, headers);
            if (!creatingUser.data.status) {
                setFailed(creatingUser.data.reason);
                setLoading(false);
                return;
            }

            // Close Drawer
            setLoading(false);
            handleOpenAddNewUser();
        };
        postUserToDB();
    };

    return (
        <Dialog open={openAddNewUser} handler={handleOpenAddNewUser} size="md" dir="rtl">
            <div className="flex items-center justify-between">

                <div className="px-4"><XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpenAddNewUser} /></div>
                <DialogHeader>إضافة مستخدم جديد</DialogHeader>


            </div>

            <form action="" onSubmit={handleFormSubmit}>
                <DialogBody divider>
                    <div className="grid grid-cols-2 gap-4">
                        <Input dir="rtl" name="username" size="md" label="اسم المستخدم" required />
                        <Input dir="rtl" name="password" size="md" label="كلمة المرور" type="password" required />
                        {/* <Input dir="rtl" name="role" size="md" label="دور" required /> */}
                        <Select name="role" size="md" label="دور" required onChange={(new_value) => {
                            setSelectedRole(new_value);
                        }} >
                            {/* fetch from user_roles_translations object */}
                            {Object.keys(user_roles_translations).map((role) => (
                                <Option value={role}>{user_roles_translations[role]}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mt-3 text-red-300">{failed}</div>
                </DialogBody>
                <DialogFooter className="flex justify-between">
                    <Button
                        type="submit"
                        variant="gradient"
                        disabled={loading}
                        color="green"
                        className="flex items-center gap-2"
                    >
                        إضافة مستخدم جديد {loading && <Spinner />}
                    </Button>
                    <Button variant="outlined" color="red" onClick={handleOpenAddNewUser}>
                        إغلاق
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default AddNewUserModal;
