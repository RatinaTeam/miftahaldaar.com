import { Button, Card, Typography } from "@material-tailwind/react";
import Container from "../widgets/Container";
import { SearchField } from "../Shared/StyledComponents";

export default function NewOrders({ handleOpenAddUpdates, newOrders }) {
    const TABLE_HEAD = [
        "",
        {
            arabic: "تاريخ الطلب",
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

    const TABLE_ROWS = newOrders;

    return (
        <Container>
            <Card className="overflow-auto h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, i) => (
                                <th key={i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <div className="flex flex-col gap-2">
                                        <span>{head?.arabic}</span>
                                        <span>{head?.english}</span>
                                    </div>

                                    {head.length !== 0 && <SearchField />}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            (
                                {
                                    order_date,
                                    rand_date = "NO DATA",
                                    order_type,
                                    customer_salary_amount,
                                    customer_phone,
                                    customer_name,
                                    id,
                                },
                                index
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                <Button
                                                    className="flex items-center gap-3"
                                                    onClick={handleOpenAddUpdates}
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
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </svg>
                                                    اضافة تحديث
                                                </Button>
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order_date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {rand_date}
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
        </Container>
    );
}
