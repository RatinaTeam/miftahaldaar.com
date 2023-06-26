import React, { createContext, useEffect, useState } from "react";

export const OtherContext = createContext();

const OtherProvider = ({ children }) => {
    // States
    const [overDueOrdersCount, setOverDueOrderCounts] = useState(true);
    const [newOrdersCount, setOverDueOrders] = useState(true);

    const [attachments, setAttachments] = useState({});
    const [detailsDataJson, setDetailsDataJson] = useState({});

    const providerValue = {
        overDueOrdersCount,
        setOverDueOrderCounts,
        newOrdersCount,
        setOverDueOrders,
        setAttachments,
        attachments,
        detailsDataJson,
        setDetailsDataJson
    };

    return <OtherContext.Provider value={providerValue}>{children}</OtherContext.Provider>;
};

export default OtherProvider;
