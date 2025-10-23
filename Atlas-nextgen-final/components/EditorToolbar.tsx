import React from 'react';

export default function EditorToolbar({ onSummarize, onRewrite, onBrainstorm }: { onSummarize?: ()=>void, onRewrite?: ()=>void, onBrainstorm?: ()=>void }){
  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 rounded bg-indigo-600 text-white" onClick={onSummarize}>Summarize</button>
      <button className="px-3 py-1 rounded bg-slate-200" onClick={onRewrite}>Rewrite</button>
      <button className="px-3 py-1 rounded bg-slate-200" onClick={onBrainstorm}>Brainstorm</button>
      <div className="ml-auto text-sm text-slate-500">Realtime • Offline</div>
    </div>
  )
}
