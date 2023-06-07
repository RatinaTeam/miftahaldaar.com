import { Card, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const AttachmentTable = ({ required_attachments }) => {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      // Handle file upload logic here
    };
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
                                    <div>
                                       
                                    <input
    type="file"
  
    onChange={handleFileChange}
    className="hidden"
    id="file-upload"
  />
  <label
    htmlFor="file-upload"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
    // onClick={() => document.getElementById('file-upload').click()}
  >
    اضافة
  </label>
                                           
                                        
    </div>
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {attachmentName}
                                </Typography>
                            </td>
                        </tr>
                        
                    ))}
                   
                </tbody>
            </table>
        </Card>
    );
};

export default AttachmentTable;
