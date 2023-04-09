import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom';

import Sidebar from './Sidebar';

import '../App.css';


let id = 0;
const getId = () => `dndnode_${id++}`;

const WorkflowDesigner = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow/' + id)
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: `input`
     },
      position: { x: 250, y: 5 },
    },
  ];
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
 console.log(edges)
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('name');
      const input=event.dataTransfer.getData('input')
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${input} | ${name}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow" style={{ height: 750 }}>
    {!loading && <>
    
    <ReactFlowProvider>
    <p className='top-0 absolute text-lg font-semibold'> Workflow Name:{data.name}</p>
        <Sidebar />
        <div className="reactflow-wrapper border border-blue-400" ref={reactFlowWrapper} width='100%' height='100%'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>

      </ReactFlowProvider> </>}
      
    </div>
  );
};

export default WorkflowDesigner;
