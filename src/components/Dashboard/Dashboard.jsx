import { useContext, useEffect, useState } from "react";
import Container from "../widgets/Container";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import OverDueOrders from "./OverDueOrders";
import NewOrders from "./NewOrders";
import OrderTimelineModal from "./OrderTimelineModal";
import { OtherContext } from "../../contexts/OtherContexts";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../Shared/Loading";
import ErrorPage from "../Shared/ErrorPage";
import axios, { all } from "axios";
import AllOrders from "./AllOrders";

export default function Dashboard() {
    const { overDueOrders } = useContext(OtherContext);
    const [orderTimeline, setOrderTimeline] = useState([]);
    const { userID } = useContext(AuthContext);
    const navigate = useNavigate();
    // Modal States
    const [openAddUpdates, setOpenAddUpdates] = useState(false);
    // Modal Handlers
    const handleOpenAddUpdates = (order_id) => {
        setOpenAddUpdates(!openAddUpdates)
     
        if (openAddUpdates === false) {
            const formData = new FormData();
            console.log(order_id)
            formData.append("order_id", order_id);
            axios.post("https://miftahaldaar.ratina.co/order/get", 
                formData
            , {
                headers: {
                    "user-id": userID,
                    "auth-key": "sdofmasdmfasdmflkmasdf",
                }
            }).then(res => {
setOrderTimeline(res.data.order.timeline)
            }).catch(err => {
                console.log(err)
            })
         
        }
    };

    // Other States
    const [select, setSelect] = useState("overdue");
    const [dueOrders, setDueOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failedToFetch, setFailedToFetch] = useState(false);
    const { setOverDueOrderCounts } = useContext(OtherContext);

   useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const headers = {
      "user-id": userID,
      "auth-key": "sdofmasdmfasdmflkmasdf",
    };
    try {
        const [ allRes, delayedRes, newRes] = await Promise.all([
        axios.get("https://miftahaldaar.ratina.co/orders/all", { headers }),
        axios.get("https://miftahaldaar.ratina.co/orders/delayed_orders", { headers }),
        axios.get("https://miftahaldaar.ratina.co/orders/new_orders", { headers })
      ]);

      // If failed to fetch
        if (delayedRes.data.status !== true || newRes.data.status !== true
       || allRes.data.status !== true ) {
        setLoading(false);
        return setFailedToFetch(true);
      }

      setLoading(false);
        setFailedToFetch(false);
        console.log(allRes.data.orders)
      setAllOrders(allRes.data.orders);
      setDueOrders(delayedRes.data.orders);
      setOverDueOrderCounts(delayedRes.data.orders.length);
      setNewOrders(newRes.data.orders);
      setOverDueOrderCounts(newRes.data.orders.length);
    } catch (error) {
      console.error(error);
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
        <>
            <main>
                <Container>
                    <div className="flex flex-col justify-center">
                        {/* Action Buttons */}
                        <div className="my-5 mx-auto">
                            <ButtonGroup size="md">
                                <Button onClick={() => navigate("new_order")}>اضافة طلب جديد</Button>
                                <Button
                               onClick={() => setSelect("allOrders")} className="flex items-center">
                                      <span className="bg-red-500 p-2 rounded-full mr-3">{allOrders.length}</span>
                                    <p>
                                    جميع المتطلبات
                                    </p>
                               
                                      
                               
                               
                               
                                </Button>
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

                        {select === "allOrders" && <AllOrders allOrders={allOrders}
                            handleOpenAddUpdates={handleOpenAddUpdates}
                        />}
                        {select === "overdue" && <OverDueOrders dueOrders={dueOrders}
                            handleOpenAddUpdates={handleOpenAddUpdates}
                        />}
                        {select === "neworders" && (
                            <NewOrders newOrders={newOrders} handleOpenAddUpdates={handleOpenAddUpdates} />
                        )}
                    </div>
                </Container>
            </main>
            <OrderTimelineModal orderTimeline={orderTimeline} openAddUpdates={openAddUpdates} handleOpenAddUpdates={handleOpenAddUpdates} setOpenAddUpdates={setOpenAddUpdates} />
        </>
    );
}
