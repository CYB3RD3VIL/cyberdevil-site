import React from 'react';

export default function Accessibility(){
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Accessibility Checklist</h1>
      <ul className="mt-4 list-disc ml-6">
        <li>All interactive elements keyboard accessible</li>
        <li>Images have alt text</li>
        <li>Color contrast meets WCAG AA</li>
        <li>Proper ARIA roles on dynamic widgets</li>
        <li>Focus management for modals and dialogs</li>
      </ul>
      <p className="mt-4">Run <code>npm run a11y</code> for automated checks (axe)</p>
    </div>
  )
}
