import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Pagination from './Pagination';

export default () => {
  const {id}=useParams();
  
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);
  const paginate = (pagenumber) => setcurrentPage(pagenumber)
    const { data, error, loading } = useFetch(`https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${currentPage}&limit=5`)

 
  const onDragStart = (event, nodeType,name, input_type) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('name', name) 
    event.dataTransfer.setData('input', input_type)
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      {data.map((data,i)=>(
        <div key={i} className="dndnode border border-blue-400" onDragStart={(event) => onDragStart(event, 'default',`${data.name}`,`${data.input_type.toUpperCase()}`)} draggable>
        <p className='border-r border-blue-400 p-2'>{data.input_type.toUpperCase()}</p>
        <p className='border-r border-blue-400 p-2'>{data.name}</p>
        <p className=''>{data.output_type.toUpperCase()}</p>
      </div>
      ))}
      <Pagination postsPerPage={postsPerPage} paginate={paginate}/>
    </aside>
  );
};