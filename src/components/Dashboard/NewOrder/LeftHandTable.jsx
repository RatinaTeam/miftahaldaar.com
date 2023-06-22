import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const LeftHandTable = () => {
    // Table Data Left Hand Side
    const TABLE_HEAD_LEFT_HAND = [
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

    const TABLE_ROWS_LEFT_HAND = [
        {
            notes: "Waiting for ID",
            userEditor: "Khaild",
            progress: "مؤجل",
            date: "2023/06/12",
        },
        {
            notes: "Waiting for ID",
            userEditor: "Khaild",
            progress: "مؤجل",
            date: "2023/06/12",
        },
    ];
    return (
        <Card className="overflow-auto h-full">
            <table className="w-full min-w-max table-auto text-center">
                <thead>
                    <tr>
                        {TABLE_HEAD_LEFT_HAND.map((head, i) => (
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
                    {TABLE_ROWS_LEFT_HAND.map(({ notes, userEditor, progress, date }, index) => {
                        const isLast = index === TABLE_ROWS_LEFT_HAND.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {notes}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {userEditor}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {progress}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
};

export default LeftHandTable;
