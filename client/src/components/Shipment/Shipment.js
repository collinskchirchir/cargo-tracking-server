import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Package from './ShipmentPackages/Packages'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function Shipment() {
    const { shipmentId }  = useParams()
    const [ shipment, setShipment ] = useState({})
    // const [ onePackage, setOnePackage ] = useState({})
    const [show, setShow] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [showThree, setShowThree] = useState(false);
    const [packagesArr, setPackagesArr] = useState([]);
    const [packageId, setPackageId] = useState(0)
 
    const [pckgId, setPckgId] = useState(0);
    const [isPaid ,setIsPaid] = useState(false);

    const [updateShipmentData, setUpdateShipmentData] = useState({
        origin: "",
        destination: "",
        departure: "",
        arrival: "",
        rate_per_cbm: "",
        container_size_in_feet: "",
        status: "",
    })

    const [updatePackageData, setUpdatePackageData] = useState({
        full_name: "",
        phone_contact: "",
        email: "",
        cost: "",
        paid_status: "",
    })

    const capitalizedShipmentKeys = Object.keys(shipment).map((shipmentKey) => {
        return shipmentKey.charAt(0).toUpperCase() + shipmentKey.slice(1)
    })

    const handleClose = () => setShow(false);
    const handleCloseTwo = () => setShowTwo(false);
    const handleCloseThree = () => setShowThree(false);
    const handleShow = () => setShow(true);  
    const handleShowTwo = () => setShowTwo(true);  
    const handleShowThree = (id) => {
        setShowThree(true)
        fetch(`/packages/${id}`)
         .then(r => r.json())
         .then(data => {setUpdatePackageData(data); setPackageId(data.id)} )
    };  

    const shouldLog = useRef(true)
    useEffect(() => {
        if(shouldLog.current) {
            shouldLog.current = false
            fetch(`/shipments/${shipmentId}`)
            .then(r => r.json())
            .then((data) => {setShipment(data); setPackagesArr(data.packages); setPckgId(data.packages.length); setUpdateShipmentData(data)})
        }
    }, [shipmentId])

    

    const [ formData, setFormData ] = useState({
        full_name: "",
        height: "",
        width: "",
        depth: "",
        email: "",
        shipment_id: shipmentId,
        user_id: 1,
        phone_contact: "",
        cost: "",
        paid_status: isPaid
    })

    function handleUpdatePackageChange(e){
        setUpdatePackageData({
            ...updatePackageData,
            [e.target.name]: e.target.value
        })

        console.log(updatePackageData);
    }

    function handleUpdateChange(e){
        setUpdateShipmentData({
            ...updateShipmentData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmitChange() {
        fetch(`/shipments/${shipmentId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(updateShipmentData)
        })
        .then(r => r.json())
        .then(data => setShipment(data))
    }

    function handleSubmitPackageChange(id) {
        fetch(`/packages/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(updatePackageData)
        })
        .then(r => r.json())
        .then(data => setPackagesArr([...packagesArr,data]))
    }

    function handleInput(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    function handleDelete(id){
        fetch(`/packages/${id}`, {
            method: 'DELETE'
        })
        setPackagesArr(packagesArr.filter(onepackage => onepackage.id !== id))
    }

    function handleSubmit(){
        setPckgId(packagesArr.length + 1)
        setIsPaid(false)

        fetch('/packages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
         .then(r => r.json())
         .then(data => setPackagesArr([...packagesArr, data]));
    }

  return (
    <div className='p-5 m-0'>
      <div className="overflow-hidden rounded-lg bg-white shadow mt-5">
        <div className="bg-white p-6 pt-1">
            <Link to={'/admin'} className='btn btn-sm bg-gray-100 hover:bg-gray-200'>Go Back</Link>
            <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
                <div className="mt-4 sm:mt-0 sm:pt-1 sm:text-left">
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">Shipment No: {shipment.id}</p>
                </div>
            </div>
            <button onClick={() => {handleShowTwo()}} className='mt-4 btn btn-sm bg-green-600 hover:bg-green-700 text-white text-sm font-medium'>Update</button>
            </div>
        </div>
        <div className="grid grid-cols-1 divide-x divide-y divide-gray-200 border-t border-b border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">{capitalizedShipmentKeys[1]}: </span> <span className="text-gray-600">{shipment.origin}</span>
            </div>
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">{capitalizedShipmentKeys[2]}: </span> <span className="text-gray-600">{shipment.destination}</span>
            </div>
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">{capitalizedShipmentKeys[3]}: </span> <span className="text-gray-600">{shipment.departure}</span>
            </div>
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">{capitalizedShipmentKeys[4]}: </span> <span className="text-gray-600">{shipment.arrival}</span>
            </div>
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">Status: </span> <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    {shipment.has_landed ? "Landed" : "In Transit"}
                </span>
            </div>
            <div className="p-3 text-center text-sm font-medium">
                <span className="text-gray-900">Rate Per Cubic meter( $ ) </span> <span className="text-gray-600">{shipment.rate_per_cbm}</span>
            </div>
        </div>
        <div className="sm:flex sm:items-center mt-10">
            <div className="sm:flex-auto justify-center items-center mt-10">
                <h1 className="text-xl font-semibold text-gray-900 ml-10">Packages</h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex sm:justify-center sm:items-center">
                <button
                    className="rounded-md border border-transparent bg-indigo-600 mr-10 pr-5 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={handleShow}
                >
                    Add Package
                </button>
            </div>
        </div>
        <div className="mt-8 flex flex-col border-t border-b">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                                </th>
                                <th scope="col" className="py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Contact Info
                                </th>
                                <th scope="col" className="py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Email
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Cost ( $ )
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Paid Status
                                </th>
                                <th scope="col" className="relative py-3.5 pl-0 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-0 pr-4 sm:pr-6">
                                <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {packagesArr?.map((onePackage, index) => (
                                <Package onePackage={onePackage} handleShowThree={handleShowThree} handleDelete={handleDelete} key={index} id={pckgId}/>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} >
            <form>
                <Modal.Header closebutton>
                    <Modal.Title>Package Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control onInput={handleInput} name="full_name" type="text" placeholder='Cristiano Ronaldo' required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onInput={handleInput}
                            type="email"
                            placeholder="siiiuu@gmail.com"
                            name="email"
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onInput={handleInput} name="phone_contact" type="tel" placeholder="07-48-023-877" pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{3}" required/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Height (m)</Form.Label>
                        <Form.Control onInput={handleInput} name="height" type="number" placeholder='2.4'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Width (m)</Form.Label>
                        <Form.Control onInput={handleInput} name="width" type="number" placeholder='3.2'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Depth (m)</Form.Label>
                        <Form.Control onInput={handleInput} name="depth" type="number" placeholder='1.4 '/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Cost in Dollars</Form.Label>
                        <Form.Control onChange={handleInput} name="cost" type="number" placeholder="80000"/>
                    </Form.Group>
                    <fieldset className="space-y-2">
                        <legend className="sr-only">Notifications</legend>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="paid_status"
                                value={isPaid}
                                type="checkbox"
                                onChange={(e) => {handleInput(e); setIsPaid(!isPaid) }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium">
                                    Paid
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <button  className='btn bg-red-600 text-white hover:bg-red-700' onClick={handleClose}>
                        Close
                    </button>
                    <button type='submit' className=' btn bg-indigo-600 text-white hover:bg-indigo-700' onClick={() => {handleClose(); handleSubmit()}}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
        <Modal show={showTwo} onHide={handleCloseTwo} >
            <form>
                <Modal.Header closebutton>
                    <Modal.Title>Modal 2</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label >Origin</Form.Label>
                        <Form.Control value={updateShipmentData.origin} onChange={handleUpdateChange} name="origin" type="text" placeholder='Cambodia' required/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Destination</Form.Label>
                        <Form.Control value={updateShipmentData.destination} onChange={handleUpdateChange} name="destination" type="text" placeholder="Russia" pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{3}" required/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Departure</Form.Label>
                        <Form.Control value={updateShipmentData.departure} onChange={handleUpdateChange} name="departure" type="date" placeholder='2.4'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Arrival</Form.Label>
                        <Form.Control value={updateShipmentData.arrival} onChange={handleUpdateChange} name="arrival" type="date"/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Status</Form.Label>
                        <Form.Control value={updateShipmentData.status} onChange={handleUpdateChange} name="status" type="text" placeholder='In Transit'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Rate Per CBM</Form.Label>
                        <Form.Control value={updateShipmentData.rate_per_cbm} onChange={handleUpdateChange} name="rate_per_cbm" type="number"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button  className='btn bg-red-600 text-white hover:bg-red-700' onClick={handleCloseTwo}>
                        Close
                    </button>
                    <button 
                    type='submit' 
                    className='btn bg-indigo-600 text-white hover:bg-indigo-700' 
                    onClick={() => {handleCloseTwo(); handleSubmitChange()}}
                    >
                        Save Changes
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
        <Modal show={showThree} onHide={handleCloseThree} >
            <form>
                <Modal.Header closebutton>
                    <Modal.Title>Modal 3</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label >Name</Form.Label>
                        <Form.Control value={updatePackageData.full_name} onChange={handleUpdatePackageChange} name="full_name" type="text" placeholder='Cambodia' required/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control value={updatePackageData.phone_contact} onChange={handleUpdatePackageChange} name="phone_contact" type="tel" placeholder="e.g 0783562637" required/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={updatePackageData.email} onChange={handleUpdatePackageChange} name="email" type="email" placeholder='me@example.com'/>
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Cost</Form.Label>
                        <Form.Control value={updatePackageData.cost} onChange={handleUpdatePackageChange} name="cost" type="number"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button  className='btn bg-red-600 text-white hover:bg-red-700' onClick={handleCloseThree}>
                        Close
                    </button>
                    <button 
                    type='submit' 
                    className='btn bg-indigo-600 text-white hover:bg-indigo-700' 
                    onClick={() => {handleCloseThree(); handleSubmitPackageChange(packageId)}}
                    >
                        Save Changes
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
      </div>
    </div>
  )
}

export default Shipment
