import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addNewUser } from "@/utils/dataFetchingFunctions";

const AddNewUserModal = ({ openAddNewUser, handleOpenAddNewUser }) => {
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const username = form.username.value;
        const password = form.password.value;
        const role = form.role.value;

        const formData = new FormData();

        // formData.append("username", username);
        // formData.append("password", password);
        // formData.append("role", role);
        // formData.append("is_active", true);
        formData.append("username", "احمد");
        formData.append("password", "12233");
        formData.append("is_active", true);
        formData.append("role", "EMPLOYEE");
        console.log(formData);

        const headers = {
            "user-id": "1010",
            "auth-key": "sdofmasdmfasdmflkmasdf",
            ...formData.getHeaders(),
        };

        // Create user with data
        const creatingUser = await addNewUser(formData, headers);
        // Close Drawer
        handleOpenAddNewUser();
        console.log(data);
    };

    return (
        <Dialog open={openAddNewUser} handler={handleOpenAddNewUser} size="md">
            <div className="flex items-center justify-between">
                <DialogHeader>Add New User</DialogHeader>
                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpenAddNewUser} />
            </div>

            <form action="" onSubmit={handleFormSubmit}>
                <DialogBody divider>
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="username" size="md" label="Username" required />
                        <Input name="password" size="md" label="Password" type="password" required />
                        <Input name="role" size="md" label="Role" required />
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-between">
                    <Button type="submit" variant="gradient" color="green">
                        Add User
                    </Button>
                    <Button variant="outlined" color="red" onClick={handleOpenAddNewUser}>
                        Close / إغلاق
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
};

export default AddNewUserModal;
