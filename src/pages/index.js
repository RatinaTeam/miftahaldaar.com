import { Inter } from "next/font/google";
import { ActionButtonsContainer, ButtonWithCounter } from "@/components/shared/StyledComponents";
import NewOrders from "@/components/ui/dashboard/NewOrders";
import OverDueOrders from "@/components/ui/dashboard/OverDueOrders";
import Container from "@/components/widgets/Container";
import { Badge, Button, ButtonGroup } from "@material-tailwind/react";
import React, { useState } from "react";
import Head from "next/head";
import OrderTimelineModal from "@/components/ui/dashboard/OrderTimelineModal";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // Modal States
    const [openAddUpdates, setOpenAddUpdates] = useState(false);
    // Modal Handlers
    const handleOpenAddUpdates = () => setOpenAddUpdates(!openAddUpdates);

    // Other States
    const [select, setSelect] = useState("overdue");

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className={`${inter.className}`}>
                <Container>
                    <div className="flex flex-col justify-center">
                        {/* Action Buttons */}
                        <div className="mt-10 mb-5 mx-auto">
                            <ButtonGroup size="md">
                                <Button>
                                    <Link href={"new_order"} className="w-full h-full inline-block">
                                        اضافة طلب جديد <br /> New Order
                                    </Link>
                                </Button>
                                <Button>
                                    جميع المتطلبات
                                    <br /> All Order
                                </Button>
                                <Button onClick={() => setSelect("overdue")} className="flex">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">78</span>
                                    <p>
                                        تحديثات الطلبات
                                        <br />
                                        Overdue Orders
                                    </p>
                                </Button>
                                <Button onClick={() => setSelect("neworders")} className="flex">
                                    <span className="bg-red-500 p-2 rounded-full mr-3">12</span>
                                    <p>
                                        المهام
                                        <br />
                                        New Orders
                                    </p>
                                </Button>
                            </ButtonGroup>
                        </div>

                        {/* show overdue / neworders */}
                        {select === "overdue" && <OverDueOrders />}
                        {select === "neworders" && <NewOrders handleOpenAddUpdates={handleOpenAddUpdates} />}
                    </div>
                </Container>
            </main>
            <OrderTimelineModal openAddUpdates={openAddUpdates} handleOpenAddUpdates={handleOpenAddUpdates} />
        </>
    );
}
