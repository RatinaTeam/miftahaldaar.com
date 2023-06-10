import { Button, Card, Typography } from "@material-tailwind/react";
import { SearchField } from "../Shared/StyledComponents";
import { Link } from "react-router-dom";

export default function AllOrders({ allOrders,handleOpenAddUpdates }) {
const order_status_translations = {
    "PENDING": "معلق",
    "CANCELLED": "ملغى",
    "PARTIALLY_COMPLETED": "منجز جزئياً",
    "COMPLETED": "منجز",
    "ON_PROGRESS": "قيد التنفيذ",
    "DELAYED": "متأخر"
  }



    const TABLE_HEAD = [
        {
            arabic: "",
        },
        {
            arabic: "الملاحظات",
        },
        {
            arabic: "الموظف",
        },
        {
            arabic: "حالة الطلب",
        },
        {
            arabic: "تاريخ إعادة المعالجة",
        },
        {
            arabic: "بنك الراتب",
        },
        {
            arabic: "رقم الحوال",
        },
        {
            arabic: "العميل",
        },
        {
            arabic: "نوع الطلب",
        },
        {
            arabic: "بطاقة تعريف",
        },
    ];

    const TABLE_ROWS = allOrders;

    return (
        <Card className="overflow-auto h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, i) => (
                            <th key={i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-3   ">
                                <div className="flex flex-col gap-2 ">
                                    <span>{head?.arabic}</span>
                                    <span>{head?.english}</span>
                                </div>
                                {(head?.arabic === "الموظف" ||
                                    head?.arabic === "حالة الطلب" ||
                                    head?.arabic === "العميل" ||
                                    head?.arabic === "نوع الطلب") && <SearchField />}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(
                        (
                            {
                                last_update_note,
                                customer_name,
                                status,
                                date_of_reprocessing = "NO DATA",
                                customer_salary_amount,
                                customer_phone,
                                order_type,
                                id,
                            },
                            index
                        ) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                
                                <tr key={index}>
                                   
                                    <td className={classes}>
                                    <Button
                         onClick={()=> handleOpenAddUpdates(id)}
                        color="green"
                        className="flex items-center gap-3 float-right"
                    >
                        
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        إضافة التحديث
                    </Button>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {last_update_note}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                    <Link to={`/dashboard/new_order?order_id=${id}`} key={index}>    <Typography variant="small" color="blue-gray" className="font-normal">
                                            {order_status_translations[status]}
                                        </Typography></Link>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {date_of_reprocessing}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer_salary_amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer_phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {customer_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {order_type}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {id}
                                        </Typography>
                                    </td>
                                    
                                    </tr>
                                
                            );
                        }
                    )}
                </tbody>
            </table>
        </Card>
    );
}
