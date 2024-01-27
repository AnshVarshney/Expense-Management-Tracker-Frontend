import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
import moment from 'moment'
import Analytics from '../components/Layout/Analytics'

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const [allTransaction, setAllTransaction] = useState([])

  const [frequency, setFrequency] = useState('7');

  const [selectedDate, setSelectedDate] = useState([]);

  const [type, setType] = useState("all")

  const [editable, setEditable] = useState(null)
  // const[e,sd]=useRef({});
  // const re = useRef({}) 

  // const SetEditable=async(record) =>{
  //     console.log("rr",re.current)
  //      setEditable(record);
  //     console.log('edit',editable);
  // }
  //   useEffect(()=>{
  // re.current={}
  //   },[editable])

  // console.log("sett",editable)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Refrence',
      dataIndex: 'refrence'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            // console.log(record) 
            //  SetEditable(record)
            // re.current=record;
            setEditable(record)
            // console.log("AA",re.current)
            setShowModal(true)
            // re.current={}
          }
          } />
          <DeleteOutlined onClick={() => handleDelete(record)} className="mx-2" />
        </div>

      )

    }
  ]


  const [viewData, setViewData] = useState('table');

  const getAllTransaction = async () => {
    try {
      // console.log("aaa")
      const user = JSON.parse(localStorage.getItem('user'))
      // const token = JSON.parse(localStorage.getItem('user'));
      // const user=await axios.post('/users/get-user',token);
      // console.log(user)
      // console.log(user._id)
      // setLoading(true)
      // console.log("user", user)
      // const res = await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/get-transaction', {
      //   // userid: user._id,
      //   headers: {
      //     'Authorization': `Bearer ${user}`,
      //     'Content-Type': 'application/json', // Adjust content type as needed
      //   },
      //   frequency,
      //   selectedDate,
      //   type
      // })
      const res = await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/get-transaction', {
        frequency,
        selectedDate,
        type
      }, {
        headers: {
          'Authorization': `Bearer ${user}`,
          // 'Content-Type': 'application/json', // Adjust content type as needed
        },
      });
      // setLoading(false)
      // console.log(res)
      setAllTransaction(res.data.transaction)
      // console.log(res.data.transaction)
    } catch (error) {
      // setLoading(false)
      // console.log(error)
      message.error("Fetch Issue with Transaction")
    }
  }

  useEffect(() => {
    // console.log(editable);
    getAllTransaction();
  }, [frequency, selectedDate, type, loading])

  const handleSubmit = async (values) => {
    // console.log("ref1",re.current)
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if (editable) {
        await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/edit-transaction', {
          payload: {
            ...values,
            // userid: user._id
          },
          transactionId: editable._id
        },{
          headers: {
            'Authorization': `Bearer ${user}`,
            // 'Content-Type': 'application/json', // Adjust content type as needed
          },
        })
        // await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/edit-transaction', {
        //   payload: {
        //     ...values,
        //     userid: user._id
        //   },
        //   transactionId: editable._id
        // })
        setLoading(false)
        message.success("Edited Transaction Successfully")
      }
      else {
        console.log("safsa",values)
        await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/add-transaction', {...values}, {
          headers: {
            'Authorization': `Bearer ${user}`,
            // 'Content-Type': 'application/json', // Adjust content type as needed
          },
        })
        // await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/add-transaction', { ...values, userid: user._id })
        setLoading(false)
        message.success("Transaction Added Successfully")
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false)
      message.error("Failed to add Transaction")
    }
  }

  const handleDelete = async (record) => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log("del",record._id)
    try {
      console.log("del")
      setLoading(true)
      await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/delete-transaction', { transactionId: record._id },{
        headers: {
          'Authorization': `Bearer ${user}`,
          // 'Content-Type': 'application/json', // Adjust content type as needed
        },
      })
      // await axios.post('https://expense-tracker-backend-3od7.onrender.com/api/v1/transaction/delete-transaction', { transactionId: record._id })
      setLoading(false)
      message.success("Transaction Deleted Successfully")
    } catch (error) {
      setLoading(false)
      // console.log(error)
      message.error("Unable to Delete")
    }
  }

  // console.log("ref",re.current)
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="set">
        <div className="filters">

          <div className='switch-icons'>
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
          </div>

          <div className='filter-item'>
            <h6>Select Frequency</h6>
            <Select className='filter-item' value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value='7'>LAST 1 Week</Select.Option>
              <Select.Option value='30'>LAST 1 Month</Select.Option>
              <Select.Option value='365'>LAST 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />)}
          </div>

          <div className='filter-item'>
            <h6>Select Type</h6>
            <Select className='filter-item' value={type} onChange={(values) => setType(values)}>
              <Select.Option className=" select-option" value='all'>ALL</Select.Option>
              <Select.Option className=" select-option" value='income'>INCOME</Select.Option>
              <Select.Option className=" select-option" value='expense'>EXPENSE</Select.Option>
            </Select>
          </div>
          {/* <div className='switch-icons'>
            <UnorderedListOutlined className={`icon mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`icon mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
          </div> */}
          <div className='filter-item-btn'>
            <button className='btn filter-item' onClick={() => setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className="content">
          {
            viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} />
              : <Analytics allTransaction={allTransaction} />
          }
           {/* <Table columns={columns} dataSource={allTransaction}/> */}
        </div>
      </div>
      <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        {/* initialValues={editable} */}
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text' />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className='btn btn-primary'>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
