import { Button, Input, Option, Radio, Select, Textarea } from "@material-tailwind/react";
import {
    BlackBgTitleBar,
    NewOrderFinalActionButtonContainer,
    NewOrderSection,
    NewOrderSectionContainer,
    NewOrderSectionFormContainer,
    NewOrderSectionFormContainerTwoCol,
} from "../../Shared/StyledComponents";
import Container from "../../widgets/Container";
import LeftHandTable from "./LeftHandTable";
import AttachmentTable from "./AttachmentTable";
import DeletionTable from "./DeletionTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Shared/Loading";
import ErrorPage from "../../Shared/ErrorPage";
import { AuthContext } from "../../../contexts/AuthProvider";
import { OtherContext } from "../../../contexts/OtherContexts";
import Swal from "sweetalert2";

const NewOrder = () => {
    const { userID, authKey, loggedUser } = useContext(AuthContext);
    const { attachments } = useContext(OtherContext);
    
    //get order id from url param
    const urlParams = new URLSearchParams(window.location.search);
    const order_id = urlParams.get("order_id");
   
    const [fundedBanks, setFundedBanks] = useState([]);
    const [city_of_property_options_list, set_city_of_property_options_list] = useState([]);
    const [type_of_property_option_list, set_type_of_property_option_list] = useState([]);
    const [lead_source_options_list, set_lead_source_options_list] = useState([]);
    const [order_type_options_list, set_order_type_options_list] = useState([]);
    const [required_attachments, set_required_attachments] = useState({});
    const [loading, setLoading] = useState(false);
    const [failedToFetch, setFailedToFetch] = useState(false);
    const [selectedFundedBankOption, setSelectedFundedBank] = useState("");
    const [selectedCityOfPropertyOption, setSelectedCityOfProperty] = useState("");
    const [selectedTypeOfPropertyOption, setSelectedTypeOfProperty] = useState("");
    const [selectedLeadSourceOption, setSelectedLeadSource] = useState("");
    const [selectedOrderTypeOption, setSelectedOrderType] = useState("");


    // input fields for customer

    const [orderID, setOrderID] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerSalaryAmount, setCustomerSalaryAmount] = useState("");
    const [customerSalaryDepositBank, setCustomerSalaryDepositBank] = useState("");
    const [customerEmployer, setCustomerEmployer] = useState("");
    const [customerOld, setCustomerOld] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [orderType, setOrderType] = useState("");
    const [propertyValue, setPropertyValue] = useState("");


