import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {App} from './App';
import {routes,notFound} from './routes';
export const paths=routes.map(route=>route.path);
export function render(path:string){return {html:renderToString(<StaticRouter location={path}><App/></StaticRouter>),metadata:(routes.find(route=>route.path===path)||notFound).metadata};}
