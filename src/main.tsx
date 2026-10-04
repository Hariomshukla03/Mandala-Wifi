import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import './styles.css';

const root=document.getElementById('root')!;
const app=<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>;
if(root.querySelector('[data-app-shell]'))hydrateRoot(root,app);
else createRoot(root).render(app);
