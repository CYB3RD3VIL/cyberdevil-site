import React, { useEffect, useRef } from 'react';
// Note: This component expects the following packages installed:
// prosemirror-state, prosemirror-view, prosemirror-model, prosemirror-schema-basic, yjs, y-prosemirror, y-websocket
export default function ProseMirrorEditor({ room }: { room: string }){
  const editorRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    (async ()=>{
      const [Y, { WebsocketProvider }, { EditorState }, { EditorView }, { schema }, { ySyncPlugin, yCursorPlugin, yUndoPlugin }] = await Promise.all([
        import('yjs').then(m=>m.default || m),
        import('y-websocket').then(m=>m.WebsocketProvider ? m : m),
        import('prosemirror-state').then(m=>m),
        import('prosemirror-view').then(m=>m),
        import('prosemirror-schema-basic').then(m=>m),
        import('y-prosemirror').then(m=>m)
      ]);
      if (!editorRef.current) return;
      const ydoc = new Y.Doc();
      const wsUrl = (process.env.NEXT_PUBLIC_YJS_URL) ? process.env.NEXT_PUBLIC_YJS_URL : `ws://${location.hostname}:1234`;
      const provider = new WebsocketProvider(wsUrl, room, ydoc);
      const yXmlFragment = ydoc.getXmlFragment('prosemirror');
      const view = new EditorView(editorRef.current, {
        state: EditorState.create({ schema } as any)
      });
      // bind y-prosemirror
      // NOTE: dynamic import of y-prosemirror returns plugins: ySyncPlugin, yCursorPlugin, yUndoPlugin
      const { ySyncPlugin: sync, yCursorPlugin: cursors, yUndoPlugin: undo } = await import('y-prosemirror');
      const state = EditorState.create({
        schema,
        plugins: [sync(yXmlFragment), cursors(provider.awareness), undo()]
      } as any);
      view.updateState(state);
      // cleanup on unmount
      (view as any).__y_destroy = ()=>{ provider.disconnect(); ydoc.destroy(); view.destroy(); };
      return ()=>{ try{ (view as any).__y_destroy(); }catch(e){} }
    })();
  }, [room]);
  return <div ref={editorRef}></div>;
}
