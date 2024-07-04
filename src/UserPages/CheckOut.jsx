import React, { useState, useEffect } from "react";
import Province from "../Resources/Province";
import District from "../Resources/District";
import Ward from "../Resources/Wards";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

export default function CheckOut() {
    const baseURLCart = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart/";
    const baseURLAccount = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
    const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";
    const userId = sessionStorage.getItem('userId');

    const [account, setAccount] = useState({});
    const [cart, setCart] = useState([]);
    
    const [selectedProvince, setSelectedProvince] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredWards, setFilteredWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch(baseURLAccount + `${userId}`)
            .then(res => res.json())
            .then(data => {
                setAccount(data);
                setName(data.fullname);
                setEmail(data.email);
                setPhone(data.phone);
            })
            .catch(error => console.log(error));

        fetch(baseURLCart)
            .then(res => res.json())
            .then(data => setCart(data.filter(item => item.userID === userId)))
            .catch(error => console.log(error));
    }, [userId]);

    useEffect(() => {
        if (selectedProvince) {
            const province = Province.find(p => p.name === selectedProvince);
            if (province) {
                const districts = District.filter(d => d.province_id === province.province_id);
                setFilteredDistricts(districts);
            }
        } else {
            setFilteredDistricts([]);
        }
        setSelectedDistrict('');
        setFilteredWards([]);
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const district = District.find(d => d.name === selectedDistrict);
            if (district) {
                const wards = Ward.filter(w => w.district_id === district.district_id);
                setFilteredWards(wards);
            }
        } else {
            setFilteredWards([]);
        }
        setSelectedWard('');
    }, [selectedDistrict]);

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const handlePlaceOrder = () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const fullAddress = `${selectedProvince}, ${selectedDistrict}, ${selectedWard}, ${address}`;
        
        const orderDetails = {
            address: fullAddress,
            name: name,
            total: total,
            detail: cart,
            phone: phone,
            userID: userId,
            status: "pending"
        };

        fetch(baseURLBill, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Order placed successfully:", data);
            // Remove all cart items after successful order placement
            cart.forEach(item => {
                fetch(baseURLCart + item.id, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        console.log(`Cart item ${item.id} removed successfully`);
                    } else {
                        console.error(`Failed to remove cart item ${item.id}`);
                    }
                })
                .catch(error => console.error(`Error removing cart item ${item.id}:`, error));
            });
        })
        .catch(error => {
            console.error("Error placing order:", error);
        });
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="Name.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Email.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Phone.ControlInput2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0123456789"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ProvinceSelect">
                    <Form.Label>Province</Form.Label>
                    <Form.Select aria-label="Province select" onChange={handleProvinceChange}>
                        <option value="">Select a province</option>
                        {Province.map((province) => (
                            <option key={province.province_id} value={province.name}>{province.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="DistrictSelect">
                    <Form.Label>District</Form.Label>
                    <Form.Select aria-label="District select" onChange={handleDistrictChange} disabled={!selectedProvince}>
                        <option value="">Select a district</option>
                        {filteredDistricts.map((district) => (
                            <option key={district.district_id} value={district.name}>{district.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="WardSelect">
                    <Form.Label>Ward</Form.Label>
                    <Form.Select aria-label="Ward select" onChange={handleWardChange} disabled={!selectedDistrict}>
                        <option value="">Select a ward</option>
                        {filteredWards.map((ward) => (
                            <option key={ward.wards_id} value={ward.name}>{ward.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Address.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={handlePlaceOrder}>Place order</Button>
            </Form>
        </>
    );
}
