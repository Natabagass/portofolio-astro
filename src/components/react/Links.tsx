const Links = ({
    href,
    children,
    variant,
    className,
    size,
    target,
    padding,
}: {
    href: string,
    variant: string,
    target?: string,
    children: React.ReactNode,
    className?: string,
    size?: string,
    padding?: string
}) => {
    switch (variant) {
        case 'primary':
            return (
                <a
                    href={href}
                    target={target}
                    className={`${className} ${size} ${padding ? padding : 'px-4 py-2'} rounded-3xl bg-gradient-to-r from-pink-200 to-pink-100 `}
                >
                    {children}
                </a>
            )
        case 'clear':
            return (
                <a
                    href={href}
                    target={target}
                    className={`${className} ${size}`}
                >
                    {children}
                </a>
            )
    }
}

export default Links;