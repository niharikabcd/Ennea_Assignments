import { useState,memo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Datepic from './Components/Datepic'
import ModalInput from './Components/ModalInput'
import InputSearch from './Components/InputSearch'
import { InputContextProvider } from './InputContext'
import TableComp from './Components/Table'
import { NewItemContextProvider } from './NewItemContext'
import { Space,Card } from 'antd'
import { CalendarTwoTone } from '@ant-design/icons';


function App() {
    console.log('app is rendering...')
    const {Meta}=Card
    return (
    <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
    >
    <Card hoverable icon= {<CalendarTwoTone/>}title="DatePicker" size="small">
    <h2>Select a date</h2>
    <Datepic/>
    </Card>
    <Card hoverable title='Add new Product' size='small'>
    <NewItemContextProvider>
      <ModalInput/>
    </NewItemContextProvider>
    </Card>
    <Card hoverable title='Search for a Product' size='small'>
    <InputContextProvider>
      <InputSearch/>
      <TableComp/>
    </InputContextProvider>
    <Meta title='End of the page'/>
    </Card>
    </Space>
  )
}

export default (App);
