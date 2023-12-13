import { ReactNode } from "react";
  

export interface LinkProps {
    href: string;
    children: ReactNode;
}

export const Link = ({ href, children }: LinkProps) => {
    const formattedHref = !href.startsWith('/') ? href : href.slice(1)

    const baseUrl = import.meta.env.BASE_URL
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl.slice(-1)
    const hrefWithBaseUrl = formattedBaseUrl + formattedHref
    console.log(hrefWithBaseUrl)

    return <a href={hrefWithBaseUrl}>{children}</a>;
};
