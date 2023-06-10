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
import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const OrderTimelineModal = ({ openAddUpdates, handleOpenAddUpdates, orderTimeline, setOpenAddUpdates }) => {
    const { userID } = useContext(AuthContext);
    const order_status_translations = {
        "PENDING": "معلق",
        "CANCELLED": "ملغى",
        "PARTIALLY_COMPLETED": "منجز جزئياً",
        "COMPLETED": "منجز",
        "ON_PROGRESS": "قيد التنفيذ",
        "DELAYED": "متأخر"
    }

    const [note, setNote] = useState("");
    
    const handleAddNotes =  () => {

        const formData = new FormData();
        formData.append("order_id", orderTimeline[0].order_id);
        formData.append("notes", note);
        try {
            axios.post("https://miftahaldaar.ratina.co/order_status/add_notes", formData
                , {
                    headers: {
                        "user-id": userID,
                        "auth-key": "sdofmasdmfasdmflkmasdf",
                    }
                });
    } catch (error) {
            console.log(error)
        }
        
        setOpenAddUpdates(false)
        setNote("")
        Swal.fire({
            icon: "success",
            title: "تم إضافة الملاحظة بنجاح",
            showConfirmButton: false,
            timer: 1500,
        });

    };


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

  console.log(orderTimeline)
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
                            {/* {
      id: 19,
      order_id: 1,
      emp_id: 1013,
      status: 'ON_PROGRESS',
      notes: 'This is a note',
      created_at: '2023-05-30 11:18:07'
    } */}
                            {orderTimeline.map(({
                                id,
                                order_id,
                                notes,
                                emp_id,
                                status,
                                created_at
                            }, index) => {
                                 
                                    const classes ="p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                   {notes}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                {emp_id}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order_status_translations[status]}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                {created_at}
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
                    <Textarea dir="rtl" label="اكتب الملاحظة"
                        value={note} 
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-between">
                <Button variant="gradient" color="green" onClick={handleAddNotes}>
                    تحديث
                </Button>
                <Button variant="outlined" color="red" onClick={handleOpenAddUpdates}>
                    إغلاق
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default OrderTimelineModal;
