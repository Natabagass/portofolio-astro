const Text = ({
    className = '',
    children,
    Type = 'span',
    weight,
    size,
    color = '',
    htmlFor
}: {
    Type?: keyof JSX.IntrinsicElements,
    className?: string,
    htmlFor?: string,
    children: React.ReactNode,
    weight: 'font-base' | 'font-normal' | 'font-bold' | 'font-semibold' | 'font-medium',
    color?: string,
    size?: string
}) => {
    return (
        <Type className={`${className} ${size} ${weight ? weight : 'font-normal'} ${color ? color : 'text-white'}`}>
            {children}
        </Type>
    )
}

export default Text;