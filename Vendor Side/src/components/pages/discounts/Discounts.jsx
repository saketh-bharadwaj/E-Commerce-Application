import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchProducts } from "../../../redux/features/ProductsDataSlice";
// import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import DiscountProductList from "./DiscountProductList";
// import ApplyDiscount from './ApplyDiscount';
import { FaCircleDollarToSlot, FaChartLine } from "react-icons/fa6";
import { BiReceipt, BiSolidUserAccount } from "react-icons/bi";
import Card from "../../Card/Card";
import CardGraph from "../../Card/CardGraph";
import DonutChart from "./DonutChart";
import TopCategoriesChart2 from "../../Card/TopCategoriesChart2";

const Discounts = () => {
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const themeMode = useSelector((state) => state.theme.mode);
  // const navigate = useNavigate()
  const orders = useSelector((state) => state.ordersData.orders)
  const [sales, setSales] = useState([]);
  const [customerCount, setCustomerCount] = useState(0); // unique customers count
   const [totalSold, setTotalSold] = useState(0); // total products sold
   const productsSold = () => {
     console.log("Calculating total products sold...");
     const total = sales.reduce((acc, sale) => acc + sale.quantity, 0);
     console.log("Total products sold:", total);
     return total;
   };
 
    useEffect(() => {
       if (orders && orders.sales) {
         setSales(orders.sales);
       }
     }, [orders]);
   
    // Update customer count, total products sold when sales change
  useEffect(() => {
    if (sales.length > 0) {
      // Calculate unique customers count from sales
      const uniqueCustomerIds = new Set(sales.map((sale) => sale.custId));
      setCustomerCount(uniqueCustomerIds.size);
      // console.log("Unique customer count:", uniqueCustomerIds.size);

      const total = productsSold();
      setTotalSold(total);

    }
  }, [sales]);


  const weekDataTR = [
    { day: "Monday", revenue: 7234 },
    { day: "Tuesday", revenue: 5601 },
    { day: "Wednesday", revenue: 8992 },
    { day: "Thursday", revenue: 4837 },
    { day: "Friday", revenue: 1073 },
    { day: "Saturday", revenue: 6642 },
    { day: "Sunday", revenue: 9128 },
  ];

  const weekDataTP = [
    { day: "Monday", profit: -101.28 },
    { day: "Tuesday", profit: -78.41 },
    { day: "Wednesday", profit: -125.89 },
    { day: "Thursday", profit: -67.71 },
    { day: "Friday", profit: -15.0 },
    { day: "Saturday", profit: -93.98 },
    { day: "Sunday", profit: -127.79 },
  ];

  const weekDataPS = [
    { day: "Mon", productsSold: 50 },
    { day: "Tue", productsSold: 40 },
    { day: "Wed", productsSold: 30 },
    { day: "Thu", productsSold: 40 },
    { day: "Fri", productsSold: 80 },
    { day: "Sat", productsSold: 20 },
    { day: "Sun", productsSold: 60 },
  ];

  const weekDataTC = [
    { day: "Mon", totalCustomers: 30 },
    { day: "Tue", totalCustomers: 5 },
    { day: "Wed", totalCustomers: 27 },
    { day: "Thu", totalCustomers: 10 },
    { day: "Fri", totalCustomers: 22 },
    { day: "Sat", totalCustomers: 6 },
    { day: "Sun", totalCustomers: 29 },
  ];

 
  const getSecondKeyName = (arr) => {
    // Get the second key name from the first object in the array
    return Object.keys(arr[0])[1];
  }

  const cardDetails = [
    {
      cname: "Total Revenue",
      cicon: <FaCircleDollarToSlot />,
      cvalue: `₹${orders ? orders.totalRevenue?.toLocaleString('en-IN') : 0}`,
      cgraph: orders && orders.totalRevenue > 0 
               ? <CardGraph data={weekDataTR} dataKey={getSecondKeyName(weekDataTR)} dataColor={"#3B82F6"} /> 
               : null,  // Set to null if there's no data or the value is <= 0
      cdelta: orders && orders.totalRevenue > 0 ? "12.5" : "0",
    },
    {
      cname: "Total Profit",
      cicon: <FaChartLine />,
      cvalue: `₹${orders ? orders.totalProfits?.toLocaleString('en-IN') : 0}`,
      cgraph: orders && orders.totalProfits > 0 
               ? <CardGraph data={weekDataTP} dataKey={getSecondKeyName(weekDataTP)} dataColor={"#10B981"} /> 
               : null,  // Set to null if there's no data or the value is <= 0
      cdelta: orders && orders.totalProfits > 0 ? "8.2" : "0",
    },
    {
      cname: "Product Sold",
      cicon: <BiReceipt />,
      cvalue: `${totalSold ? totalSold.toLocaleString("en-IN") : 0}`,
      cgraph: totalSold && totalSold > 0 
               ? <CardGraph data={weekDataPS} dataKey={getSecondKeyName(weekDataPS)} dataColor={"#6B46C1"} /> 
               : null,  // Set to null if there's no data or the value is <= 0
      cdelta: totalSold && totalSold > 0 ? "10" : "0",
    },
    {
      cname: "Total Customers",
      cicon: <BiSolidUserAccount />,
      cvalue: `${customerCount ? customerCount.toLocaleString("en-IN") : 0}`,
      cgraph: customerCount && customerCount > 0 
               ? <CardGraph data={weekDataTC} dataKey={getSecondKeyName(weekDataTC)} dataColor={"#F97316"} /> 
               : null,  // Set to null if there's no data or the value is <= 0
      cdelta: customerCount && customerCount > 0 ? "15" : "0",
    },
  ];
  

  const salesByProducts = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
    { name: "Product E", value: 150 },
    { name: "Product F", value: 250 },
    { name: "Product G", value: 450 },
    { name: "Product H", value: 300 },
    { name: "Product I", value: 180 },
    { name: "Product J", value: 50 },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="h-full">
      <h1 className="pageHeader pl-2">Discounts</h1>

      <div className=" mt-3 h-[86%] ">
        <div className="xl:h-[26%] h-[18%] flex gap-3 mb-4 ">
          {cardDetails.map((cardItem, cindex) => (
            <Card
              key={cindex}
              cname={cardItem.cname}
              cicon={cardItem.cicon}
              cvalue={cardItem.cvalue}
              cgraph={cardItem.cgraph}
              cdelta={cardItem.cdelta}
            />
          ))}
        </div>
        <div className="flex items-center  xl:my-4 2xl:h-[80%] lg:h-[60%] gap-4">
          <div className="w-[65%] h-full rounded-md">
            <DiscountProductList />
          </div>
          <div className={`w-[35%] rounded-md h-full  flex flex-wrap justify-between shadow-lg ${
        themeMode === "theme-mode-dark"
          ? "bg-black text-[#26DC5C]"
          : "gradient-bg-light text-gray-800"
      }`}>
            
            <TopCategoriesChart2 />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Discounts;
