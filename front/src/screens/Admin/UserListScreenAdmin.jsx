//react
import React from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux'

//bootstrap
import {LinkContainer} from 'react-router-bootstrap'

//components
import Message from '../../components/Message'
import Loader from '../../components/Loader'

//slice
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApiSlice'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function UserListScreenAdmin() {

    const {data:users, refetch, isLoading, error,} = useGetUsersQuery()
    console.log(users)
    const [deleteUser, { isLoading: loadingDelete }] =
    useDeleteUserMutation();
    
    const deleteHandler = async(id) => {
        if (window.confirm('Are you sure')){
            try {
                await deleteUser(id)
                toast.success('Product deleted successfully')
                refetch()
            } catch (error) {
                toast.error(err?.data?.message || err.error);
            }
        }
        
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col><h1>Users</h1></Col>
                {/* <Col className='text-end'>
                    <LinkContainer to={`/admin/addproduct`}>
                        <Button className='btn-sm m-3'>Create Product</Button>
                    </LinkContainer>
                </Col> */}
            </Row>
            {loadingDelete && <Loader />}
            {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>JOINED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((x) => (
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.isAdmin ? 'Yes' : 'No'}</td>
                                <td>{x.createdAt.substring(0,10)}</td>
                                <td>
                                    <LinkContainer to={`/admin/edituser/${x._id}`}>
                                        <Button variant='light' className='btn-sm ms-2'>Edit</Button>
                                    </LinkContainer>
                                    <Button onClick={() => deleteHandler(x._id)} variant='danger' className='btn-sm ms-2'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
