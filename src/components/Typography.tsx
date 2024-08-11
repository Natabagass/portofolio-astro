const Text = ({
    className = '',
    children,
    Type = 'span',
    weight,
    size,
    color = '',
}: {
    Type?: keyof JSX.IntrinsicElements,
    className?: string,
    children: React.ReactNode,
    weight: 'font-base' | 'font-normal' | 'font-bold' | 'font-semibold' | 'font-medium',
    color?: string,
    size?: string
}) => {
    return (
        <Type className={`${className} ${size} ${weight ? weight : 'font-normal'} ${color ? color : 'text-title'}`}>
            {children}
        </Type>
    )
}

export default Text;