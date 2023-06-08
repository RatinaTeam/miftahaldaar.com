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

const NewOrder = () => {
    const { userID } = useContext(AuthContext);
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

    const handleSelectOrderTypeChange = (event) => {
        setSelectedOrderType(event.target.value);
    };

    const handleSelectLeadSourceChange = (event) => {
        setSelectedLeadSource(event.target.value);
    };

    const handleSelectTypeOfPropertyChange = (event) => {
        setSelectedTypeOfProperty(event.target.value);
    };

    const handleSelectCityOfPropertyChange = (event) => {
        setSelectedCityOfProperty(event.target.value);
    };

    const handleSelectFundedBankChange = (event) => {
        setSelectedFundedBank(event.target.value);
    };
    

    useEffect(() => {
      
        const fetchData = async () => {
          
        setLoading(true);
        const headers = {
          "user-id": userID,
          "auth-key": "sdofmasdmfasdmflkmasdf",
        };
       
        try {
          const [response] = await Promise.all([
            axios.get("https://miftahaldaar.ratina.co/fields_options", { headers })
          ]);

          // If failed to fetch
          if (response.data.status !== true) {
            setLoading(false);
            return setFailedToFetch(true);
          }
  
          setLoading(false);
          setFailedToFetch(false);
         
        
            setFundedBanks(response.data.bank_name_options_list);
            set_city_of_property_options_list(response.data.city_of_property_options_list);
            set_type_of_property_option_list(response.data.type_of_property_option_list);
            set_lead_source_options_list(response.data.lead_source_options_list);
            set_required_attachments(response.data.required_attachments);
            set_order_type_options_list(response.data.order_type_options_list);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setFailedToFetch(true);
        }
      };
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
                        <Input dir="rtl" size="md" label="الراتب" />
                        <Input dir="rtl" size="md" label="بنك الإيداع الراتب" />
                        <Input dir="rtl"  size="md" label="رقم الهاتف" />
                        <Input dir="rtl" size="md" label="اسم العميل" />
                        <Input dir="rtl" size="md" label="تاريخ الطلب" />
                        <Input dir="rtl" size="md" label="رقم الطلب" />
                        <Input dir="rtl" size="md" label="العمر" />
                        <Input dir="rtl" size="md" label="جهة العمل" />
                        <Select dir="rtl"
                            label="الخدمة المطلوبة"
                            value={selectedOrderTypeOption}
                            onClick={handleSelectOrderTypeChange}
                        >
                            {order_type_options_list.map((option,index) => (
                                <Option key={index} value={option}>
                                    {option}
                                </Option>

                            ))}
                        </Select>
                        <Input dir="rtl" size="md" label="الخدمة المطلوبة" />
                        <Input dir="rtl" size="md" label="قيمة العقار ان وجد" />
                    </NewOrderSectionFormContainer>
                </NewOrderSection>

                {/* Section Two */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات واكمال المستندات</BlackBgTitleBar>
                    <NewOrderSectionFormContainer>
                        <Input dir="rtl" size="md" label="قسط الدعمPremium support" />
                        <Input dir="rtl" size="md" label="القسطinstallment" />
                        <Input dir="rtl" size="md" label="التمويل الشخصيpersonal finance" />
                        <Input dir="rtl" size="md" label="التمويل العقاري/Mortgage" />
                        <Input dir="rtl" size="md" label="duration/المدة" />
                        <Input dir="rtl" size="md" label="موظف البنك/Bank employee" />
                        {/* Dropdown */}
                        <Select dir="rtl" label="البنك الممول" value={selectedFundedBankOption}   onClick={handleSelectFundedBankChange}>
                        {fundedBanks.map((option, index) => (
    <Option key={index}>{option}</Option>
  ))}
                        </Select>
                        <Input dir="rtl" size="md" label="الموظف المتابعfollow-up employee" />
                        <Input dir="rtl" size="md" label="المشرفadmin" />
                        <Input dir="rtl" size="md" label="هوية العميلClient ID" />
                        <Input dir="rtl" size="md" label="قيم العقار الاصليoriginal property values" />
                        {/* Dropdown */}
                        <Select dir="rtl" label="نوع العقار"
                            value={selectedTypeOfPropertyOption}
                            onClick={handleSelectTypeOfPropertyChange}
                            
                        >
                            {type_of_property_option_list.map((option, index) => (
                                <Option key={index}>{option}</Option>
                            ))}
                        
                        </Select>
                        {/* Dropdown */}
                        <Select dir="rtl" label="requested service/الخدمة المطلوبة">
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                        </Select>
                    </NewOrderSectionFormContainer>
                    <NewOrderSectionFormContainer>
                        {/* Radio Button */}
                        <div className="flex ">
                            <Radio dir="rtl" id="html" name="type" label="يوجد ضامن" />
                            <Radio dir="rtl" id="react" name="type" label="لا يوجد ضامن" defaultChecked />
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

                        <Input dir="rtl" size="md" label="جوال المالك/Owner phone" />
                    </NewOrderSectionFormContainer>
                    <NewOrderSectionFormContainer>
                        <div className="col-span-4">
                            <Textarea dir="rtl" label="Explain the client's situation/شرح حالة العميل" />
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


{/*                 
                <NewOrderSection>
                   
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-4">
                        <DeletionTable />
                        <NewOrderSectionFormContainerTwoCol>
                            <Select dir="rtl" label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>

                            <Input dir="rtl" size="md" label="المشرفadmin" />

                            <Select dir="rtl" label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>
                            <Select dir="rtl" label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>
                        </NewOrderSectionFormContainerTwoCol>
                    </div>
                    <Button dir="rtl" className="flex  ml-4 mb-4">إضافة مستند مطلوب</Button>
                </NewOrderSection> */}





                <NewOrderFinalActionButtonContainer>
                    <Button dir="rtl" className="px-16 py-4" color="green">
                        إكمال/Completed
                    </Button>
                    <Button dir="rtl" className="px-16 py-4" color="blue">
                        إكتملت المهمة/Completed
                    </Button>
                    <Button dir="rtl" className="px-16 py-4" color="orange">
                        تأجيل/Delay
                    </Button>
                    <Button dir="rtl" className="px-16 py-4" color="red">
                        إلغاء الطلب/ Cancel Order
                    </Button>
                </NewOrderFinalActionButtonContainer>
            </NewOrderSectionContainer>
        </Container>
    );
};

export default NewOrder;
