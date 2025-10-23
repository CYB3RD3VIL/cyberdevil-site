import React, { useState } from 'react';
import axios from 'axios';
export default function InvitePage(){
  const [email,setEmail]=useState('');
  const [teamId,setTeamId]=useState('1');
  const [token,setToken]=useState('');
  const [msg,setMsg]=useState('');
  const create = async ()=>{
    try{ const res = await axios.post('/api/invites/create',{ teamId, email }); setToken(res.data.token); setMsg('Invite created'); }catch(e){ setMsg('Error'); }
  }
  return (<div className='p-8'><h2>Create invite</h2><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' /><button onClick={create}>Create</button><div>{msg} {token && <span>Token: {token}</span>}</div></div>)
}
