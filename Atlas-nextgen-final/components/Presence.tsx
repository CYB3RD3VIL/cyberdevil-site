import React from 'react';
export default function Presence({ users = [] }: { users?: any[] }){
  return (
    <div className="flex items-center gap-2">
      {users.map((u:any, idx:number)=>(
        <div key={idx} className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs">{(u.name||'U')[0]}</div>
      ))}
    </div>
  )
}
