'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionsTable = () => {
    const [predictions, setPredictions] = useState([]);
    const [selectedPrediction, setSelectedPrediction] = useState(null);

    useEffect(() => {
        // Fetch predictions from the backend
        axios.get('http://localhost:8000/api/predictions/')
            .then(response => {
                setPredictions(response.data);
            })
            .catch(error => {
                console.error('Error fetching predictions:', error);
            });
    }, []);

    const openPopup = (prediction) => {
        setSelectedPrediction(prediction);
    };

    const closePopup = () => {
        setSelectedPrediction(null);
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-6">Predictions Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-max w-full table-auto divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-100 text-blue-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Image</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Prediction</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Confidence</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">URL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {predictions.map(prediction => (
                            <tr key={prediction.id} className="transition-colors duration-300 hover:bg-gray-100 cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={`http://127.0.0.1:8000/${prediction.image}`} alt="Prediction" className="h-16 w-16 object-cover rounded-full" onClick={() => openPopup(prediction)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.prediction}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.confidence.toFixed(2)}%</td>
                                <td className="px-6 py-4 whitespace-nowrap">{prediction.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><a href="#" className="text-blue-600 hover:underline" onClick={() => openPopup(prediction)}>View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Popup Card */}
            {selectedPrediction && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-md">
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-bold mb-4">Prediction Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <img src={`http://127.0.0.1:8000/${selectedPrediction.image}`} alt="Prediction" className="h-64 w-full object-cover rounded-lg" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-semibold">Prediction: <span className="text-gray-700">{selectedPrediction.prediction}</span></p>
                                <p className="font-semibold">Confidence: <span className="text-gray-700">{selectedPrediction.confidence.toFixed(2)}%</span></p>
                                <p className="font-semibold">Timestamp: <span className="text-gray-700">{selectedPrediction.timestamp}</span></p>
                                <p className="font-semibold">URL: <a href={selectedPrediction.url} className="text-blue-600 hover:underline">{selectedPrediction.url}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PredictionsTable;
