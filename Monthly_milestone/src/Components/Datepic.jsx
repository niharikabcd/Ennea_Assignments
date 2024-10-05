import React, { useCallback, useMemo,memo } from "react";
import { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { Division } from "../Confirmation";

const { RangePicker }= DatePicker;
const Datepic =() =>{
    console.log('Datepic comp is rendering.esfs..')
    const earlydate=useMemo(()=>(moment().subtract(7, 'days')),[])//story the day 7 days ago in earlydate variable
    const today=useMemo(()=>moment().format('YYYY-MM-DD'),[])//storing today's date in today variable
    const [newDate,setnewDate]=useState([earlydate,moment()])
    const disabledDate = useCallback((current) => {
      console.log('hi')
        if(current<earlydate){
            return true;
        }
      },[earlydate]) //function for disabling dates earlier than 7 days ago and after today
    return (   
    <Division> 
    
    <RangePicker
    onChange={(values)=>{
        setnewDate(values)
    }}
    disabledDate={disabledDate}
    defaultValue={[dayjs(earlydate),dayjs(today)]}
    disabled={[false,true]}
    />

    <h3>The selected date range </h3>
    {newDate && newDate[0] && newDate[1] && (
        <h4>
          From: {newDate[0].format('DD-MM-YYYY')} <br/> To: {newDate[1].format('DD-MM-YYYY')}
        </h4>
      )}
    </Division>
);
}
export default memo(Datepic);