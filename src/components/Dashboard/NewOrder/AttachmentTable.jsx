import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const AttachmentTable = ({ required_attachments }) => {
    console.log(required_attachments)
    // Table Data Left Hand Side
    const TABLE_HEAD_LEFT_HAND = [
        {
            arabic: "المرفق",
            english: "Attachment",
        },
        {
            arabic: "المستند",
            english: "Required Document",
        },
    ];

    const TABLE_ROWS_LEFT_HAND = [
        {
            attachment: "اضافة",
            docsRequired: "الهوية",
        },
        {
            attachment: "اضافة",
            docsRequired: "الهوية",
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
                    {Object.keys(required_attachments).map((attachmentName) => (
                        <tr key={attachmentName} className="text-center">
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {required_attachments[attachmentName]}
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {attachmentName}
                                </Typography>
                            </td>
                        </tr>
                        
                    ))}
                    {/* {required_attachments.map((items, index) => {
                        const isLast = index === required_attachments.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index} className="text-center">
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {items}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {items}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </Card>
    );
};

export default AttachmentTable;
