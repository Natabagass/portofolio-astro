import Navbar from "@components/utils/Navbar.astro"

const AllignmentLayout = ({
    className,
    variant,
    children
}: {
    className?: string,
    variant?: string,
    children?: React.ReactNode
}) => {
    switch (variant) {
        case 'navbar':
            return (
                <nav className={`${className} border-b border-gray-200`}>
                    {children}
                </nav>
            )
        case 'full-layout':
            return (
                <>
                    <Navbar />
                    {children}
                </>
            )
        case 'sub-content':
            return (
                <div className={`${className} mx-12`}>
                    {children}
                </div>
            )
        default:
            return (
                <div className={`${className} mx-mainScreen`}>
                    {children}
                </div>
            )
    }
}

export default AllignmentLayout;