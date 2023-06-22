import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useState } from "react";


import logo from "../Form/vite.png";
import Swal from "sweetalert2";
import axios from "axios";

function Forms() {
  const [Data, setData] = useState({
    action:"register",
    order_type:"",
    customer_name:"",
    customer_phone:"",
    customer_salary_amount:"",
    customer_salary_deposit_bank:"",
    customer_employer:"",
    customer_old:"",
    bank_employee_name:"",
    property_value:"لا يوجد",
  });


  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

  };
  
  const handleSelectChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const headers = {
    "user-id": "1010",
    "auth-key": "sdofmasdmfasdmflkmasdf",
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
    formData.append('bank_employee_name', Data.bank_employee_name);
    
    try {            
      let response = null;
       [response] = await Promise.all([
        axios.post("https://miftahaldaar.ratina.co/order/register", formData, { headers }),
    ]);
    if (response.data.status === false) {
      Swal.fire({
        title:  'خطأ',
        text: 'الرجاء تعبئة جميع البيانات',
        icon: 'error',
        confirmButtonColor: '#3088D6',
        confirmButtonText: 'نعم'
    })
  }
  else
        Swal.fire({
            title:  'تم !',
            text: 'تم اضافة الطلب بنجاح',
            icon: 'success',
            confirmButtonColor: '#3088D6',
            confirmButtonText: 'نعم'
        }
          )
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
      }}
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          طلب تمويل عقاري
        </Typography>
        <div className="absolute top-0 right-0">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>

        <Typography color="gray" className="mt-1 font-normal">
          Real estate financing application form
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
              <Option value="بناء ذاتي">بناء ذاتي</Option>
              <Option value="ارض وقرض">ارض وقرض</Option>
              <Option value="فك الرهن واعادة الشراء">فك الرهن واعادة الشراء</Option>
            </Select>
            <Input
              onChange={handleInputChange}
              value={Data.customer_name}
              name="customer_name"
              size="lg"
              label="الاسم"
            />
            <Input
            onChange={handleInputChange}
              value={Data.customer_phone}
              name="customer_phone"
              size="lg"
              label="رقم الهاتف"
            />
            <Input
            onChange={handleInputChange}
              value={Data.customer_employer}
              name="customer_employer"
              size="lg"
              label="جهة العمل"
            />
            <Input
            onChange={handleInputChange}
              value={Data.customer_salary_amount}
              name="customer_salary_amount"
              size="lg"
              label="الراتب"
            />
            <Select
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
              <Option value="شركة سهل "> شركة سهل </Option>
              <Option value="شركة دويتشه "> شركة دويتشه </Option>
              <Option value="شركة بداية "> شركة بداية </Option>
              <Option value="جهة تمويل الشركات والمؤسسات "> جهة تمويل الشركات والمؤسسات </Option>
            </Select>
            <Input
            onChange={handleInputChange}
              value={Data.bank_employee_name}
              name="bank_employee_name"
              size="lg"
              label="موظف البنك"
            />
            <Input
            onChange={handleInputChange}
              value={Data.customer_old}
              name="customer_old"
              size="lg"
              label="العمر "
            />
            <Input
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
      </Card>
    </div>
  );
}
export default Forms;
