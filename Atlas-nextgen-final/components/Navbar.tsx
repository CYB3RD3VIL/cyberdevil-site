import Link from 'next/link'
export default function Navbar(){
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="font-bold">Atlas</div>
        <div className="space-x-4">
          <Link href='/'><a className="text-slate-700">Home</a></Link>
          <Link href='/dashboard'><a className="text-slate-700">Dashboard</a></Link>
          <Link href='/editor/demo'><a className="text-slate-700">Editor</a></Link>
        </div>
      </div>
    </nav>
  )
}
