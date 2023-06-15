import React from "react";
import {Link, useRoute} from "wouter";

export const ActivatableLink: React.FC<{ href: string, children: React.ReactNode, className?: string }> = (props) => {
    const [isActive] = useRoute(props.href);

    return (
        <Link {...props} className={props.className + (isActive ? ' active' : '')}>{props.children}</Link>
    )
}
