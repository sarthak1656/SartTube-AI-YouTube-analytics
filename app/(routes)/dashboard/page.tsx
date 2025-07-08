import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import FeatureList from './_components/FeatureList'

function Dashboard() {
    return (
        <div>
            {/* Welcome banner */}
        <WelcomeBanner/>

            {/* Features list */}
            <FeatureList/>
        </div>
    )
}

export default Dashboard