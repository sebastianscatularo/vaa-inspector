import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root.tsx';
import VaaInspector from './routes/vaa-inspector.tsx';
import ParserEditor, { vaaParserEditorAction, vaaParserEditorLoader } from './routes/parser-editor.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <VaaInspector />,
        index: true
      },
      {
        path: '/parser-editor',
        element: <ParserEditor />,
        loader: vaaParserEditorLoader,
        action: vaaParserEditorAction
      }
    ]
  }
]);

const rootElement = document.getElementById('root')!
const rootNode = ReactDOM.createRoot(rootElement)
rootNode.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
