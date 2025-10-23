import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">Atlas NextGen — Demo</h1>
        <p className="mt-2 text-slate-600">A next-generation overhaul scaffold.</p>
        <div className="mt-6 space-x-4">
          <Link href="/dashboard"><a className="px-4 py-2 bg-indigo-600 text-white rounded">Dashboard</a></Link>
          <Link href="/editor/demo"><a className="px-4 py-2 bg-slate-200 rounded">Editor</a></Link>
        </div>
      </header>
    </div>
  )
}
