import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import React, { useState } from "react";


import logo from "../Form/vite.png";
import Swal from "sweetalert2";
import axios from "axios";
import { backendURL } from "../../contexts/OtherContexts";

function Forms() {
  const [Data, setData] = useState({
    action: "register",
    order_type: "",
    customer_name: "",
    customer_phone: "",
    customer_salary_amount: "",
    customer_salary_deposit_bank: "",
    customer_employer: "",
    customer_old: "",
    bank_employee_name: "",
    property_value: "0",
  });

  const [idOfNewOrder, setIdOfNewOrder] = useState(null);
  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleSelectChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const headers = {
    "user-id": "1010",
    "auth-key": "adsgsdfgsdfg",
  };

  const handleCompleteOrder = async () => {

    const formData = new FormData();
    formData.append('action', Data.action);
    formData.append('customer_name', Data.customer_name);
    formData.append('customer_phone', Data.customer_phone);
    formData.append('customer_salary_amount', Data.customer_salary_amount);
    formData.append('customer_salary_deposit_bank', Data.customer_salary_deposit_bank);
    formData.append('customer_employer', Data.customer_employer);
    formData.append('customer_old', Data.customer_old);
    formData.append('order_type', Data.order_type);
    formData.append('property_value', Data.property_value);
    // formData.append('bank_employee_name', Data.bank_employee_name);

    try {
      let response = null;
      [response] = await Promise.all([
        axios.post(backendURL+"/order/register", formData, { headers }),
      ]);
      if (response.data.status === false) {
        console.log(response.data);
        Swal.fire({
          title: 'خطأ',
          text: 'الرجاء تعبئة جميع البيانات',
          icon: 'error',
          confirmButtonColor: '#3088D6',
          confirmButtonText: 'نعم'
        })
      }
      else {
        // console.log(response.data.order);
        setIdOfNewOrder(response.data.order_id);
        // Swal.fire({
        //     title:  'تم !',
        //     text: 'تم اضافة الطلب بنجاح',
        //     icon: 'success',
        //     confirmButtonColor: '#3088D6',
        //     confirmButtonText: 'نعم'
        // }
        //   )}
      }
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      {!idOfNewOrder ? (
        <Card color="transparent" shadow={false}>
          <h1 variant="h2" color="blue-gray">
          مفتاح الدار للعقارات 
          </h1>
          <Typography variant="h4" color="blue-gray">
            طلب تمويل عقاري
          </Typography>
          <div className="absolute top-0 left-0">
            <img src="miftahaldaar.com_logo.svg" alt="Logo" className="h-20 w-20" alt="مفتاح الدار للعقارات"  />
          </div>
          
          <Typography color="gray" className="mt-1 font-normal">
            الرجاء تعبئة البيانات التالية
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Select
                value={Data.order_type}
                name="order_type"
                dir="rtl"
                label="الخدمة المطلوبة"
                onChange={(value) => handleSelectChange("order_type", value)}
              >
                <Option value="شراء">شراء</Option>
                <Option value="رهن">رهن</Option>                
                <Option value="فك رهن واعادة تمويل">فك رهن واعادة تمويل</Option>
                
              </Select>
              <Input              
                dir="rtl"                
                style={{ direction: "rtl" }}
                className="text-right"
                onChange={handleInputChange}
                value={Data.customer_name}
                name="customer_name"
                size="lg"
                label="الاسم"
              />
              <Input
                dir="rtl"
                onChange={handleInputChange}
                value={Data.customer_phone}
                name="customer_phone"
                size="lg"
                label="رقم الهاتف"
              />
              {/* <Input
                dir="rtl"
                onChange={handleInputChange}
                value={Data.customer_employer}
                name="customer_employer"
                size="lg"
                label="جهة العمل"
              /> */}
              <Select
                dir="rtl"
                onChange={(value) => handleSelectChange("customer_employer", value)}
                name="customer_employer"
                value={Data.customer_employer}
                label="جهة العمل"
              >                
                {[
                  'عسكري',
                  'مدني',
                  'قطاع خاص',
                  'متقاعد',
                ].map((item) => (
                  <Option value={item}>{item}</Option>
                ))}
                
              </Select>
              <Input
                dir="rtl"
                onChange={handleInputChange}
                value={Data.customer_salary_amount}
                name="customer_salary_amount"
                size="lg"
                label="الراتب"
              />
              <Select
                dir="rtl"
                onChange={(value) => handleSelectChange("customer_salary_deposit_bank", value)}
                name="customer_salary_deposit_bank"
                value={Data.customer_salary_deposit_bank}
                label="بنك اداع الراتب"
              >
                <Option value="الراجحي">الراجحي</Option>
                <Option value="الرياض">الرياض</Option>
                <Option value="الاهلي"> الاهلي</Option>
                <Option value="الاستثمار"> الاستثمار</Option>
                <Option value="الاول"> الاول </Option>
                <Option value="ساب"> ساب </Option>
                <Option value="البنك الفرنسي "> البنك الفرنسي </Option>
                <Option value="العربي"> العربي </Option>
                <Option value="الجزيرة"> الجزيرة </Option>
                <Option value="سامبا"> سامبا </Option>
                <Option value="بنك الامارات "> بنك الامارات </Option>
                
              </Select>
              {/* <Input
                onChange={handleInputChange}
                value={Data.bank_employee_name}
                name="bank_employee_name"
                size="lg"
                label="موظف البنك"
              /> */}
              <Input
                dir="rtl"
                onChange={handleInputChange}
                value={Data.customer_old}
                name="customer_old"
                size="lg"
                label="العمر "
              />
              <Input
                dir="rtl"
                onChange={handleInputChange}
                value={Data.property_value}
                name="property_value"
                size="lg"
                label="قيمة العقار ان وجد"
              />
            </div>

            <Button onClick={handleCompleteOrder} className="mt-6" fullWidth>
              ارسال
            </Button>
          </form>
        </Card>) :
        (
          // show the id of the new order on center of the screen
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">تم اضافة الطلب بنجاح</h1>
            <h1 className="text-2xl font-bold">رقم طلبك هو # {idOfNewOrder}</h1>
            {/* <a href={`tel:0545917427`} className="mt-4">
              <Button color="primary" variant="contained">

                <BsTelephone size={20} style={{ display: "inline", marginRight: '5px' }} />
                <span> 0545917427</span>

              </Button>
            </a>
            {/* whatsapp button with text menithon order id , button color green */}
            {/* <a href={`https://wa.me/966545917427?text=طلب تمويل عقاري رقم ${idOfNewOrder}`} className="mt-4">
              <Button variant="contained" color="green">
                <BsWhatsapp size={20} style={{ display: "inline", marginRight: '5px' }} />
                <span> 0545917427</span>
              </Button>
            </a>  */}

          </div>
        )
      }

    </div>
  );
}
export default Forms;
