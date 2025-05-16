import './app.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WasteSelectionProvider } from './providers/WasteSelectorProvider';

ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
).render(
	<React.StrictMode>
		<WasteSelectionProvider>
			<App />
		</WasteSelectionProvider>
	</React.StrictMode>
);