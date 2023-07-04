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
    const { overDueOrders, orderUpdateOn, setOrderUpdateOn } = useContext(OtherContext);
    ;
    const { searchQuery, setSearchQuery } = useContext(OtherContext);
    // const [orderUpdateOn, setOrderUpdateOn] = useState(0);
    // setOrderUpdateOn(false);
    const [orderTimeline, setOrderTimeline] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [allOrdersCount, setAllOrdersCount] = useState([0]);
    const [overDueOrdersCount, setOverDueOrdersCount] = useState(0);
    const [newOrdersCount, setNewOrdersCount] = useState(0);
    const { userID, authKey } = useContext(AuthContext);
    const navigate = useNavigate();
    // Modal States
    // setOrderUpdateOn(0);
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
    const [firstTime, setFirstTime] = useState(true);
    // console.log("firstTime", firstTime)
    const [lastSearchQuery, setLastSearchQuery] = useState(JSON.stringify(searchQuery));
    const [refetchData, setRefetchData] = useState(false);
    const audioRef = useRef(null);
    window.searchQuery = () => {
        console.log("searchQuery", searchQuery)
    }
    // setOrderUpdateOn(0);
    useEffect(() => {

        let fetchedData = false;
        let oldOrdersNumber = 0;
        let oldDelayedRes = 0;
        let oldNewRes = 0;
        // let lastFetchTime = Date.now();
        // let lastSearchQuery = JSON.stringify(searchQuery);
        
        // setOrderUpdateOn(0)
        const fetchData = async () => {
            // if (!firstTime)
                // return;
            // from /order_updated_on endpont get order_updated_on 
            // if (lastSearchQuery !== JSON.stringify(searchQuery))  {
                const resp = await axios.get("https://miftahaldaar.ratina.co/order_updated_on", {});
                if (resp.data.order_updated_on && resp.data.order_updated_on != orderUpdateOn || lastSearchQuery !== JSON.stringify(searchQuery)|| firstTime === true) {
                    setOrderUpdateOn(resp.data.order_updated_on);
                    setLastSearchQuery(JSON.stringify(searchQuery));
                    setFirstTime({false1: false});
                }
                else {
                    console.log("orderUpdateOn", orderUpdateOn, "resp.data.order_updated_on", resp.data.order_updated_on)
                    return;
                }
            // }
            // else {
            //     console.log("lastSearchQuery", lastSearchQuery, "searchQuery", searchQuery)
            // }


            // const currentTime = Date.now();
            // const timeSinceLastFetch = currentTime - lastFetchTime;
            // if (timeSinceLastFetch < 3000 && lastSearchQuery === searchQuery && !firstTime) {
            //     console.log('lastSearchQuery', lastSearchQuery, searchQuery)
            //     return; // Don't fetch again if the last fetch was within 3 seconds
            // }
            // lastFetchTime = currentTime;
            // lastSearchQuery = { ...searchQuery };
            if (!fetchedData && !orderUpdateOn) {
                // setLoading(true);
            }

            const headers = {
                "user-id": userID,
                "auth-key": authKey,
            };

            // // try {
            // let newSearchQuery;
            // if (searchQuery)
            //     newSearchQuery = { ...searchQuery };
            // else
            //     newSearchQuery = {};

            // if (newSearchQuery['new'])
            //     delete newSearchQuery['new'];
            // let lastUpdateOn = orderUpdateOn;
            // if (firstTime === true) {
            //     lastUpdateOn = 0;
            //     // console.log("firstTime", firstTime)
            //     setFirstTime({ firstTime: false });
            // }
            // else {
            //     //console.log("firstTime", firstTime, "lastUpdateOn", lastUpdateOn)
            // }

            // // if (!newSearchQuery || Object.keys(newSearchQuery).length === 0) {
            // //     newSearchQuery['orderUpdateOn'] = lastUpdateOn;
            // //     setSearchQuery({ ...newSearchQuery });
            // // }
            // // else
            // //     console.log("orderUpdateOn", orderUpdateOn, "newSearchQuery", newSearchQuery, firstTime);

            // // const [params_allRes, params_delayedRes, params_newRes] = [(select=='all'?{...newSearchQuery}:{...newSearchQuery, status: select}), {...newSearchQuery, status: "overdue"}, {...newSearchQuery, status: "new"},]]    
            // // const defualtParams = { orderUpdateOn: orderUpdateOn };
            // let params_allRes, params_delayedRes, params_newRes = [{},{},{}];
            let params_allRes1 = {}, params_delayedRes = {}, params_newRes = {};
            if (select !== 'allOrders')
                params_allRes1 = JSON.parse(JSON.stringify(searchQuery));
            // else
            //     params_allRes = { orderUpdateOn: lastUpdateOn, ...searchQuery };
            if (select !== 'overdue')
                params_delayedRes = searchQuery;
            // else
            //     params_delayedRes = { orderUpdateOn: lastUpdateOn, ...searchQuery };
            if (select !== 'neworders')
                params_newRes = searchQuery;
            // else
            //     params_newRes = { orderUpdateOn: lastUpdateOn, ...searchQuery };

            // console.log("params_allRes", params_allRes, "params_delayedRes", params_delayedRes, "params_newRes", params_newRes)
            const [allRes, delayedRes, newRes] = await Promise.all([
                axios.get("https://miftahaldaar.ratina.co/orders/all",
                {
                    headers: headers,
                    params: searchQuery
                }
                ),
                axios.get("https://miftahaldaar.ratina.co/orders/delayed_orders", {
                    headers: headers,
                    params: params_delayedRes
                }),
                axios.get("https://miftahaldaar.ratina.co/orders/new_orders", {
                    headers: headers,
                    params: params_newRes
                }),
            ]);
            // If failed to fetch

            // console.log("newRes", newRes.data)
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




            // console.log("loaded", allRes.data.loaded, delayedRes.data.loaded, newRes.data.loaded);
            setFirstTime(false);
            setOrderUpdateOn(allRes.data.orderUpdateOn);
            // console.log('here 114 ', allRes.data.orderUpdateOn)
            if (allRes.data.loaded) {
                setAllOrders(allRes.data.orders || []);
            }

            if (delayedRes.data.loaded) {
                setDueOrders(delayedRes.data.orders || []);
            }

            if (newRes.data.loaded) {
                setNewOrders(newRes.data.orders || []);
            }
            // setOverDueOrderCounts(delayedRes.data.count);
            // setOverDueOrderCounts(newRes.data.count);
            // setOverDueOrderCounts(allRes.data.count);
            // if (!searchQuery || Object.keys(searchQuery).length === 0) {
            if (newRes.data.count)
                setNewOrdersCount(newRes.data.count);
            if (delayedRes.data.count)
                setOverDueOrdersCount(delayedRes.data.count);
            if (allRes.data.count)
                setAllOrdersCount(allRes.data.count);
            // }
            else {
                // console.log("searchQuery", searchQuery, "newRes.data.count", newRes.data.count, "delayedRes.data.count", delayedRes.data.count, "allRes.data.count", allRes.data.count)
            }
            // if (fetchedData) {
                // if (allRes.data.orders && allRes.data.orders.length > oldOrdersNumber) {
                //     audioRef.current.play();
                // }
                // if (delayedRes.data.orders && delayedRes.data.orders.length > oldDelayedRes) {
                //     audioRef.current.play();
                // }
                // if (newRes.data.orders && newRes.data.orders.length > oldNewRes) {
                //     audioRef.current.play();
                // }
                // oldOrdersNumber = allRes.data.orders && allRes.data.orders.length;
                // oldDelayedRes = delayedRes.data.orders && delayedRes.data.orders.length;
                // oldNewRes = newRes.data.orders && newRes.data.orders.length;


            // }
            // window.play_sound = () => {
            //     audioRef.current.play();
            // }
            if (!fetchedData) {
                oldOrdersNumber = allRes.data.orders && allRes.data.orders.length;
                oldDelayedRes = delayedRes.data.orders && delayedRes.data.orders.length;
                oldNewRes = newRes.data.orders && newRes.data.orders.length;
                fetchedData = true;
            }





            // } catch (error) {
            //     console.error(error);
            //     setLoading(false);
            //     setFailedToFetch(true);
            // }
        };

        fetchData();

        // Refresh data every 5 seconds
        const interval = setInterval(fetchData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [refetchData, searchQuery, orderUpdateOn, allOrdersCount, newOrdersCount, overDueOrdersCount, firstTime]);

    if (loading) {
        return <Loading />;
    }
    if (failedToFetch) {
        return <ErrorPage />;
    }
    // get search query
    window.orderUpdateOn = () => {
        console.log(orderUpdateOn)
    }
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
                                        setSearchQuery({ 'new': 'new' })
                                        setFirstTime(true)
                                        setOrderUpdateOn(0)
                                    }
                                    } className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{allOrdersCount}</span>
                                    <p>
                                        جميع المتطلبات
                                    </p>
                                </Button>
                                <Button onClick={() => {
                                    setSelect("overdue")
                                    setSearchQuery({ 'new': 'new' })
                                    setFirstTime(true)
                                    setOrderUpdateOn(0)
                                }} className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{overDueOrdersCount}</span>
                                    <p>تحديثات الطلبات</p>
                                </Button>
                                <Button onClick={() => {
                                    setSearchQuery({ 'new': 'new' })
                                    setSelect("neworders")
                                    setFirstTime(true)
                                    setOrderUpdateOn(0)
                                }
                                } className="flex items-center">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">{newOrdersCount}</span>
                                    <p>المهام</p>
                                </Button>
                            </ButtonGroup>
                        </div>

                        {select === "allOrders" && <AllOrders orderList={allOrders}
                            handleOpenAddUpdates={handleOpenAddUpdates}
                            refetchData={() => setRefetchData(!refetchData)}
                        />}
                        {select === "overdue" && <OverDueOrders orderList={dueOrders}
                            handleOpenAddUpdates={handleOpenAddUpdates} refetchData={refetchData}
                        />}
                        {select === "neworders" && (
                            <NewOrders orderList={newOrders} handleOpenAddUpdates={handleOpenAddUpdates} refetchData={refetchData} />
                        )}
                    </div>
                </Container>
            </main>
            <OrderTimelineModal orderTimeline={orderTimeline} orderId={orderId} openAddUpdates={openAddUpdates} handleOpenAddUpdates={handleOpenAddUpdates} setOpenAddUpdates={setOpenAddUpdates} />
        </>
    );
}

