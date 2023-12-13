import './App.css'
import { ServicePage } from './service-page/service-page';
import { ServerPage } from './server-page/server-page';
import { TitlePage } from './title-page/title-page';

const getPathParts = (path: string) => path.split('/').filter(Boolean);

const resolvePathToRoot = (path: string, rootPath: string) => {
    const pathParts = getPathParts(path)
    const baseUrlParts = getPathParts(rootPath)

    const pathPartsWithoutBaseUrl = pathParts.filter((part) => !baseUrlParts.includes(part))
    const pathWithoutBaseUrl = `/${pathPartsWithoutBaseUrl.join('/')}`

    return pathWithoutBaseUrl;
}

const resolvePathToBaseUrl = (path: string) => resolvePathToRoot(path, import.meta.env.BASE_URL)

const App = () => {
    const path = window.location.pathname;

    const resolvedPath = resolvePathToBaseUrl(path)

    switch (resolvedPath) {
        case '/': return <TitlePage />
        case '/service': return <ServicePage />
        case '/server': return <ServerPage />
        default: return <span>no route with path {resolvedPath}</span>
    }
}

export default App


