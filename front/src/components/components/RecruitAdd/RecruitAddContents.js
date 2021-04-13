// import React, { useState } from 'react';
// import Tags from '../Tags';
//
// import { DataInputs } from '../Styled';
//
// export default function RecruitAddContents({ onChange }) {
//   const [tags] = useState([
//     { name: 'Backend', id: 0, selected: false },
//     { name: 'Frontend', id: 1, selected: false },
//     { name: 'Fullstack', id: 2, selected: false },
//   ]);
//   return (
//     <>
//       {/* 작성자 */}
//       <div style={{ margin: '10px 0px 20px 0px' }}>작성자 2020-01-01</div>
//       {/* 공고 날짜 */}
//       <AnnouncementDate>
//         <div
//           style={{
//             marginBottom: '30px',
//           }}
//         >
//           <span
//             style={{
//               display: 'inline-block',
//             }}
//           >
//             <div
//               style={{
//                 marginBottom: '5px',
//               }}
//             >
//               공고시작일자
//             </div>
//             <DataInputs type="text" onChange={onChange} />
//           </span>
//           <span>&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;</span>
//           <span
//             style={{
//               display: 'inline-block',
//             }}
//           >
//             <div
//               style={{
//                 marginBottom: '5px',
//               }}
//             >
//               공고마감일자
//             </div>
//             <DataInputs type="text" onChange={onChange} />
//           </span>
//         </div>
//       </AnnouncementDate>
//       {/* 회사 요약정보 */}
//       <CompanySummaryInfo onChange={onChange}>
//         {/* 공고정보 */}
//         <div
//           style={{
//             marginBottom: '30px',
//           }}
//         >
//           <div
//             style={{
//               fontSize: '20px',
//               marginBottom: '10px',
//             }}
//           >
//             회사 요약정보
//           </div>
//           <div
//             style={{
//               marginBottom: '10px',
//             }}
//           >
//             <span
//               style={{
//                 display: 'inline-block',
//                 marginRight: '40px',
//               }}
//             >
//               <span
//                 style={{
//                   marginRight: '10px',
//                 }}
//               >
//                 회사이름 :
//               </span>
//               <DataInputs type="text" onChange={onChange} />
//             </span>
//             <span
//               style={{
//                 display: 'inline-block',
//                 marginRight: '40px',
//               }}
//             >
//               <span
//                 style={{
//                   marginRight: '10px',
//                 }}
//               >
//                 회사규모 :
//               </span>
//               <DataInputs type="text" onChange={onChange} />
//             </span>
//             <span>
//               <span
//                 style={{
//                   marginRight: '10px',
//                 }}
//               >
//                 연락처 :
//               </span>
//               <DataInputs type="text" onChange={onChange} />
//             </span>
//           </div>
//           <textarea
//             placeholder="내용을 입력하세요"
//             style={{
//               width: '100%',
//               height: '200px',
//               resize: 'none',
//             }}
//             name="summaryInfo"
//           />
//         </div>
//       </CompanySummaryInfo>
//       <AnnouncementInfo onChange={onChange}>
//         <div
//           style={{
//             marginBottom: '30px',
//           }}
//         >
//           <div
//             style={{
//               fontSize: '20px',
//               marginBottom: '10px',
//             }}
//           >
//             공고 정보
//           </div>
//           <div
//             style={{
//               marginBottom: '10px',
//             }}
//           >
//             <span
//               style={{
//                 display: 'inline-block',
//                 marginRight: '40px',
//               }}
//             >
//               <span
//                 style={{
//                   marginRight: '10px',
//                 }}
//               >
//                 경력 요구사항 :
//               </span>
//               <DataInputs type="text" />
//             </span>
//             <span
//               style={{
//                 display: 'inline-block',
//                 marginRight: '40px',
//               }}
//             >
//               <span
//                 style={{
//                   marginRight: '10px',
//                 }}
//               >
//                 고용형태 :
//               </span>
//               <DataInputs type="text" onChange={onChange} />
//             </span>
//           </div>
//           <textarea
//             style={{
//               width: '100%',
//               height: '200px',
//               resize: 'none',
//             }}
//             onChange={onChange}
//             name="detailInfo"
//           >
//             글입력
//           </textarea>
//         </div>
//       </AnnouncementInfo>
//       {/* 태그*/}
//       <div
//         style={{
//           marginTop: '20px',
//         }}
//       >
//         <Tags tagList={tags}>직무추가</Tags>
//       </div>
//     </>
//   );
// }
