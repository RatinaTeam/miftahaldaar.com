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

const NewOrder = () => {
    return (
        <Container>
            <NewOrderSectionContainer>
                {/* Section One */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات الاساسية</BlackBgTitleBar>
                    <NewOrderSectionFormContainer>
                        <Input size="md" label="الراتب/Salary" />
                        <Input size="md" label="Salary deposit bank/بنك الإيداع الراتب" />
                        <Input size="md" label="رقم الهاتف/Phone" />
                        <Input size="md" label="اسم العميل/ Client name" />
                        <Input size="md" label="تاريخ الطلب/Order Date" />
                        <Input size="md" label="OrderNo/رقم الطلب" />
                        <Input size="md" label="العمر/old" />
                        <Input size="md" label="Employer/جهة العمل" />
                        <Input size="md" label="الخدمة المطلوبةService Type" />
                        <Input size="md" label="value of the property(Option)" />
                    </NewOrderSectionFormContainer>
                </NewOrderSection>

                {/* Section Two */}
                <NewOrderSection>
                    <BlackBgTitleBar>المعلومات واكمال المستندات</BlackBgTitleBar>
                    <NewOrderSectionFormContainer>
                        <Input size="md" label="قسط الدعمPremium support" />
                        <Input size="md" label="القسطinstallment" />
                        <Input size="md" label="التمويل الشخصيpersonal finance" />
                        <Input size="md" label="التمويل العقاري/Mortgage" />
                        <Input size="md" label="duration/المدة" />
                        <Input size="md" label="موظف البنك/Bank employee" />
                        {/* Dropdown */}
                        <Select label="funded bank/البنك الممول">
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                        </Select>
                        <Input size="md" label="الموظف المتابعfollow-up employee" />
                        <Input size="md" label="المشرفadmin" />
                        <Input size="md" label="هوية العميلClient ID" />
                        <Input size="md" label="قيم العقار الاصليoriginal property values" />
                        {/* Dropdown */}
                        <Select label="نوع العقارtype of property">
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                        </Select>
                        {/* Dropdown */}
                        <Select label="requested service/الخدمة المطلوبة">
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
                            <Radio id="html" name="type" label="يوجد ضامن" />
                            <Radio id="react" name="type" label="لا يوجد ضامن" defaultChecked />
                        </div>

                        {/* Dropdown */}
                        <Select label="Knowing the customer ">
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                        </Select>

                        {/* Dropdown */}
                        <Select label="مدينة العقار city of the property">
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                            <Option>نوع العقارtype of property</Option>
                        </Select>

                        <Input size="md" label="جوال المالك/Owner phone" />
                    </NewOrderSectionFormContainer>
                    <NewOrderSectionFormContainer>
                        <div className="col-span-4">
                            <Textarea label="Explain the client's situation/شرح حالة العميل" />
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
                        <AttachmentTable />
                    </div>
                    <Button className="flex ml-auto mr-4 mb-4">إضافة مستند مطلوب</Button>
                </NewOrderSection>

                {/* Section Four */}
                <NewOrderSection>
                    {/* Two Table In single Column */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-4">
                        {/* Left Table */}
                        <DeletionTable />
                        <NewOrderSectionFormContainerTwoCol>
                            {/* Dropdown */}
                            <Select label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>

                            <Input size="md" label="المشرفadmin" />

                            {/* Dropdown */}
                            <Select label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>
                            {/* Dropdown */}
                            <Select label="مدينة العقار city of the property">
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                                <Option>نوع العقارtype of property</Option>
                            </Select>
                        </NewOrderSectionFormContainerTwoCol>
                    </div>
                    <Button className="flex  ml-4 mb-4">إضافة مستند مطلوب</Button>
                </NewOrderSection>
                <NewOrderFinalActionButtonContainer>
                    <Button className="px-16 py-4" color="green">
                        إكمال/Completed
                    </Button>
                    <Button className="px-16 py-4" color="blue">
                        إكتملت المهمة/Completed
                    </Button>
                    <Button className="px-16 py-4" color="orange">
                        تأجيل/Delay
                    </Button>
                    <Button className="px-16 py-4" color="red">
                        إلغاء الطلب/ Cancel Order
                    </Button>
                </NewOrderFinalActionButtonContainer>
            </NewOrderSectionContainer>
        </Container>
    );
};

export default NewOrder;
