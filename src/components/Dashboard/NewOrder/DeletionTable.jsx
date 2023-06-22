import { Card, IconButton, Typography } from "@material-tailwind/react";
import { BsTrash } from "react-icons/bs";

const DeletionTable = () => {
    // Table Data Left Hand Side
    const TABLE_HEAD_LEFT_HAND = [
        "",
        {
            arabic: "البيان",
        },
        {
            arabic: "المبلغ",
        },
    ];

    const TABLE_ROWS_LEFT_HAND = [
        {
            attachment: "بنك التسليف",
            docsRequired: "1980",
        },
        {
            attachment: "بنك التسليف",
            docsRequired: "1980",
        },
    ];
    return (
        <Card className="overflow-auto h-full ">
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
                    {TABLE_ROWS_LEFT_HAND.map(({ attachment, docsRequired, progress, date }, index) => {
                        const isLast = index === TABLE_ROWS_LEFT_HAND.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index} className="text-center">
                                <td className={classes}>
                                    <IconButton variant="text" color="red">
                                        <BsTrash size={20} />
                                    </IconButton>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {attachment}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {docsRequired}
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

export default DeletionTable;
