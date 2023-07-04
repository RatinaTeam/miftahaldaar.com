import { Button, Card, IconButton, Typography } from "@material-tailwind/react";

import axios from "axios";
import React, { useContext, useState } from "react";
import { OtherContext, serverURL } from "../../../contexts/OtherContexts";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthProvider";
import { BsTrash, BsDownload } from "react-icons/bs";

// import { Link } from "react-router-dom";
const AttachmentTable = ({ required_attachments }) => {
    const { attachments, setAttachments } = useContext(OtherContext);
    setAttachments(required_attachments)
    const default_attachments = ['صورة البطاقه', 'تعريف بالراتب', 'برنت سمه', 'كرت العائلة', 'شهادة الاعفاء الضريبي', 'بطاقة المالك', 'صورة الصك', 'رخصة البناء', 'صورة التيار الكهربائي', 'شهادة الاشغال', 'الاقرار المساحي', 'اتفاقية السعي', 'صورة السند', 'ابلكيشن البنك', 'صورة من بطاقة المتضامن', 'تعريف راتب المتضامن'];;
    // setAttachments(Object.assign({}, required_attachments));
    const [fileList, setFileList] = useState({});
    const [fileSelectedList, setFileSelectedList] = useState([]);
    // file upload completed
    const [fileUploadCompleted, setFileUploadCompleted] = useState(false);


    const { userID, authKey, loggedUser } = useContext(AuthContext);
    const handleFileChange = async (event, key) => {
        const headers = {
            "user-id": userID,
            "auth-key": authKey,
            "Content-Type": "multipart/form-data",
        };
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        try {
            const response = await axios.post(
                "https://miftahaldaar.ratina.co/update_file",
                formData,
                {
                    headers: headers,
                    params: {
                        file_ext: event.target.files[0].name.split('.').pop(),
                    },
                }
            );
            // setFileUploadCompleted(true);
            attachments[key] = response.data.file_link;
            setAttachments({ ...attachments });
            console.log(attachments);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteAttachment = async (key) => {
        const headers = {
            "user-id": userID,
            "auth-key": authKey,
            "Content-Type": "multipart/form-data",
        };
        const file_url = attachments[key];
        if (file_url) {
            const formData = new FormData();
            formData.append("file_url", file_url);

            const response = await axios.post(
                "https://miftahaldaar.ratina.co/delete_file",
                formData,
                {
                    headers: headers,
                }
            );
            console.log(`file deleted successfully ${file_url}`);
            console.log(response);
        }
        if (!default_attachments.includes(key)) {
            delete attachments[key];
            setAttachments({ ...attachments });
        }
        else {
            attachments[key] = '';
            setAttachments({ ...attachments });
        }

    }

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
                setFileUploadCompleted(true);
                setAttachments({ ...attachments, [Object.keys(attachments)[key]]: response.data.file_link });
            } catch (error) {
                console.log(error);
            }
        });




    };

    const TABLE_HEAD_LEFT_HAND = [
        {
            text: '',
        },
        
        {
            text: "المرفق",

        },
        {
            text: "المستند",

        },
    ];
    const addNewRow = () => {
        Swal.fire({
            title: 'إسم المستند',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            customClass: {
                container: 'swal-rtl'
            },
            showCancelButton: true,
            cancelButtonText: 'إلغاء',
            confirmButtonText: 'إدراج',
                showLoaderOnConfirm: true,
            // preConfirm: (value) => {
            //     // Handle the submitted value
            //     console.log(`Submitted value: ${value}`);
            //     // You can perform further actions with the submitted value here
            // },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                // Handle the confirmation
                const newIndex = Object.keys(attachments).length;
                attachments[result.value] = null;
                setAttachments({ ...attachments });
            }
        });

        // setFileList({ ...fileList, [newIndex]: null });
        // setFileSelectedList([...fileSelectedList, newIndex]);        
        // console.log(Object.keys(attachments));
    };


    return (
        <div className="flex flex-col gap-4" style={{direction:"right"}}>
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
                        {Object.keys(attachments).map((attachmentName, index) => (
                            <tr key={attachmentName} className="text-center">
                                <td className="p-4 border-b border-blue-gray-50">
                                    <td >
                                        <IconButton variant="text" color="red" onClick={(e) => { handleDeleteAttachment(attachmentName) }}>
                                            <BsTrash size={20} />
                                        </IconButton>
                                    </td>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">                                        
                                        <div>

                                            <input
                                                type="file"
                                                id={`file-upload-${index}`}
                                                name={`file-upload-${index}`}
                                                itemID={index}
                                                onClick={() => console.log(`Clicked on input field ${index}`)}
                                                onChange={(event) => {
                                                    handleFileChange(event, attachmentName)
                                                }}
                                                className="hidden"

                                            />
                                            {/* Show lable if not attchemnt[attchment name] or show BiLinkAlt herf new tab to attachment link */}
                                            {(!attachments[attachmentName]) ?
                                                <label htmlFor={`file-upload-${index}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                                    اضافة
                                                </label>
                                                :
                                                <a href={serverURL+attachments[attachmentName]} target="_blank">
                                                    <IconButton>
                                                            <BsDownload size={20} />
                                                    </IconButton>
                                                </a>
                                            }





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
                    onClick={addNewRow}
                // disabled={fileUploadCompleted}
                >
                    إضافة مرفق جديد
                </Button>


            </div></div>

    );
};

export default AttachmentTable;
