import { toInteger, toNumber } from 'lodash';
import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
const axios = require('axios');

const MyComponent = () => {
    const [categories, setCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [responseInfo, setResponseInfo] = useState(null);
    // const [image, setImage] = useState(null);
    const [itemList, setItemList] = useState([]);
    const [previously_reported, setPreviously_reported] = useState("no"); 
    const [previous_report,setReport]=useState("")
    const [totalCalories, setTotalCalories] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            setLoading(true);

            fetch('https://nutrisafe.onrender.com/food', {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: {}
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result.data);
                    setResponseInfo(result.data);
                    setPreviously_reported(result.data.previously_reported)
                    setReport(result.data.previous_report_for_this_food)
                    setLoading(false);
                })
                .catch(error => console.log('error', error));
        } else {
            console.warn('No image selected');
        }
    };




    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    //   const handleImageUpload = (e) => {
    //     // Handle image upload logic, set 'image' state accordingly
    //     // For simplicity, let's assume 'e.target.files[0]' contains the image file
    //     const uploadedImage = e.target.files[0];
    //     setImage(uploadedImage);
    //   };


    const [isInfoVisible, setInfoVisible] = useState(false);

    const toggleInfo = () => {
        setInfoVisible(!isInfoVisible);
    };

    useEffect(() => {
        var storedCalories = typeof window !== 'undefined' ? localStorage.getItem('dailyCalories') : null;

        // const storedCalories = localStorage.getItem('dailyCalories');
        storedCalories = parseInt(storedCalories) + parseInt(totalCalories);
        localStorage.setItem('dailyCalories', storedCalories);

    }, [totalCalories]);

    //   return (
    //     <div className="flex items-center justify-center h-screen">
    //       <div className="w-[100%] h-[100%] pr-4 pt-[20px] flex flex-col justify-center items-center">

    //         <div className='w-[80%] h-[80%] pt-[10px]'>
    //           <div className="flex flex-row w-[100%] mx-auto gap-x-16 justify-center h-[100%]">
    //             <div className="flex flex-col items-center">

    //               {selectedImage ?
    //                 <img src={URL.createObjectURL(selectedImage)} alt="image" className="w-[300px] h-[300px]"/>
    //                 :
    //                 <div className="p-8 border-[3px] border-dotted border-gray-300 rounded-lg bg-gray-100 text-center flex flex-col justify-center items-center ">
    //                   <h2 className="text-xl font-semibold ">Upload Food Packet</h2>
    //                   <label className="flex flex-col justify-center items-center mt-4 ">
    //                     <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-gray-400 px-4 rounded-lg bg-white py-[30px]">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         className="h-16 w-16 mx-auto text-gray-500"
    //                         height="24"
    //                         fill="gray"
    //                         viewBox="0 -960 960 960"
    //                         stroke="currentColor"
    //                       >
    //                         <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
    //                       </svg>
    //                       <p className="text-gray-500 mt-2">
    //                         Choose a file or drag it here
    //                       </p>
    //                       <input
    //                         className=" hidden"
    //                         type="file"
    //                         accept=".jpg,.png,.jpeg"
    //                         onChange={handleImageChange}
    //                       />
    //                     </div>
    //                   </label>
    //                 </div>
    //               }
    //               {/* <p>{image?.name}</p> */}
    //               {loading ? (
    //                 <div className="mt-4">
    //                   <ScaleLoader color="#2563eb" />
    //                   Hold on!
    //                 </div>
    //               ) : (
    //                 <button
    //                   className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full"
    //                   onClick={handleUpload}
    //                 >
    //                   Upload Image
    //                 </button>
    //               )}
    //             </div>

    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //   );
    // };

    // export default MyComponent;


    // ... (previous imports)


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[100%] h-[100%] px-4  pt-[20px] flex flex-col justify-center items-center">
           
                <div className='w-[100%] h-[80%] '>
                
                    <div className="flex flex-row w-[100%] mx-auto gap-x-16 justify-center h-[100%] relative">
                    {previously_reported === 'yes' ? (
                            <>
                                <div className="info-container min-h-screen bg-gray-100 ">
                                    <div
                                        className="info-icon bg-red-500 border-2 border-red-600 text-white rounded-full flex items-center justify-center cursor-pointer fixed top-[90px] right-5 w-8 h-8"
                                        onClick={toggleInfo}
                                    >
                                        i
                                    </div>
                                    <div className={`info-content bg-red-500 border-2 border-red-600 rounded-lg p-4 fixed top-5 right-20 ${isInfoVisible ? '' : 'hidden'}`}>
                                        <p className="text-white">{previous_report}</p>
                                    </div>
                                    
                                </div>
                            </>
                        ) : 
                        <> </>
                        }
                        <div className="flex flex-col items-center">
                        
                            {selectedImage ?
                                <img src={URL.createObjectURL(selectedImage)} alt="image" className="w-[300px] h-[300px]" />
                                :
                                <div className="p-8 border-[3px] border-dotted border-gray-300 rounded-lg bg-gray-100 text-center flex flex-col justify-center items-center ">
                                    <h2 className="text-xl font-semibold ">Upload Cooked Food</h2>
                                    <label className="flex flex-col justify-center items-center mt-4 ">
                                        <div className="cursor-pointer border-2 border-dotted h-[100%] w-[100%] border-gray-400 px-4 rounded-lg bg-white py-[30px]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-16 w-16 mx-auto text-gray-500"
                                                height="24"
                                                fill="gray"
                                                viewBox="0 -960 960 960"
                                                stroke="currentColor"
                                            >
                                                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                                            </svg>
                                            <p className="text-gray-500 mt-2">
                                                Choose a file or drag it here
                                            </p>
                                            <input
                                                className=" hidden"
                                                type="file"
                                                accept=".jpg,.png,.jpeg,.webp"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </label>
                                </div>
                            }
                            {/* <p>{image?.name}</p> */}

                            {responseInfo && (
                                <div className={`mt-4 p-4 rounded-lg ${responseInfo.can_eat === 'yes' ? 'bg-green-100 border-green-800 border-[1px]' : 'bg-red-100 border-[1px] border-red-800'}`}>
                                    <h2 className={`text-3xl font-semibold ${responseInfo.can_eat === 'yes' ? 'text-green-800 ' : 'text-[#a20220]'} `}>{responseInfo.can_eat === 'yes' ? 'Can Eat' : 'Cannot Eat'}</h2>
                                    <div className="mt-2 flex flex-wrap">
                                        {responseInfo.ingredients.map((ingredient, index) => (
                                            <div key={index} className={`p-2 rounded-md my-2 mr-2 ${responseInfo.can_eat === 'yes' ? 'bg-green-800 text-white' : 'bg-[#f7a6b5] border-[1px] border-[#a20220]'} `}>
                                                {ingredient}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <strong>Reason:</strong> {responseInfo.reason}
                                    </div>
                                </div>
                            )}
                            {loading ? (
                                <div className="mt-4">
                                    <ScaleLoader color="#2563eb" />
                                    Hold on!
                                </div>
                            ) : (
                                <button
                                    className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full"
                                    onClick={handleUpload}
                                >
                                    Upload Image
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
