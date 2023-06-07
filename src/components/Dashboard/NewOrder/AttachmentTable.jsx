import { Button, Card, Typography } from "@material-tailwind/react";

import axios from "axios";
import React, { useState } from "react";

const AttachmentTable = ({ required_attachments }) => {

  
    const [fileList, setFileList] = useState({});
    const [fileSelectedList, setFileSelectedList] = useState([]);
    // file upload completed
    const [fileUploadCompleted, setFileUploadCompleted] = useState(false);
    

    const handleFileChange = (event,index) => {
     

        setFileList({...fileList, [index]: event.target.files[0]});
        if (event.target.files[0]) {
            setFileSelectedList([...fileSelectedList, index]);
          }
       
    };


    const handleUpload = async () => {
console.log(fileList)

        Object.keys(fileList).map(async (key) => {
           
            const formData = new FormData();
            formData.append("file", fileList[key]);
            try {
                const response = await axios.post(
                    "https://miftahaldaar.ratina.co/update_file",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        params: {
                            file_ext: 'pdf',
                        },
                    }
                );
                console.log(response.data);
                setFileUploadCompleted(true);
            } catch (error) {
                console.log(error);
            }
        });
          
        


    };
    
    const TABLE_HEAD_LEFT_HAND = [
        {
            text: "المرفق",
            
        },
        {
            text: "المستند",
         
        },
    ];

    return (
        <div className="flex flex-col gap-4">
        <Card className="overflow-auto h-full ">
            <table className="w-full min-w-max table-auto text-center">
                <thead>
                    <tr>
                        {TABLE_HEAD_LEFT_HAND.map((head, i) => (
                            <th key={i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <div className="flex flex-col gap-2">
                                    <span>{head?.text}</span>
                                 
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
              
                <tbody>
                    {Object.keys(required_attachments).map((attachmentName,index) => (
                        <tr key={attachmentName} className="text-center">
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {required_attachments[attachmentName]}
                                    <div>
                                    
                                        <input
                                            type="file"
                                            id={`file-upload-${index}`}
                                            name={`file-upload-${index}`}
                                            itemID={index}
                                            onClick={() => console.log(`Clicked on input field ${index}`)}
                                            onChange={(event) => {
                                                handleFileChange(event, index)
                                            }}
                                      
    className="hidden"
    
  />
                                        <label
                                          
                                          htmlFor={`file-upload-${index}`}
                                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer 
    ${
        fileSelectedList.includes(index)
         ? "bg-green-500" : ""
      }
      `}
    >
      { fileSelectedList.includes(index) ? "تم الاختيار" : "اضافة"}
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
            <div className="flex justify-end">
 
                <Button className=
                    {`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer
                    ${fileUploadCompleted ? "bg-green-500" : ""}
                    `}
                    onClick={handleUpload} 
                    disabled={fileUploadCompleted}
                >
                    {fileUploadCompleted ? "تم الرفع" : "إضافة مستند مطلوب"}
                
                </Button>


            </div></div>

    );
};

export default AttachmentTable;
