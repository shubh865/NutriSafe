import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAlert, setNewAlert] = useState({ image: null, dishName: '', effect: '' });

     // Function to handle API request for creating a report
     const handleAddAlert = async () => {
        var formdata = new FormData();
        formdata.append("file", newAlert.image);
        formdata.append("mobile_number", "9137357003");
        formdata.append("food_name", newAlert.dishName);
        formdata.append("effect", newAlert.effect);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://nutrisafe.onrender.com/report", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setShowModal(false);
                fetchReports()
            })
            .catch(error => console.log('error', error));
    };

    // Function to handle API request for fetching all reports
    const fetchReports = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://nutrisafe.onrender.com/report", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data);
                // Assuming result.data contains an array of reports
                setAlerts(result.data);
            })
            .catch(error => console.log('error', error));
    };

    // Fetch reports when the component mounts
    useEffect(() => {
        fetchReports();
    }, []);

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setNewAlert({ ...newAlert, image: file });
        }
    };
    return (
        <div className="flex flex-col items-center w-[100%]  overflow-y-scroll py-6 px-10">
            {/* Displaying Reports */}
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className="w-[100%] h-[100%] p-4 mb-8 bg-light-red border-dark-red bg-[#f8c2c2] rounded-md overflow-hidden"
                >
                    {/* Displaying image from blob */}
                    {alert.food_image && (
                        <img
                            src={alert.food_image}
                            className="w-[100%] h-[20%] object-cover mb-4 rounded-md"
                        />
                    )}
                    <p className="text-[#9a2e2e] text-lg font-bold mb-4">{alert.food_name}</p>
                    <p className="text-[#9a2e2e] text-lg mb-4"> {alert.allergies_detected}</p>
                    {/* Add any additional information or styling as needed */}
                </div>
            ))}

            {/* Plus Button to Open Modal */}
            <div
                className="fixed bottom-16 right-6 bg-blue-500 text-white px-4 py-3 rounded-full cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <span className="font-bold text-2xl">+</span>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-90 bg-gray-800 px-4">
                    <div className="bg-white p-8 rounded-md w-96 relative">
                        {/* Close Modal Button */}
                        <div className="flex justify-end absolute top-1 right-1">
                            <span
                                className="cursor-pointer text-gray-500 text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                &#10005;
                            </span>
                        </div>

                        {/* Image Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />

                        {/* Dish Name Input */}
                        <input
                            type="text"
                            placeholder="Dish Name"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={newAlert.dishName}
                            onChange={(e) => setNewAlert({ ...newAlert, dishName: e.target.value })}
                        />

                        {/* Effect Input */}
                        <input
                            type="text"
                            placeholder="Effect"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                            value={newAlert.effect}
                            onChange={(e) => setNewAlert({ ...newAlert, effect: e.target.value })}
                        />

                        {/* Submit Button */}
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md mt-4"
                            onClick={handleAddAlert}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertComponent;
