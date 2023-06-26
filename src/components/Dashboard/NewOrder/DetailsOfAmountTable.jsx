import { Button, Card, IconButton, Typography, Input, } from "@material-tailwind/react";

import axios from "axios";
import React, { useContext, useState } from "react";
import { OtherContext } from "../../../contexts/OtherContexts";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthProvider";
import { BsTrash, BsDownload } from "react-icons/bs";

// import { Link } from "react-router-dom";
const DetailsOfAmountTable = () => {
    const { detailsDataJson, setDetailsDataJson } = useContext(OtherContext);
    // setDetailsDataJson(oldDetailsDataJson)

    const TABLE_HEAD_LEFT_HAND = [
        
        {
            text: '',
        },
        {
            text: "المبلغ",

        },
        {
            text: "البيان",

        },   
        
        
    ];
    const addNewRow =  () => {


        
        // Swal.fire({
        //     title: 'ادخل البيان',
        //     customClass: {
        //         container: 'swal-rtl'
        //     },
        //     html:
        //         '<input id="label" class="swal2-input" placeholder="البيان">' +
        //         '<input id="amount" class="swal2-input" placeholder="المبلغ">',
        //     focusConfirm: false,
        //     showLoaderOnConfirm: true,
            
        //     allowOutsideClick: () => !Swal.isLoading(),
        //     preConfirm: () => {
        //         const label = document.getElementById('label').value;
        //         const amount = document.getElementById('amount').value;
        //         detailsDataJson[label] = amount;
        //         setDetailsDataJson(detailsDataJson);
        //         return [label, amount];
        //     }
        //     // preConfirm: (value) => {
        //     //     // Handle the submitted value
        //     //     console.log(`Submitted value: ${value}`);
        //     //     // You can perform further actions with the submitted value here
        //     // },
        //     // allowOutsideClick: () => !Swal.isLoading()
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         // Handle the confirmation
        //         // const newIndex = Object.keys(attachments).length;
        //         // const [label, amount] = result.value;
        //         // detailsDataJson[label] = amount;
        //         // setDetailsDataJson(detailsDataJson);
                
        //     }
        // });
        // Swal.fire({
        //         title: 'ادخل البيان',
        //         customClass: {
        //             container: 'swal-rtl'
        //         },
        //         input: 'text',
        //         inputAttributes: {
        //             autocapitalize: 'off'
        //         },
        //         customClass: {
        //             container: 'swal-rtl'
        //         },
        //         showCancelButton: true,
        //         cancelButtonText: 'إلغاء',
        //         confirmButtonText: 'إدراج',
        //         showLoaderOnConfirm: true,
        //         // preConfirm: (value) => {
        //         //     // Handle the submitted value
        //         //     console.log(`Submitted value: ${value}`);
        //         //     // You can perform further actions with the submitted value here
        //         // },
        //         allowOutsideClick: () => !Swal.isLoading()
                
        //     }).then((result) => {
        //         // if (result.isConfirmed) {
        //           // copy detailsDataJson
        //           const newDetailsDataJson = {...detailsDataJson};
        //           newDetailsDataJson[result.value] = 0;
        //           setDetailsDataJson(newDetailsDataJson);   
        //         // }
        //     });

        // get 2 inputs from user via swal
        Swal.fire({
            title: 'ادخل البيان',
            customClass: {
                container: 'swal-rtl'
            },
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
                localStorage.setItem('label', result.value);
                Swal.fire({
                    title: 'ادخل المبلغ',
                    customClass: {
                        container: 'swal-rtl'
                    },
                    input: 'number',
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
                    const amount = result.value;
                    detailsDataJson[localStorage.getItem('label')] = amount;
                    //compy detailsDataJson
                    const newDetailsDataJson = {...detailsDataJson};
                    newDetailsDataJson[localStorage.getItem('label')] = amount;
                    setDetailsDataJson(newDetailsDataJson);
                }
            });
            }
        });
    // };
    //         if (result.isConfirmed) {
    //             localStorage.setItem('label', result.value);
    //             Swal.fire({
    //                 title: 'ادخل المبلغ',
    //                 customClass: {
    //                     container: 'swal-rtl'
    //                 },
    //                 input: 'text',
    //                 inputAttributes: {
    //                     autocapitalize: 'off'
    //                 },
    //                 customClass: {
    //                     container: 'swal-rtl'
    //                 },
    //                 showCancelButton: true,
    //                 cancelButtonText: 'إلغاء',
    //                 confirmButtonText: 'إدراج',
    //                 showLoaderOnConfirm: true,
    //                 // preConfirm: (value) => {
    //                 //     // Handle the submitted value
    //                 //     console.log(`Submitted value: ${value}`);
    //                 //     // You can perform further actions with the submitted value here
    //                 // },
    //                 allowOutsideClick: () => !Swal.isLoading()


    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 const amount = result.value;
    //                 detailsDataJson[localStorage.getItem('label')] = amount;
    //                 setDetailsDataJson(detailsDataJson);
    //             }
    //         }
        }
    
    const deleteRow = (label) => {
        // copy detailsDataJson
        const newDetailsDataJson = {...detailsDataJson};
        delete newDetailsDataJson[label];
        setDetailsDataJson(newDetailsDataJson);
    }

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
                        {Object.keys(detailsDataJson).map((label, index) => (
                            <tr key={label} className="text-center">
                                
                                <td className="p-4 border-b border-blue-gray-50">
                                    <td >
                                        <IconButton variant="text" color="red" onClick={(e) => { deleteRow(label) }}>
                                            <BsTrash size={20} />
                                        </IconButton>
                                    </td>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography>
                                        {detailsDataJson[label]}
                                    </Typography>
                                </td>
                                
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography>
                                        {label}
                                    </Typography>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>


            </Card>
            <div className="flex justify-end">

                <Button className=
                    {`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer`}
                    onClick={(e) => { addNewRow() }}
                // disabled={fileUploadCompleted}
                >
                    إضافة بيان جديد
                </Button>


            </div></div>

    );
};

export default DetailsOfAmountTable;
