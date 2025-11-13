'use client';

import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, MarkerType, Node, Edge, Handle, Position, NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './SystemArchitecture.module.css';

type Props = {
  projectId?: string;
  language?: string;
};

const nodeStyle = {
  borderRadius: 8,
  padding: 12,
  fontWeight: 600,
  fontSize: 13,
  textAlign: 'center' as const,
};

// Custom Node Component with handles
const CustomNode = ({ data }: NodeProps) => {
  return (
    <div style={{
      borderRadius: 8,
      padding: 12,
      fontWeight: 600,
      fontSize: 13,
      textAlign: 'center',
      background: data.background || 'rgba(0,255,136,0.1)',
      border: data.border || '2px solid #00ff88',
      color: data.color || '#e6fff2',
      width: data.width || 200,
      height: data.height || 90,
    }}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
      {data.label}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function SystemArchitecture({ projectId = 'nande-ia', language = 'en' }: Props) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'flows'>('architecture');

  const translate = (en: string, es: string) => language === 'en' ? en : es;

  // Vista de Arquitectura del Sistema (Estática)
  const architectureNodes: Node[] = [
    {
      id: 'nextjs-frontend',
      type: 'custom',
      position: { x: 150, y: 50 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚛️</div>
            <div>{translate('Next.js Frontend', 'Next.js Frontend')}</div>
          </div>
        ),
        background: 'rgba(0,255,136,0.1)',
        border: '2px solid #00ff88',
        color: '#e6fff2',
        width: 200,
        height: 90
      }
    },
    {
      id: 'nextjs-api',
      type: 'custom',
      position: { x: 450, y: 50 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔗</div>
            <div>{translate('Next.js Server\nAPI Endpoints', 'Next.js Server\nAPI Endpoints')}</div>
          </div>
        ),
        background: 'rgba(0,212,255,0.1)',
        border: '2px solid #00d4ff',
        color: '#eaf9ff',
        width: 200,
        height: 90
      }
    },
    {
      id: 'cloudflare-r2',
      type: 'custom',
      position: { x: 100, y: 220 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>☁️</div>
            <div>{translate('Cloudflare R2\nObject Storage', 'Cloudflare R2\nAlmacenamiento')}</div>
          </div>
        ),
        background: 'rgba(255,107,107,0.1)',
        border: '2px solid #ff6b6b',
        color: '#fff1f1',
        width: 180,
        height: 90
      }
    },
    {
      id: 'postgresql',
      type: 'custom',
      position: { x: 320, y: 220 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🐘</div>
            <div>{translate('PostgreSQL\nDatabase + Vectors', 'PostgreSQL\nBase Datos + Vectores')}</div>
          </div>
        ),
        background: 'rgba(147,51,234,0.1)',
        border: '2px solid #9333ea',
        color: '#f5eaff',
        width: 180,
        height: 90
      }
    },
    {
      id: 'google-pubsub',
      type: 'custom',
      position: { x: 540, y: 220 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>📬</div>
            <div>{translate('Google Cloud\nPub/Sub Queue', 'Google Cloud\nCola Pub/Sub')}</div>
          </div>
        ),
        background: 'rgba(66,133,244,0.1)',
        border: '2px solid #4285f4',
        color: '#e9f1ff',
        width: 180,
        height: 90
      }
    },
    {
      id: 'openai-api',
      type: 'custom',
      position: { x: 420, y: 380 },
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🤖</div>
            <div>{translate('OpenAI API\nEmbeddings & RAG', 'OpenAI API\nEmbeddings y RAG')}</div>
          </div>
        ),
        background: 'rgba(34,197,94,0.1)',
        border: '2px solid #22c55e',
        color: '#effff1',
        width: 180,
        height: 90
      }
    }
  ];

  const architectureEdges: Edge[] = [
    // Frontend to API (horizontal, center to center)
    {
      id: 'e1',
      source: 'nextjs-frontend',
      target: 'nextjs-api',
      sourceHandle: null,
      targetHandle: null,
      style: { stroke: '#64748b', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' }
    },
    // API to Cloudflare R2 (diagonal down-left)
    {
      id: 'e2',
      source: 'nextjs-api',
      target: 'cloudflare-r2',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#ff6b6b', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' }
    },
    // API to PostgreSQL (vertical down)
    {
      id: 'e3',
      source: 'nextjs-api',
      target: 'postgresql',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    // API to Pub/Sub (diagonal down-right)
    {
      id: 'e4',
      source: 'nextjs-api',
      target: 'google-pubsub',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#4285f4', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#4285f4' }
    },
    // Pub/Sub to OpenAI (vertical down)
    {
      id: 'e5',
      source: 'google-pubsub',
      target: 'openai-api',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      style: { stroke: '#22c55e', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' }
    },
    // OpenAI back to PostgreSQL (left connection)
    {
      id: 'e6',
      source: 'openai-api',
      target: 'postgresql',
      sourceHandle: 'left',
      targetHandle: 'bottom',
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    }
  ];

  // Vista de Flujos de Datos (Dinámica)
  const flowNodes: Node[] = [
    {
      id: 'user',
      position: { x: 50, y: 100 },
      data: { label: translate('User', 'Usuario') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(0,255,136,0.15)', 
        border: '2px solid #00ff88', 
        color: '#e6fff2',
        width: 120,
        height: 60
      }
    },
    {
      id: 'upload',
      position: { x: 250, y: 50 },
      data: { label: translate('Upload\nDocument', 'Subir\nDocumento') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(0,212,255,0.15)', 
        border: '2px solid #00d4ff', 
        color: '#eaf9ff',
        width: 120,
        height: 60
      }
    },
    {
      id: 'processId',
      position: { x: 450, y: 50 },
      data: { label: translate('Process ID\nCreated', 'ID Proceso\nCreado') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(99,102,241,0.15)', 
        border: '2px solid #6366f1', 
        color: '#f6f6ff',
        width: 120,
        height: 60
      }
    },
    {
      id: 'storage-flow',
      position: { x: 650, y: 50 },
      data: { label: translate('Store in\nCloudflare R2', 'Guardar en\nCloudflare R2') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(255,107,107,0.15)', 
        border: '2px solid #ff6b6b', 
        color: '#fff1f1',
        width: 120,
        height: 60
      }
    },
    {
      id: 'queue-flow',
      position: { x: 450, y: 180 },
      data: { label: translate('Queue\nProcessing', 'Cola\nProcesamiento') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(66,133,244,0.15)', 
        border: '2px solid #4285f4', 
        color: '#e9f1ff',
        width: 120,
        height: 60
      }
    },
    {
      id: 'ai-processing',
      position: { x: 650, y: 180 },
      data: { label: translate('AI Processing\nEmbeddings', 'Procesamiento IA\nEmbeddings') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(34,197,94,0.15)', 
        border: '2px solid #22c55e', 
        color: '#effff1',
        width: 120,
        height: 60
      }
    },
    {
      id: 'store-db',
      position: { x: 450, y: 310 },
      data: { label: translate('Store in\nDatabase', 'Guardar en\nBase Datos') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(147,51,234,0.15)', 
        border: '2px solid #9333ea', 
        color: '#f5eaff',
        width: 120,
        height: 60
      }
    },
    // Query Flow
    {
      id: 'query',
      position: { x: 250, y: 150 },
      data: { label: translate('User\nQuery', 'Consulta\nUsuario') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(0,255,136,0.15)', 
        border: '2px solid #00ff88', 
        color: '#e6fff2',
        width: 120,
        height: 60
      }
    },
    {
      id: 'search-db',
      position: { x: 250, y: 310 },
      data: { label: translate('Search\nVectors', 'Buscar\nVectores') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(147,51,234,0.15)', 
        border: '2px solid #9333ea', 
        color: '#f5eaff',
        width: 120,
        height: 60
      }
    },
    {
      id: 'rag-response',
      position: { x: 50, y: 250 },
      data: { label: translate('RAG\nResponse', 'Respuesta\nRAG') },
      style: { 
        ...nodeStyle, 
        background: 'rgba(34,197,94,0.15)', 
        border: '2px solid #22c55e', 
        color: '#effff1',
        width: 120,
        height: 60
      }
    }
  ];

  const flowEdges: Edge[] = [
    // Upload Flow (animated, colored)
    {
      id: 'f1',
      source: 'user',
      target: 'upload',
      animated: true,
      style: { stroke: '#00ff88', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00ff88' },
      label: '1'
    },
    {
      id: 'f2',
      source: 'upload',
      target: 'processId',
      animated: true,
      style: { stroke: '#00d4ff', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#00d4ff' },
      label: '2'
    },
    {
      id: 'f3',
      source: 'processId',
      target: 'storage-flow',
      animated: true,
      style: { stroke: '#ff6b6b', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' },
      label: '3'
    },
    {
      id: 'f4',
      source: 'processId',
      target: 'queue-flow',
      animated: true,
      style: { stroke: '#4285f4', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#4285f4' },
      label: '4'
    },
    {
      id: 'f5',
      source: 'queue-flow',
      target: 'ai-processing',
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' },
      label: '5'
    },
    {
      id: 'f6',
      source: 'ai-processing',
      target: 'store-db',
      animated: true,
      style: { stroke: '#9333ea', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' },
      label: '6'
    },
    // Query Flow (different color)
    {
      id: 'q1',
      source: 'user',
      target: 'query',
      animated: true,
      style: { stroke: '#ffd166', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd166' },
      label: 'Q1'
    },
    {
      id: 'q2',
      source: 'query',
      target: 'search-db',
      animated: true,
      style: { stroke: '#ffd166', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd166' },
      label: 'Q2'
    },
    {
      id: 'q3',
      source: 'search-db',
      target: 'rag-response',
      animated: true,
      style: { stroke: '#ffd166', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd166' },
      label: 'Q3'
    },
    {
      id: 'q4',
      source: 'rag-response',
      target: 'user',
      animated: true,
      style: { stroke: '#ffd166', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ffd166' },
      label: 'Q4'
    }
  ];

  return (
    <div className={styles.systemArchitecture}>
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          🏗️ {translate('System Architecture', 'Arquitectura del Sistema')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'flows' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('flows')}
        >
          🔄 {translate('Data Flows', 'Flujos de Datos')}
        </button>
      </div>

      {/* Content */}
      <div className={styles.tabContent}>
        {activeTab === 'architecture' && (
          <div className={styles.architectureView}>
            <h4 className={styles.viewTitle}>
              {translate('System Components & Relationships', 'Componentes del Sistema y Relaciones')}
            </h4>
            <div className={styles.reactflowWrapper}>
              <ReactFlow 
                nodes={architectureNodes} 
                edges={architectureEdges} 
                nodeTypes={nodeTypes}
                fitView 
                attributionPosition="bottom-left"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
              >
                <Background color="#22232a" gap={16} />
                <MiniMap 
                  nodeColor={(node: any) => {
                    if (node.id === 'nextjs-frontend') return '#00ff88';
                    if (node.id === 'nextjs-api') return '#00d4ff';
                    if (node.id === 'cloudflare-r2') return '#ff6b6b';
                    if (node.id === 'postgresql') return '#9333ea';
                    if (node.id === 'google-pubsub') return '#4285f4';
                    if (node.id === 'openai-api') return '#22c55e';
                    return '#999';
                  }} 
                />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        )}

        {activeTab === 'flows' && (
          <div className={styles.flowsView}>
            <h4 className={styles.viewTitle}>
              {translate('Upload & Query Data Flows', 'Flujos de Subida y Consulta de Datos')}
            </h4>
            <div className={styles.flowLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ background: '#00ff88' }}></span>
                {translate('Upload Flow', 'Flujo Subida')}
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ background: '#ffd166' }}></span>
                {translate('Query Flow', 'Flujo Consulta')}
              </div>
            </div>
            <div className={styles.reactflowWrapper}>
              <ReactFlow 
                nodes={flowNodes} 
                edges={flowEdges} 
                fitView 
                attributionPosition="bottom-left"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
              >
                <Background color="#22232a" gap={16} />
                <MiniMap 
                  nodeColor={(node: any) => {
                    if (node.id.includes('user')) return '#00ff88';
                    if (node.id.includes('upload') || node.id.includes('processId')) return '#00d4ff';
                    if (node.id.includes('storage')) return '#ff6b6b';
                    if (node.id.includes('queue')) return '#4285f4';
                    if (node.id.includes('ai')) return '#22c55e';
                    if (node.id.includes('db')) return '#9333ea';
                    if (node.id.includes('query') || node.id.includes('rag')) return '#ffd166';
                    return '#999';
                  }} 
                />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}