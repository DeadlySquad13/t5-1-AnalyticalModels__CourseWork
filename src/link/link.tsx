import { ReactNode } from "react";
import './link.css';

export interface LinkProps {
    href: string;
    children: ReactNode;
    preset?: 'normal' | 'back'
}

export const Link = ({ href, children, preset }: LinkProps) => {
    const formattedHref = !href.startsWith('/') ? href : href.slice(1)

    const baseUrl = import.meta.env.BASE_URL
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl.slice(-1)
    const hrefWithBaseUrl = formattedBaseUrl + formattedHref
    console.log(hrefWithBaseUrl)

    return <a className={`link link_${preset || 'normal'}`} href={hrefWithBaseUrl}>{children}</a>;
};


