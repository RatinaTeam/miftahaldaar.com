import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Card,
    Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderTimelineModal = ({ openAddUpdates, handleOpenAddUpdates }) => {
    const TABLE_HEAD = [
        {
            arabic: "الملاحظات",
        },
        {
            arabic: "المستخدم",
        },
        {
            arabic: "حالة الطلب",
        },
        {
            arabic: "تاريخ",
        },
    ];

    const TABLE_ROWS = [
        {
            orderDate: "16/09/2022",
            date: "16/10/2022",
            salaryOnBank: "600000",
        },
        {
            orderDate: "21/11/2022",
            date: "21/12/2022",
            salaryOnBank: "450000",
        },
    ];
    return (
        <Dialog open={openAddUpdates} handler={handleOpenAddUpdates} size="md">
            <div className="flex items-center justify-between">
                <DialogHeader>تحديث الطلب</DialogHeader>
                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpenAddUpdates} />
            </div>
            <DialogBody divider>
                <Card className="overflow-auto h-full">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, i) => (
                                    <th key={i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <div className="flex flex-col gap-2">
                                            <span>{head?.arabic}</span>
                                            <span>{head?.english}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(
                                ({ orderDate, date, salaryOnBank, phone, clientName, orderType }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    Waiting for ID
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {orderDate}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {salaryOnBank}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </Card>
                <div className="grid gap-6 mt-5">
                    <Textarea label="اكتب الملاحظة" />
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-between">
                <Button variant="gradient" color="green" onClick={handleOpenAddUpdates}>
                    Add تحديث
                </Button>
                <Button variant="outlined" color="red" onClick={handleOpenAddUpdates}>
                    Close / إغلاق
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default OrderTimelineModal;
