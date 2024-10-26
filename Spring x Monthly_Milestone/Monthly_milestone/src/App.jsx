import './App.css'
import Datepic from './Components/Datepic'
import ModalInput from './Components/ModalInput'
import InputSearch from './Components/InputSearch'
import { InputContextProvider } from './InputContext'
import TableComp from './Components/Table'
import { NewItemContextProvider } from './NewItemContext'
import { Space,Card } from 'antd'


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
    <h2>Product Manager</h2>
    <Card hoverable title='Add new Product' size='medium'>
    <NewItemContextProvider>
      <ModalInput/>
    </NewItemContextProvider>
    </Card>
    <Card hoverable title="Select Expiry Date" size='medium'>
      <Datepic/>
    </Card>
    <Card hoverable title='Search for a Product' size='medium'>
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
