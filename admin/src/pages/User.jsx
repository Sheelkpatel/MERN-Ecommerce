import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/alluser`);
            const data = response.data;

            // Safely extract users array if available
            const userArray = Array.isArray(data) ? data : data.users;

            if (Array.isArray(userArray)) {
                setUsers(userArray);
            } else {
                console.error('Expected an array of users, got:', data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`${backendUrl}/api/user/delete/${userId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                await fetchUsers();
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Prevent filter error if users is not an array
    const filteredUsers = Array.isArray(users)
        ? users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div>
            <div className='flex justify-between mb-4'>
            <h3>User Details</h3>

            
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-3 py-1 border rounded-md w-full max-w-sm"
            />
             </div>
            <div className='flex flex-col gap-2'>
                <div className='hidden md:grid grid-cols-[2fr_3fr_2fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>NAME</b>
                    <b>EMAIL</b>
                    <b>CONTACT</b>
                    <b>ACTION</b>
                </div>

                {
                    filteredUsers.map((user, index) => (
                        <div className='grid grid-cols-[2fr_3fr_2fr_2fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.mobile}</p>
                            <p onClick={() => deleteUser(user._id)} className='text-right md:text-center cursor-pointer text-red-500'>Delete</p>
                        </div>
                    ))
                }

                {
                    filteredUsers.length === 0 && (
                        <p className="text-gray-500 text-sm mt-2">No users found.</p>
                    )
                }
            </div>
        </div>
    );
};

export default User;
