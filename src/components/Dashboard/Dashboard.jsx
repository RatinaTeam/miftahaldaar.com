import { useContext, useEffect, useRef, useState } from "react";
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
    const { overDueOrders, } = useContext(OtherContext);
    ;
    const { searchQuery, setSearchQuery } = useContext(OtherContext);
    const [orderUpdateOn, setOrderUpdateOn] = useState(false);
    // setOrderUpdateOn(false);
    const [orderTimeline, setOrderTimeline] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [allOrdersCount, setAllOrdersCount] = useState(0);
    const [overDueOrdersCount, setOverDueOrdersCount] = useState(0);
    const [newOrdersCount, setNewOrdersCount] = useState(0);
    const { userID, authKey } = useContext(AuthContext);
    const navigate = useNavigate();
    // Modal States
    const [openAddUpdates, setOpenAddUpdates] = useState(false);
    // Modal Handlers
    const handleOpenAddUpdates = (order_id) => {
        setOpenAddUpdates(!openAddUpdates)

        if (openAddUpdates === false) {
            const formData = new FormData();
            formData.append("order_id", order_id);
            axios.post("https://miftahaldaar.ratina.co/order/get",
                formData
                , {
                    headers: {
                        "user-id": userID,
                        "auth-key": authKey,
                    }
                }).then(res => {
                    setOrderId(order_id);
                    setOrderTimeline(res.data.order.timeline)
                }).catch(err => {
                    console.log(err)
                })

        }
    };

    // Other States
    const [select, setSelect] = useState("neworders");
    const [dueOrders, setDueOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failedToFetch, setFailedToFetch] = useState(false);
    const { setOverDueOrderCounts } = useContext(OtherContext);



    const [refetchData, setRefetchData] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        let fetchedData = false;
        let oldOrdersNumber = 0;
        let oldDelayedRes = 0;
        let oldNewRes = 0;

        const fetchData = async () => {
            if (!fetchedData && !orderUpdateOn) {
                setLoading(true);
            }

            const headers = {
                "user-id": userID,
                "auth-key": authKey,
            };

            try {
                const newSearchQuery = { ...searchQuery };
                if (orderUpdateOn && Object.keys(newSearchQuery).length === 0) {
                    newSearchQuery['orderUpdateOn'] = orderUpdateOn;
                    // setSearchQuery(newSearchQuery);
                }
                else
                    console.log("orderUpdateOn", orderUpdateOn, "newSearchQuery", Object.keys(newSearchQuery).length)

                // const [params_allRes, params_delayedRes, params_newRes] = [(select=='all'?{...newSearchQuery}:{...newSearchQuery, status: select}), {...newSearchQuery, status: "overdue"}, {...newSearchQuery, status: "new"},]]    
                const defualtParams = { orderUpdateOn: orderUpdateOn };
                let params_allRes, params_delayedRes, params_newRes = [{ ...defualtParams }, { ...defualtParams }, { ...defualtParams }];

                if (select == 'allOrders')
                    params_allRes = newSearchQuery;
                if (select == 'overdue')
                    params_delayedRes = newSearchQuery;
                if (select == 'neworders')
                    params_newRes = newSearchQuery;


                const [allRes, delayedRes, newRes] = await Promise.all([
                    axios.get("https://miftahaldaar.ratina.co/orders/all",
                        {
                            headers: headers,
                            params: newSearchQuery
                        },
                    ),
                    axios.get("https://miftahaldaar.ratina.co/orders/delayed_orders", {
                        headers: headers,
                        params: newSearchQuery
                    }),
                    axios.get("https://miftahaldaar.ratina.co/orders/new_orders", {
                        headers: headers,
                        params: newSearchQuery
                    }),
                ]);
                // If failed to fetch
                if (
                    delayedRes.data.status !== true ||
                    newRes.data.status !== true ||
                    allRes.data.status !== true
                ) {
                    setLoading(false);
                    return setFailedToFetch(true);
                }


                setLoading(false);
                setFailedToFetch(false);


                window.get_orderUpdateOn = () => {
                    console.log(orderUpdateOn)
                }
                if (!allRes.data.loaded) {
                    console.log("is already updated");

                }
                else {
                    setOrderUpdateOn(allRes.data.orderUpdateOn);
                    console.log(allRes.data.loaded)
                    setAllOrders(allRes.data.orders || []);
                    setDueOrders(delayedRes.data.orders || []);
                    setOverDueOrderCounts(delayedRes.data.orders && delayedRes.data.orders.length);
                    setNewOrders(newRes.data.orders || []);
                    setOverDueOrderCounts(newRes.data.orders && newRes.data.orders.length);
                    // if (Object.keys(searchQuery).length === 0) {
                        setNewOrdersCount(newRes.data.count);
                        setOverDueOrdersCount(delayedRes.data.count);
                        setAllOrdersCount(allRes.data.count);
                    // }
                    // else {
                    //     console.log("searchQuery", searchQuery)
                    // }
                    if (fetchedData) {
                        if (allRes.data.orders.length > oldOrdersNumber) {
                            audioRef.current.play();
                        }
                        if (delayedRes.data.orders.length > oldDelayedRes) {
                            audioRef.current.play();
                        }
                        if (newRes.data.orders.length > oldNewRes) {
                            audioRef.current.play();
                        }
                        oldOrdersNumber = allRes.data.orders && allRes.data.orders.length;
                        oldDelayedRes = delayedRes.data.orders && delayedRes.data.orders.length;
                        oldNewRes = newRes.data.orders && newRes.data.orders.length;


                    }

                    if (!fetchedData) {
                        oldOrdersNumber = allRes.data.orders && allRes.data.orders.length;
                        oldDelayedRes = delayedRes.data.orders && delayedRes.data.orders.length;
                        oldNewRes = newRes.data.orders && newRes.data.orders.length;
                        fetchedData = true;
                    }
                }




            } catch (error) {
                console.error(error);
                setLoading(false);
                setFailedToFetch(true);
            }
        };

        fetchData();

        // Refresh data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [refetchData, searchQuery, orderUpdateOn, allOrdersCount, newOrdersCount, overDueOrdersCount]);

    if (loading) {
        return <Loading />;
    }
    if (failedToFetch) {
        return <ErrorPage />;
    }
    // get search query
    // window.printSearchQuery = () => {
    //     console.log(searchQuery)
    // }
    return (
        <>
            <main>
                <audio ref={audioRef} src="notification.mp3" />
                <Container>
                    <div className="flex flex-col justify-center">
                        {/* Action Buttons */}
                        <div className="my-2 mx-auto">
                            <ButtonGroup size="md">
                                <Button onClick={() => { navigate("new_order") }}>اضافة طلب جديد</Button>
                                <Button
                                    onClick={() => {
                                        setSelect("allOrders")
                                        setSearchQuery({ '': 'new' })
                                        setOrderUpdateOn(false)
                                    }
                                    } className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{allOrdersCount}</span>
                                    <p>
                                        جميع المتطلبات
                                    </p>
                                </Button>
                                <Button onClick={() => {
                                    setSelect("overdue")
                                    setSearchQuery({ '': 'new' })
                                    setOrderUpdateOn(false)
                                }} className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{overDueOrdersCount}</span>
                                    <p>تحديثات الطلبات</p>
                                </Button>
                                <Button onClick={() => {
                                    setSearchQuery({ '': 'new' })
                                    setSelect("neworders")
                                    setOrderUpdateOn(false)
                                }
                                } className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{newOrdersCount}</span>
                                    <p>المهام</p>
                                </Button>
                            </ButtonGroup>
                        </div>

                        {select === "allOrders" && <AllOrders allOrders={allOrders}
                            handleOpenAddUpdates={handleOpenAddUpdates}
                            refetchData={() => setRefetchData(!refetchData)}
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
            <OrderTimelineModal orderTimeline={orderTimeline} orderId={orderId} openAddUpdates={openAddUpdates} handleOpenAddUpdates={handleOpenAddUpdates} setOpenAddUpdates={setOpenAddUpdates} />
        </>
    );
}

