import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom';

const WorkflowList = () => {
    const { data, error, loading } = useFetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
    console.log(data, loading);
    return (
        <>
            {!loading && <>
                <header className='border-b border-blue-300'>
                <h1 className='m-2 font-bold'>Workflows</h1>
                </header>
                <table className='m-auto my-5'>
                    <tr className='bg-blue-700 text-white'>
                        <th className='pr-6 pl-2 text-left py-4 border-r-2 border-white'>Name</th>
                        <th className='pr-6 pl-2 text-left border-r-2 border-white'>Input Type</th>
                        <th className='pr-16 pl-2 text-left'>Created at</th>
                    </tr>
                    {data.map((data,i)=>(<tr key={i} className={(i%2==0)?'bg-blue-100': 'bg-slate-100'}>
                    
                    <td className='py-2 border-r-2 border-white pr-6'><Link to={`/${data.id}`}>{data.name}</Link></td>
                            <td className='border-r-2 border-white'><Link to={`/${data.id}`}>{data.input_type}</Link></td>
                            <td className=''><Link to={`/${data.id}`}>{data.createdAt.slice(0,10)}</Link></td>
                           
                        </tr>)
                      
                    )}
                </table>
            </>}

        </>
    )
}

export default WorkflowList