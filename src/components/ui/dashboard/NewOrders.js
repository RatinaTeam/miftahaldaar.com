import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
    "",
    {
        arabic: "تاريخ الطلب",
        english: "Order Date",
    },
    {
        arabic: "تاريخ إعادة المعالجة",
    },
    {
        arabic: "بنك الراتب",
        english: "Salary on bank",
    },
    {
        arabic: "رقم الحوال",
        english: "Phone",
    },
    {
        arabic: "العميل",
        english: "Client Name",
    },
    {
        arabic: "نوع الطلب",
        english: "Order Type",
    },
];

const TABLE_ROWS = [
    {
        orderDate: "16/09/2022",
        date: "16/10/2022",
        salaryOnBank: "600000",
        phone: "0501654412",
        clientName: "Ahmed",
        orderType: "unknown",
    },
    {
        orderDate: "21/11/2022",
        date: "21/12/2022",
        salaryOnBank: "450000",
        phone: "0551234567",
        clientName: "Mohammed",
        orderType: "Standard",
    },
    {
        orderDate: "03/02/2023",
        date: "03/03/2023",
        salaryOnBank: "550000",
        phone: "0569876543",
        clientName: "Sara",
        orderType: "Express",
    },
];

export default function NewOrders({ handleOpenAddUpdates }) {
    return (
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

                                {head.length !== 0 && (
                                    <input
                                        type="text"
                                        className="max-w-[100px] py-1 px-2 mt-2"
                                        placeholder="بحث / search"
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ orderDate, date, salaryOnBank, phone, clientName, orderType }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        <Button className="flex items-center gap-3" onClick={handleOpenAddUpdates}>
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
                                            اضافة تحديث <br />
                                            Add Updates
                                        </Button>
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
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {phone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {clientName}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {orderType}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}
