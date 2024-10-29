//react
import React from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux'

//bootstrap
import {LinkContainer} from 'react-router-bootstrap'

//components
import Message from '../components/Message'
import Loader from '../components/Loader'

//slice
import { useGetAllOrdersQuery } from '../slices/orderApiSlice'
import { Table, Button } from 'react-bootstrap'

export default function OrderListScreen() {
  const {data:orders, isLoading, isError:error} = useGetAllOrdersQuery()
  console.log(orders)
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.user.name}</td>
                <td>{x.createdAt.substring(0,10)}</td>
                <td>{x.totalPrice}</td>
                <td>{x.isPaid ? (
                  x.paidAt.substring(0,10)
                ) : (
                  'No'
                )}</td>
                <td>{x.isDelivered ? (
                  x.deliveredAt.substring(0,10)
                ) : (
                  'No'
                )}</td>
                <td>
                  <LinkContainer to={`/order/${x._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
