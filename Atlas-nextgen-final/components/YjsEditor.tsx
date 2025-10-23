import React, { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { CodemirrorBinding } from 'y-codemirror';
// For simplicity we bind to a textarea element using Y.Text events
export default function YjsEditor({ room, onChange, value }: { room: string, onChange?: (v:string)=>void, value?: string }){
  const ref = useRef<HTMLTextAreaElement|null>(null);
  const docRef = useRef<any>(null);
  useEffect(()=>{
    if (!room) return;
    const ydoc = new Y.Doc();
    docRef.current = ydoc;
    const wsUrl = process.env.NEXT_PUBLIC_YJS_URL || `ws://${location.hostname}:1234`;
    const provider = new WebsocketProvider(wsUrl, room, ydoc);
    const ytext = ydoc.getText('prosemirror') || ydoc.getText('textarea');
    // apply initial value if provided
    if (value && ytext.length === 0) { ytext.insert(0, value); }
    const onYChange = ()=>{
      const s = ytext.toString();
      if (ref.current) ref.current.value = s;
      if (onChange) onChange(s);
    }
    ytext.observe(onYChange);
    provider.on('status', (e:any)=> console.log('yjs status', e.status));
    // cleanup
    return ()=>{ ytext.unobserve(onYChange); provider.disconnect(); ydoc.destroy(); }
  }, [room]);
  return <textarea ref={ref} defaultValue={value} onChange={(e)=>{ if (onChange) onChange(e.target.value); }} className="w-full min-h-[320px] p-3 border rounded" />;
}
