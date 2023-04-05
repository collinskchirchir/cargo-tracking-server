import { RiShip2Fill } from 'react-icons/ri'
import { FiPackage } from 'react-icons/fi'
import { FaMoneyBillWave } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import {Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Paginate from './Paginate';
import './admin.css'

export default function AdminDash() {  
    const [show, setShow] = useState(false);
    const [shipments, setShipmentsArr]= useState([])
    const stats = [
        { id: 1, name: 'Total Packages', stat: '71,897', icon: FiPackage, change: '122', changeType: 'increase' },
        { id: 2, name: 'Shipments in transit', stat: shipments.length, icon: RiShip2Fill, change: '5.4%', changeType: 'increase' },
        { id: 3, name: 'Pending Payments', stat: 'Ksh 15,000,000', icon: FaMoneyBillWave, change: '3.2%', changeType: 'decrease' },
      ]    
    const [currentPage, setCurrentPage] = useState(1)
    const [shipmentsPerPage] = useState(5)
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departure: "",
        arrival: "",
        container_size_in_feet: "",
        status: "",
    })
    const indexOfLastShipment = currentPage * shipmentsPerPage //5
    const indexOfFirstShipment = indexOfLastShipment - shipmentsPerPage //0
    const currentShipments = shipments.slice(indexOfFirstShipment , indexOfLastShipment)

    useEffect(()=>{
        fetch('/shipments')
         .then(response => response.json())
        .then(shipments=> setShipmentsArr(shipments))
    },[])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    function handleSubmit(){
        fetch('/shipments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
         .then(r => r.json())
         .then((data) =>setShipmentsArr([...shipments, data]))
    }

    function handleDelete(id){
        fetch(`/shipments/${id}`, {
            method: 'DELETE'
        })
        setShipmentsArr(shipments.filter(shipment => shipment.id !== id))
    }
    return (
        <>
            <div className='p-5 m-0'>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Last 30 days</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-5 shadow sm:px-6 sm:pt-6"
                    >
                    <dt>
                        <div className="absolute rounded-md button p-3">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                    </dd>
                    </div>
                ))}
                </dl>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 shipments-table">
                <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Shipments</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={handleShow}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add Shipment
                    </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Order Id
                                </th>
                                <th scope="col" className="py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Origin
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Destination
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Depature
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Arrival
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Container Size (Feet)
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Rate Per CBM
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {currentShipments.map((shipment) => (
                                <tr key={shipment.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-1 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                    <div className="text-800">{shipment.id}</div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                    <div className="ml-0">
                                        <div className="font-medium text-gray-900">{shipment.origin}</div>
                                    </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">{shipment.destination}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {shipment.departure}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {shipment.arrival}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {shipment.container_size_in_feet}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        {shipment.has_landed ? "Landed" : "In Transit"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {shipment.rate_per_cbm}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link to={`/shipment/${shipment.id}`} className="text-indigo-600 hover:text-indigo-900">
                                    View
                                    </Link>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button onClick={() => handleDelete(shipment.id)}  className="text-red-600 hover:text-red-700">
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Paginate shipmentsPerPage={shipmentsPerPage} totalShipments={shipments.length} paginate ={paginate}/>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closebutton>
                    <Modal.Title>Shipment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Origin</Form.Label>
                        <Form.Control
                            type="text"
                            name="origin"
                            placeholder="e.g China"
                            autoFocus
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    
                    >
                        <Form.Label>Destination</Form.Label>
                        <Form.Control name="destination" type="text" placeholder="e.g Denmark" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Departure Date</Form.Label>
                        <Form.Control name='departure' type="date" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Estimated Arrival Date</Form.Label>
                        <Form.Control name='arrival' type="date" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Container Size</Form.Label>
                        <Form.Control onChange={handleChange} name="container_size_in_feet" type="text" placeholder='e.g 50 feet'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Rate per CBM</Form.Label>
                        <Form.Control name="rate_per_cbm" type="number" placeholder="80" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Status</Form.Label>
                        <Form.Control name="status" type="text" placeholder='In Transit' onChange={handleChange}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button  className='btn bg-red-600 text-white hover:bg-red-700' onClick={handleClose}>
                        Close
                    </button>
                    <button className=' btn bg-indigo-600 text-white hover:bg-indigo-700' onClick={()=> {handleClose(); handleSubmit()}}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
  }