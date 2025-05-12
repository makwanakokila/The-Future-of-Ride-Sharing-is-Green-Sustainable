// import React from 'react';
// import { Mail, Phone, MapPin, Shield } from 'lucide-react';

// const ProfileSidebar = ({ onEditClick, userData }) => {
//   return (
//     <div className="bg-white border dark:border-none shadow-lg dark:bg-gray-800 rounded-lg p-6">
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4">
//           {userData.fullName.slice(0, 2).toUpperCase()}
//         </div>
//         <h2 className="text-2xl font-semibold text-black dark:text-white">{userData.fullName}</h2>
//         <p className="text-gray-600 dark:text-gray-400 text-sm">Member since March 2023</p>
//         <div className="flex items-center mt-2">
//           {[...Array(4)].map((_, i) => (
//             <svg
//               key={i}
//               className="w-5 h-5 text-yellow-400"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           ))}
//           <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//           <span className="ml-1 text-gray-400">4.0</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-start">
//           <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
//           <div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Email</p>
//             <p className="text-black dark:text-white">{userData.email}</p>
//           </div>
//         </div>

//         <div className="flex items-start">
//           <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
//           <div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Phone</p>
//             <p className="text-black dark:text-white">{userData.phone}</p>
//           </div>
//         </div>

//         <div className="flex items-start">
//           <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
//           <div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Address</p>
//             <p className="text-black dark:text-white">{userData.address}</p>
//           </div>
//         </div>

//         <div className="flex items-start">
//           <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
//           <div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">Account Status</p>
//             <div className="flex items-center">
//               <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//               <p className="text-black dark:text-white">Verified</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={onEditClick}
//         className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-2 mt-6 flex items-center justify-center"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//         </svg>
//         Edit Profile
//       </button>

      
//     </div>
//   );
// };

// export default ProfileSidebar;


