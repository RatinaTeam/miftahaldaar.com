import { useContext, useEffect, useState } from "react";
import Container from "../widgets/Container";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import OverDueOrders from "./OverDueOrders";
import NewOrders from "./NewOrders";
import OrderTimelineModal from "./OrderTimelineModal";
import { OtherContext } from "../../contexts/OtherContexts";
import Loading from "../Shared/Loading";
import ErrorPage from "../Shared/ErrorPage";
import axios from "axios";

export default function Dashboard() {
    const { overDueOrders } = useContext(OtherContext);
    const navigate = useNavigate();
    // Modal States
    const [openAddUpdates, setOpenAddUpdates] = useState(false);
    // Modal Handlers
    const handleOpenAddUpdates = () => setOpenAddUpdates(!openAddUpdates);

    // Other States
    const [select, setSelect] = useState("overdue");
    const [dueOrders, setDueOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failedToFetch, setFailedToFetch] = useState(false);
    const { setOverDueOrderCounts } = useContext(OtherContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const headers = {
                "user-id": "1010",
                "auth-key": "sdofmasdmfasdmflkmasdf",
            };
            const res = await axios.get("https://miftahaldaar.ratina.co/orders/all_orders", { headers });
console.log(res)
            // If failed to fetch
            if (res.data.status !== true) {
                setLoading(false);
                return setFailedToFetch(true);
            }

            setLoading(false);
            setFailedToFetch(false);
            setDueOrders(res.data.orders);
            setOverDueOrderCounts(res.data.orders.length);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const headers = {
                "user-id": "1010",
                "auth-key": "sdofmasdmfasdmflkmasdf",
            };
            const res = await axios.get("https://miftahaldaar.ratina.co/orders/new_orders", { headers });

            // If failed to fetch
            if (res.data.status !== true) {
                setLoading(false);
                return setFailedToFetch(true);
            }

            setLoading(false);
            setFailedToFetch(false);
            setNewOrders(res.data.orders);
            setOverDueOrderCounts(res.data.orders.length);
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
        <>
            <main>
                <Container>
                    <div className="flex flex-col justify-center">
                        {/* Action Buttons */}
                        <div className="my-5 mx-auto">
                            <ButtonGroup size="md">
                                <Button onClick={() => navigate("new_order")}>اضافة طلب جديد</Button>
                                <Button>جميع المتطلبات</Button>
                                <Button onClick={() => setSelect("overdue")} className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{dueOrders.length}</span>
                                    <p>تحديثات الطلبات</p>
                                </Button>
                                <Button onClick={() => setSelect("neworders")} className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{newOrders.length}</span>
                                    <p>المهام</p>
                                </Button>
                            </ButtonGroup>
                        </div>

                        {/* show overdue / neworders */}
                        {select === "overdue" && <OverDueOrders dueOrders={dueOrders} />}
                        {select === "neworders" && (
                            <NewOrders newOrders={newOrders} handleOpenAddUpdates={handleOpenAddUpdates} />
                        )}
                    </div>
                </Container>
            </main>
            <OrderTimelineModal openAddUpdates={openAddUpdates} handleOpenAddUpdates={handleOpenAddUpdates} />
        </>
    );
}
