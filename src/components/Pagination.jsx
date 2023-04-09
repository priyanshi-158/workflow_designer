import React from 'react'

const Pagination = ({postsPerPage, paginate}) => {
    const pageNumbers=[];
    for(let i=1; i<=Math.ceil(99/postsPerPage); i++){
        pageNumbers.push(i);
        
    }
  return (
    <div className='flex justify-center items-center'>
        <ul className='flex flex-wrap'>
        {pageNumbers.map(number=>(
            <li key={number} className=' cursor-pointer p-2 text-black'>
            <a onClick={()=>
            paginate(number)}>{number}</a>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Pagination