import React, { createContext, useEffect, useState } from "react";

export const OtherContext = createContext();
export const backendURL = "https://srv.miftahaldaar.com";
const OtherProvider = ({ children }) => {
    // States
    const [overDueOrdersCount, setOverDueOrderCounts] = useState(true);
    const [newOrdersCount, setOverDueOrders] = useState(true);

    const [attachments, setAttachments] = useState({});
    const [detailsDataJson, setDetailsDataJson] = useState({});
    const [searchQuery, setSearchQuery] = useState({});
    const [orderUpdateOn, setOrderUpdateOn] = useState(false);
    const providerValue = {
        overDueOrdersCount,
        setOverDueOrderCounts,
        newOrdersCount,
        setOverDueOrders,
        setAttachments,
        attachments,
        detailsDataJson,
        setDetailsDataJson,
        searchQuery,
        setSearchQuery,
        orderUpdateOn,
        setOrderUpdateOn,
    };

    return <OtherContext.Provider value={providerValue}>{children}</OtherContext.Provider>;
};

export default OtherProvider;
export const serverURL = "https://srv.miftahaldaar.com";
export const order_status_translations = {
    PENDING: 'معلق',
    CANCELLED: 'ملغى',
    PARTIALLY_COMPLETED: 'منجز جزئياً',
    COMPLETED: 'منجز',
    ON_PROGRESS: 'قيد التنفيذ',
    DELAYED: 'متأخر',
}
export const user_roles_translations = {
    ADMIN: 'مدير',
    SUPERVISOR: 'مشرف',
    EMPLOYEE: 'موظف',
}
export const default_order_types = [
    "شراء",
    "رهن",
    "بناء ذاتي",
    "ارض وقرض",
    "فك الرهن واعادة الشراء"
]