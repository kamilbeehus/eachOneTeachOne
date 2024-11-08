// import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for storing user ID from Login
// const UserContext = createContext();

// Export the useUser hook to access the context
// export function useUser() {
//     return useContext(UserContext);
// }

// Provide user ID to components
// export function UserProvider({ children }) {
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         // Initialize userId from localStorage if available
//         const storedUserId = localStorage.getItem('userId');
//         if (storedUserId) {
//             setUserId(storedUserId);
//         }
//     }, []);

    // Function to update userId and sync with localStorage
    // const updateUserId = (newUserId) => {
    //     setUserId(newUserId);
    //     if (newUserId) {
    //         localStorage.setItem('userId', newUserId);
    //     } else {
    //         localStorage.removeItem('userId'); // Clear localStorage if userId is null (e.g., on logout)
    //     }
    // };

//     return (
//         <UserContext.Provider value={{ userId, setUserId: updateUserId }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
