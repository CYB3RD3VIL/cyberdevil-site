import React, { useState } from 'react';
import axios from 'axios';
export default function AcceptInvite(){
  const [token,setToken]=useState(''); const [email,setEmail]=useState(''); const [name,setName]=useState(''); const [pw,setPw]=useState(''); const [msg,setMsg]=useState('');
  const accept = async ()=>{ try{ const res = await axios.post('/api/invites/accept',{ token,email,name,password:pw }); setMsg(JSON.stringify(res.data)); }catch(e){ setMsg('Error'); } }
  return (<div className='p-8'><h2>Accept Invite</h2><input placeholder='token' value={token} onChange={e=>setToken(e.target.value)} /><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='name' value={name} onChange={e=>setName(e.target.value)} /><input placeholder='password' type='password' value={pw} onChange={e=>setPw(e.target.value)} /><button onClick={accept}>Accept</button><div>{msg}</div></div>)
}
