// lib/api/user.ts

import { ApiResponse, TransformedData, User } from '@/model/user';

async function getUsers(): Promise<ApiResponse | null> {
    try {
        const url = 'https://dummyjson.com/users';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// ฟังก์ชันที่แปลงข้อมูล
export function transformData(users: User[]): TransformedData {
    const groupedData: TransformedData = {};

    users.forEach((user) => {
        const department = user.company.department;
        const fullName = `${user.firstName}${user.lastName}`;

        if (!groupedData[department]) {
            groupedData[department] = {
                male: 0,
                female: 0,
                ageRange: "",
                hair: {},
                addressUser: {},
            };
        }

        const deptData = groupedData[department];

        // Gender count
        if (user.gender === 'male' || user.gender === 'female') {
            deptData[user.gender] = (deptData[user.gender] || 0) + 1;
        }

        // Hair color summary
        if (user.hair?.color) {
            deptData.hair[user.hair.color] = (deptData.hair[user.hair.color] || 0) + 1;
        }

        // Address user mapping
        if (user.address?.postalCode && fullName) {
            deptData.addressUser[fullName] = user.address.postalCode;
        }

        // Update age range
        const minAge = deptData.ageRange ? parseInt(deptData.ageRange.split("-")[0]) : Infinity;
        const maxAge = deptData.ageRange ? parseInt(deptData.ageRange.split("-")[1]) : -Infinity;
        deptData.ageRange = `${Math.min(minAge, user.age)}-${Math.max(maxAge, user.age)}`;
    });

    return groupedData;
}

// ฟังก์ชัน fetchAndTransform
export async function fetchAndTransform(): Promise<TransformedData | null> {
    const data = await getUsers();

    if (!data) {
        return null; // Handle case where fetch fails or returns null data
    }

    return transformData(data.users);
}
