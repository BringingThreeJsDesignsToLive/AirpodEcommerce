import React from 'react'
import { BallTriangle } from 'react-loader-spinner';

function LoadingOverlay() {
    return (
        <div role={"presentation"} className="loadingCover">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#000000"
                ariaLabel="ball-triangle-loading"
                visible={true}
            />
            <span>Loading Airpod 3D Models......</span>
        </div>
    )
}

export default LoadingOverlay