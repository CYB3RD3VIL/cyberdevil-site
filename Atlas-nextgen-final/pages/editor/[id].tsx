import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import EditorToolbar from '../../components/EditorToolbar'
import Presence from '../../components/Presence'
import dynamic from 'next/dynamic'
const YjsEditor = dynamic(()=>import('../../components/YjsEditor'), { ssr:false });
const ProseMirrorEditor = dynamic(()=>import('../../components/ProseMirrorEditor'), { ssr:false });

export default function EditorPage(){
  const router = useRouter()
  const { id } = router.query
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('idle')
  const [users, setUsers] = useState<any[]>([])
  const socketRef = useRef<any>(null)
  const timeoutRef = useRef<any>(null)

  useEffect(()=>{
    async function load(){
      try{
        const res = await axios.get('/api/content/'+(id || 'demo'))
        setContent(res.data.content || '')
      }catch(e){ setContent('') }
    }
    if (id) load()

    // connect to socket server for presence + fallback
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || undefined);
    socketRef.current.emit('join', id || 'demo')
    socketRef.current.on('presence', (p:any)=>{
      // placeholder: update users list
      setUsers((u:any[])=>{ const copy = [...u]; copy.push(p); return copy; });
    })
    socketRef.current.on('doc:remote-update', (payload:any)=>{
      if (payload.content !== undefined) setContent(payload.content)
    })
    return ()=>{ socketRef.current?.emit('leave', id || 'demo'); socketRef.current?.disconnect(); }
  }, [id])

  // autosave with debounce
  useEffect(()=>{
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(()=>{
      (async ()=>{
        try{
          setStatus('saving');
          await axios.put('/api/content/'+(id || 'demo'), { content });
          setStatus('saved');
        }catch(e){
          setStatus('error');
        }
      })();
    }, 800);
    return ()=>{ if (timeoutRef.current) clearTimeout(timeoutRef.current); }
  }, [content, id])

  const onChange = (e:any)=>{
    setContent(e.target.value)
    socketRef.current?.emit('doc:update', { room: id || 'demo', content: e.target.value })
  }

  const askAI = async (type='continue')=>{
    try{
      setStatus('ai');
      const res = await axios.post('/api/ai/generate', { prompt: content.slice(0,200) || 'Continue the document', mode: type });
      const text = res.data?.text || '';
      setContent((c)=> c + "\n\n" + text);
      setStatus('idle');
    }catch(e){
      setStatus('error');
    }
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Editor: {id}</h2>
          <Presence users={users} />
        </div>
        <EditorToolbar onSummarize={()=>askAI('summarize')} onRewrite={()=>askAI('rewrite')} onBrainstorm={()=>askAI('brainstorm')} />
        <div className="mb-2 text-sm text-slate-500">Status: {status}</div>
        {/* ProseMirror editor (rich) */}
        <ProseMirrorEditor room={String(id||'demo')} />
      </div>
    </div>
  )
}
