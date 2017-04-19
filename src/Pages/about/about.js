import React from "react";

import SomeText from "../../Components/SomeText";

class About extends React.Component {
    render() {
        return (
            <div className="block block--size-a">
                <p>About</p>
                <SomeText tagline="here's my text"/>
            </div>
        )
    }
}

export default About;