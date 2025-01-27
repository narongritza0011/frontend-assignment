// app/page.tsx

import { fetchAndTransform } from '@/lib/api/user';
import React from 'react';

export default async function Page() {
    const data = await fetchAndTransform(); // Fetching data server-side
    console.log("data=", data)


    // If there's no data, show the error message inside a red border box
    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center gap-8 p-4 sm:p-8 bg-gray-100">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Users Summary</h1>
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    <div className="border-2 border-red-500 bg-red-100 text-red-700 p-4 rounded">
                        <strong>Error:</strong> There was an issue fetching data or no data available.
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex flex-col items-center gap-8 p-4 sm:p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Users Summary</h1>
            {/* error message */}
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                {Object.keys(data).length > 0 ? (
                    Object.entries(data).map(([department, deptData]) => (
                        <div key={department} className="space-y-6 border-b pb-6">
                            <h2 className="text-2xl font-semibold text-gray-700">{department}</h2>
                            <div className="space-y-4 text-gray-600">
                                <p><strong className="font-medium">Male Count:</strong> {deptData.male}</p>
                                <p><strong className="font-medium">Female Count:</strong> {deptData.female}</p>
                                <p><strong className="font-medium">Age Range:</strong> {deptData.ageRange}</p>

                                <div>
                                    <strong className="font-medium">Hair Colors:</strong>
                                    <ul className="list-inside list-disc ml-4">
                                        {Object.entries(deptData.hair).map(([color, count]) => (
                                            <li key={color} className="text-sm">{color}: {count}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <strong className="font-medium">Address Users:</strong>
                                    <ul className="list-inside list-disc ml-4">
                                        {Object.entries(deptData.addressUser).map(([fullName, postalCode]) => (
                                            <li key={fullName} className="text-sm">{fullName}: {postalCode}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No department data found.</p>
                )}
            </div>
        </div>

    );
}
