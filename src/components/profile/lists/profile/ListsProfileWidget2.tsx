// "use client";
// import React, { useState } from "react";
// import clsx from "clsx";
// import Image from "next/image"; // Use Next.js Image component for optimized image loading

// interface MediaItem {
//   id: number;
//   src: string;
//   alt: string;
// }

// interface ListsProfileWidget10 {
//   featuredVideos: MediaItem[];
//   videoAlbums: MediaItem[]; // Assuming an array of photo album names
// }

// const ListsWidget10: React.FC<ListsProfileWidget10> = ({
//   featuredVideos,
//   videoAlbums,
// }) => {
//   const [tab, setTab] = useState<string>("Sidebar");

//   return (
//     <>
//       <div className="card card-custom">
//         <div className="card-header card-header-stretch overflow-auto">
//           <ul
//             className="nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap"
//             role="tablist"
//           >
//             <li className="nav-item">
//               <a
//                 className={clsx(`nav-link cursor-pointer`, {
//                   active: tab === "Sidebar",
//                 })}
//                 onClick={() => setTab("Sidebar")}
//                 role="tab"
//               >
//                 Featured Videos
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className={clsx(`nav-link cursor-pointer`, {
//                   active: tab === "Header",
//                 })}
//                 onClick={() => setTab("Header")}
//                 role="tab"
//               >
//                 Videos Albums
//               </a>
//             </li>
//           </ul>
//           <div className="mt-8">
//             <span className="text-primary" style={{ color: "blue" }}>
//               Add Featured Photo
//             </span>
//           </div>
//         </div>

//         <form className="form">
//           <div className="card-body">
//             <div className="tab-content pt-3">
//               <div className={clsx("tab-pane", { active: tab === "Sidebar" })}>
//                 <div className=" d-flex flex-wrap gap-10">
//                   {featuredVideos.map((photo) => (
//                     <div key={photo.id}>
//                       <Image
//                         src={photo.src}
//                         alt={photo.alt}
//                         width={200}
//                         height={200}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className={clsx("tab-pane", { active: tab === "Header" })}>
//                 {/* {videoAlbums.map((album, index) => (
//                 <div key={index}>{album}</div>
//               ))} */}

//                 <div className=" d-flex flex-wrap gap-10">
//                   {videoAlbums.map((photo) => (
//                     <div key={photo.id}>
//                       <Image
//                         src={photo.src}
//                         alt={photo.alt}
//                         width={200}
//                         height={200}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// // Example data for featured photos and photo albums
// const featuredVideosData: MediaItem[] = [
//   {
//     id: 1,
//     src: "/books/1.png",
//     alt: "Book 1",
//   },
//   {
//     id: 2,
//     src: "/books/2.png",
//     alt: "Book 2",
//   },
//   {
//     id: 3,
//     src: "/books/3.png",
//     alt: "Book 3",
//   },
//   {
//     id: 4,
//     src: "/books/3.png",
//     alt: "Book 4",
//   },
// ];

// const videoAlbumsData: MediaItem[] = [
//   {
//     id: 1,
//     src: "/books/1.png",
//     alt: "Book 1",
//   },
//   {
//     id: 2,
//     src: "/books/2.png",
//     alt: "Book 2",
//   },
// ];

// const ProfileWidgetVideos: React.FC = () => {
//   return (
//     <ListsWidget10
//       featuredVideos={featuredVideosData}
//       videoAlbums={videoAlbumsData}
//     />
//   );
// };

// export default ProfileWidgetVideos;
