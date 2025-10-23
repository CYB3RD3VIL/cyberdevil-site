import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TeamsPage(){
  const [teams, setTeams] = useState<any[]>([])
  useEffect(()=>{ (async ()=>{ try{ const res = await axios.get('/api/teams'); setTeams(res.data); }catch(e){} })(); }, [])
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Teams</h2>
      <div className="grid gap-4">
        {teams.map(t=>(<div key={t.id} className="p-4 bg-white rounded shadow"><div className="font-medium">{t.name}</div><div className="text-sm text-slate-500">{t.slug}</div></div>))}
      </div>
    </div>
  )
}
