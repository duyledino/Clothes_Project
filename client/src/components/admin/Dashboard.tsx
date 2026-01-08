import React, { useEffect } from "react";
import { DoughnutChart } from "./DoughnutChart";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Loading from "../ui/Loading";
import {
  fetchBestCustomer,
  fetchBestSeller,
  fetchRevenue,
} from "@/slice/TrackSlice";
import { toast } from "react-toastify";
import { standardRevenue } from "@/util/RevenueDashboard";
import { standardBestSeller } from "@/util/BestSellerDashboard";
import { standardBestCustomer } from "@/util/BestCustomerDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, error, revenue, bestCustomer, bestSeller } = useAppSelector(
    (state) => state.TrackSlice
  );
  const [filter,setFilter] = React.useState("day");
  useEffect(() => {
    dispatch(fetchBestSeller());
    dispatch(fetchBestCustomer());
  }, []);
  useEffect(()=>{
    dispatch(fetchRevenue(filter));
  },[filter])
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  console.log("revenue", revenue);
  console.log("bestCustomer: ",bestCustomer);
  console.log("Bestseller: ",bestSeller);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div>
        <Select value={filter} onValueChange={(value) => setFilter(value)} defaultValue="day">
          <SelectTrigger>
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-y-12 items-center">
        <div className="col-span-2">
          <LineChart revenue={revenue} />
        </div>
        <div className="xl:col-span-1 col-span-2">
          <DoughnutChart bestSeller={standardBestSeller(bestSeller)} />
        </div>
        <div className="xl:col-span-1 col-span-2">
          <BarChart bestCustomer={standardBestCustomer(bestCustomer)} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
