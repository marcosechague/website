"use client";

import React, { useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, MarkerType, addEdge, Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './Projects.module.css';

type Props = {
  projectId?: string;
  detailed?: boolean;
};

const nodeStyle = {
  borderRadius: 8,
  padding: 10,
  fontWeight: 600,
};

export default function ArchitectureFlow({ projectId = 'nande-ia', detailed = true }: Props) {
  // Static layout for the Ñande IA architecture with clear separation
  const nodes = useMemo<Node[]>(() => [
    { id: 'frontend', position: { x: 50, y: 80 }, data: { label: 'Frontend\n(Next.js)\nUpload / Query' }, style: { ...nodeStyle, background: 'rgba(0,255,136,0.06)', border: '2px solid #00ff88', color: '#e6fff2' }, width: 200 },
    { id: 'r2', position: { x: 50, y: 320 }, data: { label: 'Cloudflare R2\n(Object Storage)' }, style: { ...nodeStyle, background: 'rgba(255,107,107,0.06)', border: '2px solid #ff6b6b', color: '#fff1f1' }, width: 200 },
    { id: 'api', position: { x: 320, y: 80 }, data: { label: 'API Endpoint\n(Create processId)' }, style: { ...nodeStyle, background: 'rgba(0,212,255,0.06)', border: '2px solid #00d4ff', color: '#eaf9ff' }, width: 220 },
    { id: 'pubsub', position: { x: 320, y: 260 }, data: { label: 'Google Pub/Sub\n(Queue)' }, style: { ...nodeStyle, background: 'rgba(66,133,244,0.06)', border: '2px solid #4285f4', color: '#e9f1ff' }, width: 200 },
    { id: 'processor', position: { x: 620, y: 240 }, data: { label: 'Async Processor\n(Download → Extract → Embed)' }, style: { ...nodeStyle, background: 'rgba(99,102,241,0.06)', border: '2px solid #6366f1', color: '#f6f6ff' }, width: 260 },
    { id: 'db', position: { x: 920, y: 120 }, data: { label: 'PostgreSQL\n(Vector Storage)' }, style: { ...nodeStyle, background: 'rgba(147,51,234,0.06)', border: '2px solid #9333ea', color: '#f5eaff' }, width: 220 },
    { id: 'openai', position: { x: 920, y: 320 }, data: { label: 'OpenAI\n(Embeddings / RAG)' }, style: { ...nodeStyle, background: 'rgba(34,197,94,0.06)', border: '2px solid #22c55e', color: '#effff1' }, width: 220 }
  ], []);

  const edges = useMemo<Edge[]>(() => [
    { id: 'e1', source: 'frontend', target: 'api', animated: true, style: { stroke: '#00ff88' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#00ff88' }, label: 'Upload / Query' },
    { id: 'e2', source: 'api', target: 'r2', animated: true, style: { stroke: '#ff6b6b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' }, label: 'Store Document' },
    { id: 'e3', source: 'api', target: 'pubsub', animated: true, style: { stroke: '#00d4ff' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#00d4ff' }, label: 'Enqueue Process' },
    { id: 'e4', source: 'pubsub', target: 'processor', animated: true, style: { stroke: '#4285f4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#4285f4' }, label: 'Message' },
    { id: 'e5', source: 'processor', target: 'openai', animated: true, style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' }, label: 'Generate Embeddings' },
    { id: 'e6', source: 'openai', target: 'db', animated: false, style: { stroke: '#9333ea' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }, label: 'Store Embeddings' },
    { id: 'e7', source: 'frontend', target: 'db', animated: false, style: { stroke: '#ffd166' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd166' }, label: 'Query (RAG)' }
  ], []);

  const onConnect = useCallback((connection: Connection) => addEdge({ ...connection, animated: true }, edges), [edges]);

  return (
    <div className={styles.reactflowWrapper}>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView attributionPosition="bottom-left">
        <Background color="#22232a" gap={16} />
        <MiniMap nodeColor={(n) => {
          // color by id
          if (n.id === 'frontend') return '#00ff88';
          if (n.id === 'api') return '#00d4ff';
          if (n.id === 'r2') return '#ff6b6b';
          if (n.id === 'processor') return '#6366f1';
          if (n.id === 'db') return '#9333ea';
          if (n.id === 'openai') return '#22c55e';
          return '#999';
        }} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