// input fields for order
    
    const [bankName, setBankName] = useState("");
    const [bankEmployeeName, setBankEmployeeName] = useState("");
    const [duration, setDuration] = useState("");
    const [mortgage, setMortgage] = useState("");
    const [personalFinancing, setPersonalFinancing] = useState("");
    const [installmentAmount, setInstallmentAmount] = useState("");
    const [premiumSupport, setPremiumSupport] = useState("");
    const [typeOfProperty, setTypeOfProperty] = useState("");
    const [originalPropertyValue, setOriginalPropertyValue] = useState("");
    const [supervisorID, setSupervisorID] = useState("");
    const [empID, setEmpID] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [ownerPhone, setOwnerPhone] = useState("");
    const [cityOfProperty, setCityOfProperty] = useState("");
    const [leadSource, setLeadSource] = useState("");
    const [isGuarantees, setIsGuarantees] = useState(false);
    const [notes, setNotes] = useState("");
    const [orderResponse, setOrderResponse] = useState({});
    
    const handleSelectOrderTypeChange = (value) => {
        setSelectedOrderType(value);
        setOrderType(value);
        console.log("orderType", value);
    };

    const handleSelectLeadSourceChange = (event) => {
        setSelectedLeadSource(event.target.value);
        setLeadSource(event.target.value);
    };

    const handleSelectTypeOfPropertyChange = (event) => {
        setSelectedTypeOfProperty(event.target.value);
        setTypeOfProperty(event.target.value);
    };

    const handleSelectCityOfPropertyChange = (event) => {
        setSelectedCityOfProperty(event.target.value);
        setCityOfProperty(event.target.value);
    };

    const handleSelectFundedBankChange = (event) => {
        setSelectedFundedBank(event.target.value);
        setBankName(event.target.value);
    };

    const handleCompleteOrder = async () => {
        const headers = {
            "user-id": userID,
            "auth-key": authKey,
        };

       const fileAttachments = JSON.stringify(attachments)

        const formData = new FormData();
        if (order_id)
            formData.append('order_id', customerName);    

        formData.append('customer_name', customerName);
        formData.append('customer_phone', customerPhone);
        formData.append('customer_salary_amount', customerSalaryAmount);
        formData.append('customer_salary_deposit_bank', customerSalaryDepositBank);
        formData.append('customer_employer', customerEmployer);
        formData.append('customer_old', customerOld);
        formData.append('order_date', orderDate);
        formData.append('order_type', orderType);
        formData.append('property_value', propertyValue);
        formData.append('bank_name', bankName);
        formData.append('bank_employee_name', bankEmployeeName);
        formData.append('duration', duration);
        formData.append('mortgage', mortgage);
        formData.append('personal_financing', personalFinancing);
        formData.append('installment_amount', installmentAmount);
        formData.append('premium_support', premiumSupport);
        formData.append('type_of_property', typeOfProperty);
        formData.append('original_property_value', originalPropertyValue);
        formData.append('supervisor_id', supervisorID);
        formData.append('emp_id', empID);
        formData.append('customer_id', customerID);
        formData.append('owner_phone', ownerPhone);
        formData.append('city_of_property', cityOfProperty);
        formData.append('lead_source', leadSource);
        formData.append('is_guarantees', isGuarantees);
        formData.append('notes', notes);
        formData.append('attachment_json', fileAttachments);
        

        try {            
            let response = None;
            if (order_id)
                [response] = await Promise.all([
                    axios.post("https://miftahaldaar.ratina.co/order/update", formData, { headers }),
                ]);
            else
                [response] = await Promise.all([
                    axios.post("https://miftahaldaar.ratina.co/order/create", formData, { headers }),
                ]);

            // If failed to fetch
            if (response.data.status !== true) {
                return ;
            }

            
            Swal.fire({
                title:  'تم !',
                text: 'تم تحديث الطلب بنجاح',
                icon: 'success',
                confirmButtonColor: '#3088D6',
                confirmButtonText: 'نعم'
            }
              )
            // If success
            if (order_id){
                return;
            }
            
            setOrderID("");
            setCustomerName("");
            setCustomerPhone("");
            setCustomerSalaryAmount("");
            setCustomerSalaryDepositBank("");
            setCustomerEmployer("");
            setCustomerOld("");
            setOrderDate("");
            setOrderType("");
            setPropertyValue("");
            setBankName("");
            setBankEmployeeName("");
            setDuration("");
            setMortgage("");
            setPersonalFinancing("");
            setInstallmentAmount("");
            setPremiumSupport("");
            setTypeOfProperty("");
            setOriginalPropertyValue("");
            setSupervisorID("");
            setEmpID("");
            setCustomerID("");
            setOwnerPhone("");
            setCityOfProperty("");
            setLeadSource("");
            setIsGuarantees(false);
            setNotes("");

            
        } catch (error) {
            console.log(error);
            // setFailedToFetch(true);
        }
    };

    const fetchData = async () => {
        const formData = new FormData();
        if (order_id) {
            formData.append('order_id',order_id);
        }
       
        setLoading(true);
        const headers = {
          "user-id": userID,
          "auth-key": authKey,
        };
       
        try {
          const [fields_options_response,orderResponse] = await Promise.all([
              axios.get("https://miftahaldaar.ratina.co/fields_options", { headers }),
              axios.post("https://miftahaldaar.ratina.co/order/get",formData, { headers }),
          ]);
            
         
     
          // If failed to fetch
          if (fields_options_response.data.status !== true) {
            setLoading(false);
            return setFailedToFetch(true);
          }
  
          setLoading(false);
          setFailedToFetch(false);
         
        
            setFundedBanks(fields_options_response.data.bank_name_options_list);
            set_city_of_property_options_list(fields_options_response.data.city_of_property_options_list);
            set_type_of_property_option_list(fields_options_response.data.type_of_property_option_list);
            set_lead_source_options_list(fields_options_response.data.lead_source_options_list);
            set_required_attachments(fields_options_response.data.required_attachments);
            set_order_type_options_list(fields_options_response.data.order_type_options_list);


            if(orderResponse.data.status === true){
                setOrderID(orderResponse.data.order.order_id);
                setCustomerName(orderResponse.data.order.customer_name);
                setCustomerPhone(orderResponse.data.order.customer_phone);
                setCustomerSalaryAmount(orderResponse.data.order.customer_salary_amount);
                setCustomerSalaryDepositBank(orderResponse.data.order.customer_salary_deposit_bank);
                setCustomerEmployer(orderResponse.data.order.customer_employer);
                setCustomerOld(orderResponse.data.order.customer_old);
                setOrderDate(orderResponse.data.order.order_date);
                setSelectedOrderType(orderResponse.data.order.order_type);
                setPropertyValue(orderResponse.data.order.property_value);
                setSelectedFundedBank(orderResponse.data.order.bank_name);
                setBankEmployeeName(orderResponse.data.order.bank_employee_name);
                setDuration(orderResponse.data.order.duration);
                setMortgage(orderResponse.data.order.mortgage);
                setPersonalFinancing(orderResponse.data.order.personal_financing);
                setInstallmentAmount(orderResponse.data.order.installment_amount);
                setPremiumSupport(orderResponse.data.order.premium_support);
                setSelectedTypeOfProperty(orderResponse.data.order.type_of_property);
                setOriginalPropertyValue(orderResponse.data.order.original_property_value);
                setSupervisorID(orderResponse.data.order.supervisor_id);
                setEmpID(orderResponse.data.order.emp_id);
                setCustomerID(orderResponse.data.order.customer_id);
                setOwnerPhone(orderResponse.data.order.owner_phone);
                setSelectedCityOfProperty(orderResponse.data.order.city_of_property);
                setSelectedLeadSource(orderResponse.data.order.lead_source);
                setIsGuarantees(orderResponse.data.order.is_guarantees);
                setNotes(orderResponse.data.order.notes);
                // setAttachments(orderResponse.data.order.attachments);
            }




        } catch (error) {
          console.log(error);
          setLoading(false);
          setFailedToFetch(true);
        }
      };

    

    useEffect(() => {
      fetchData();
    }, []);




    if (loading) {
        return <Loading />;
    }
    if (failedToFetch) {
        return <ErrorPage />;
    }
    return (
        <Container>
            <NewOrderSectionContainer>
                {/* Section One */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات الاساسية</BlackBgTitleBar>
                    <NewOrderSectionFormContainer>
                        <Input dir="rtl" size="md" label="الراتب"
                            value={customerSalaryAmount}
                            onChange={(e) => setCustomerSalaryAmount(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="بنك الإيداع الراتب"
                            value={customerSalaryDepositBank}
                            onChange={(e) => setCustomerSalaryDepositBank(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="رقم الهاتف"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="اسم العميل"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="تاريخ الطلب"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="رقم الطلب"
                            value={orderID}
                            onChange={(e) => setOrderID(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="العمر"
                            value={customerOld}
                            onChange={(e) => setCustomerOld(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="جهة العمل"
                            value={customerEmployer}
                            onChange={(e) => setCustomerEmployer(e.target.value)}
                        />
                        
                        <Select dir="rtl"
                            label="الخدمة المطلوبة"
                            value={selectedOrderTypeOption}
                            onChange={(e) => handleSelectOrderTypeChange(e)}
                        >
                            {order_type_options_list.map((option,index) => (
                                <Option key={index} value={option}>
                                    {option}
                                </Option>

                            ))}
                        </Select>
                        <Input dir="rtl" size="md" label="قيمة العقار ان وجد"
                            value={propertyValue}
                            onChange={(e) => setPropertyValue(e.target.value)}
                        />
                    </NewOrderSectionFormContainer>
                </NewOrderSection>

                {/* Section Two */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات واكمال المستندات</BlackBgTitleBar>
                    <NewOrderSectionFormContainer>
                        <Input dir="rtl" size="md" label="قسط الدعم"
                            value={premiumSupport}
                            onChange={(e) => setPremiumSupport(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="القسط"
                            value={installmentAmount}
                            onChange={(e) => setInstallmentAmount(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="التمويل الشخصي"
                            value={personalFinancing}
                            onChange={(e) => setPersonalFinancing(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="التمويل العقاري"
                            value={mortgage}
                            onChange={(e) => setMortgage(e.target.value)}
                    />
                        <Input dir="rtl" size="md" label="المدة"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="موظف البنك"
                            value={bankEmployeeName}
                            onChange={(e) => setBankEmployeeName(e.target.value)}
                        />
                        
                        <Select dir="rtl" label="البنك الممول" value={selectedFundedBankOption}   onClick={handleSelectFundedBankChange}>
                        {fundedBanks.map((option, index) => (
    <Option key={index}>{option}</Option>
  ))}
                        </Select>
                        <Input dir="rtl" size="md" label="الموظف المتابع"
                            value={empID}
                            onChange={(e) => setEmpID(e.target.value)}
                            
                        />
                        <Input dir="rtl" size="md" label="المشرف"
                            value={supervisorID}
                            onChange={(e) => setSupervisorID(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="هوية العميل"
                            value={customerID}  
                            onChange={(e) => setCustomerID(e.target.value)}
                        />
                        <Input dir="rtl" size="md" label="قيم العقار الاصلي"
                            value={originalPropertyValue}
                            onChange={(e) => setOriginalPropertyValue(e.target.value)}
                        />
                        {/* Dropdown */}
                        <Select dir="rtl" label="نوع العقار"
                            value={selectedTypeOfPropertyOption}
                            onClick={handleSelectTypeOfPropertyChange}
                            
                        >
                            {type_of_property_option_list.map((option, index) => (
                                <Option key={index}>{option}</Option>
                            ))}
                        
                        </Select>
                        <Select dir="rtl"
                            label="الخدمة المطلوبة"
                            value={selectedOrderTypeOption}
                            onChange={(e) => handleSelectOrderTypeChange(e)}
                        >
                            {order_type_options_list.map((option,index) => (
                                <Option key={index} value={option}>
                                    {option}
                                </Option>

                            ))}
                        </Select>
                    </NewOrderSectionFormContainer>
                    <NewOrderSectionFormContainer>
                        {/* Radio Button */}
                        <div className="flex ">
                            <Radio dir="rtl" id="html" name="type" label="يوجد ضامن"
                                checked={isGuarantees}
                                onChange={(e) => setIsGuarantees(true)}
                            />
                            <Radio dir="rtl" id="react" name="type" label="لا يوجد ضامن"
                               checked={!isGuarantees}
                                onChange={(e) => setIsGuarantees(false)}
                            />
                        </div>

                        {/* Dropdown */}
                        <Select dir="rtl" label="معرفة العميل بالشركة"
                            value={selectedLeadSourceOption}
                            onClick={handleSelectLeadSourceChange}
                        >
                            {lead_source_options_list.map((option, index) => (
                                <Option key={index}>{option}</Option>
                            ))}
                        </Select>

                        {/* Dropdown */}
                        <Select dir="rtl" label="مدينة العقار"
                        value={selectedCityOfPropertyOption}   onClick={handleSelectCityOfPropertyChange}
                        >
                            {city_of_property_options_list.map((option, index) => (
                                <Option key={index}>{option}</Option>
                            ))}
                        </Select>

                        <Input dir="rtl" size="md" label="جوال المالك"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                        />
                    </NewOrderSectionFormContainer>
                    <NewOrderSectionFormContainer>
                        <div className="col-span-4">
                            <Textarea dir="rtl" label="شرح حالة العميل"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </NewOrderSectionFormContainer>
                </NewOrderSection>

                {/* Section Three */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات واكمال المستندات</BlackBgTitleBar>
                    {/* Two Table In single Column */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-4">
                        {/* Left Table */}
                        <LeftHandTable />
                        <AttachmentTable required_attachments={required_attachments}  />
                    </div>
               
                </NewOrderSection>

                {/* Section Four */}


                {(loggedUser === 1 || loggedUser === 2) && (
                    <NewOrderSection>
                   
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-4">
                            <DeletionTable />
                            <NewOrderSectionFormContainerTwoCol>
                                <Select dir="rtl" label="مدينة العقار">
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                </Select>

                                <Input dir="rtl" size="md" label="المشرف" />

                                <Select dir="rtl" label="مدينة العقار">
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                </Select>
                                <Select dir="rtl" label="مدينة العقار">
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                    <Option>نوع العقار</Option>
                                </Select>
                            </NewOrderSectionFormContainerTwoCol>
                        </div>
                        <Button dir="rtl" className="flex  ml-4 mb-4">إضافة مستند مطلوب</Button>
                    </NewOrderSection>)}





                <NewOrderFinalActionButtonContainer>
                    <Button
                        onClick={handleCompleteOrder}
                        dir="rtl" className="px-16 py-4" color="green">
                        إكمال
                    </Button>
                    {/* <Button dir="rtl" className="px-16 py-4" color="blue">
                        إكتملت المهمة
                    </Button> */}
                        <Button dir="rtl" className="px-16 py-4" color="orange"
                
                        >
                        تأجيل
                    </Button>
                        <Button dir="rtl" className="px-16 py-4" color="red"
                            onClick={() => {
                               
                               
                        }}
                        >
                        إلغاء الطلب
                    </Button>
                </NewOrderFinalActionButtonContainer>
            </NewOrderSectionContainer>
        </Container>

    );
};

export default NewOrder;
