import { Card, Typography } from "@material-tailwind/react";
import { SearchField } from "../Shared/StyledComponents";

export default function OverDueOrders({ dueOrders }) {
    const TABLE_HEAD = [
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
    ];

    const TABLE_ROWS = dueOrders;

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
                            },
                            index
                        ) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
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
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {status}
                                        </Typography>
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
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </Card>
    );
}
