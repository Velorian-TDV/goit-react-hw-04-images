import { Circles } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="loader">
            <Circles
                height="40"
                width="40"
                radius="10"
                color="black"
                ariaLabel="loading"
                wrapperStyle
            />
        </div>
    )
}