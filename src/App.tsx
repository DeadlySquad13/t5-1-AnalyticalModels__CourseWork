import { ServicePage } from './service-page/service-page';
import { ServerPage } from './server-page/server-page';
import { TitlePage } from './title-page/title-page';
import { ReactNode } from 'react';
import { Link } from './link/link';

import './App.css'

const getPathParts = (path: string) => path.split('/').filter(Boolean);

const resolvePathToRoot = (path: string, rootPath: string) => {
    const pathParts = getPathParts(path)
    const baseUrlParts = getPathParts(rootPath)

    const pathPartsWithoutBaseUrl = pathParts.filter((part) => !baseUrlParts.includes(part))
    const pathWithoutBaseUrl = `/${pathPartsWithoutBaseUrl.join('/')}`

    return pathWithoutBaseUrl;
}

const resolvePathToBaseUrl = (path: string) => resolvePathToRoot(path, import.meta.env.BASE_URL)

interface LayoutWithBackButtonProps {
    children: ReactNode;
}

const LayoutWithBackButton = ({ children }: LayoutWithBackButtonProps) => <><Link preset='back' href='/'>← К главной странице</Link>{children}</>

const App = () => {
    const path = window.location.pathname;

    const resolvedPath = resolvePathToBaseUrl(path)

    switch (resolvedPath) {
        case '/': return <TitlePage />
        case '/service': return <LayoutWithBackButton><ServicePage /></LayoutWithBackButton>
        case '/server': return <LayoutWithBackButton><ServerPage /></LayoutWithBackButton>
        default: return <LayoutWithBackButton><span>no route with path {resolvedPath}</span></LayoutWithBackButton>
    }
}

export default App


