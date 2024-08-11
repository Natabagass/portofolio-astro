const Button = ({
    variant,
    onClick,
    disable,
    className,
    children,
    size,
    type,
    padding
}: {
    variant?: string,
    onClick?: () => void,
    disable?: boolean,
    type: 'submit' | 'button',
    className?: string,
    size?: string,
    padding?: string
    children?: React.ReactNode
}) => {
    switch (variant) {
        case 'primary':
            return (
                <button
                    type={type}
                    disabled={disable}
                    onClick={onClick}
                    className={`${className} ${size} ${padding ? padding : 'px-4 py-2'} rounded-3xl bg-gradient-to-r from-pink-200 to-pink-100 `}>
                    {children}
                </button>
            )
    }
}

export default Button;