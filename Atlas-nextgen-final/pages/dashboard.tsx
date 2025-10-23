import Link from 'next/link'
export default function Dashboard(){
  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-medium">Recent Documents</h3>
            <ul className="mt-2 text-sm text-slate-600">
              <li>Demo Document</li>
            </ul>
            <div className="mt-4">
              <Link href="/editor/demo"><a className="text-indigo-600">Open Editor</a></Link>
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow">Insights (placeholder)</div>
          <div className="p-4 bg-white rounded shadow">Team (placeholder)</div>
        </div>
      </div>
    </div>
  )
}
