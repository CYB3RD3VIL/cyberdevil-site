import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function AdminPage(){
  const [teams,setTeams]=useState([]); const [email,setEmail]=useState(''); const [teamId,setTeamId]=useState('');
  useEffect(()=>{ (async ()=>{ try{ const res = await axios.get('/api/teams'); setTeams(res.data); }catch(e){} })(); }, [])
  const send = async ()=>{ try{ const res = await axios.post('/api/invites/send',{ teamId, email }); alert('Invite sent: ' + res.data.preview); }catch(e){ alert('error'); } }
  return (<div className='p-8'><h2>Admin</h2><div><select onChange={e=>setTeamId(e.target.value)}><option value=''>Select team</option>{teams.map((t:any)=>(<option key={t.id} value={t.id}>{t.name}</option>))}</select><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} /><button onClick={send}>Send Invite</button></div></div>)
}
