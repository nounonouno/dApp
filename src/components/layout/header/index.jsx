import { Button, Card, StyledP} from "../../ui"

import { useNoUno } from '../../../context/nouno';

export const Header = ({height}) => {
    const { status } = useNoUno()
    console.log(status)
    return (
        <Card
            height={height}
        >
            <Card
               width="20%"
            >

            </Card>
            <Card
                width="60%"
            >
                
            </Card>
            <Card
                width="20%"
            >
                {   status != "Connected" ?
                        <DynamicButton 
                            status={status} 
                        />
                        : null
                }
            </Card>
        </Card>
    )
}

const DynamicButton = ({
    status,
}) => {
    switch (status) {
        case "Idle":
            return (
                <MainUserButton 
                    background=""
                    text="Connect"
                />
            )
        case "Attempting":
            return (
                <MainUserButton 
                    background=""
                    text="Loading..."
                />
            )
        case "Error":
            return (
                <MainUserButton 
                    background="light red"
                    text="Try Again"
                />
            )
        default:
            break;
    }
}

const MainUserButton = ({background, text}) => {
    const { connect } = useNoUno();
    return (
        <Button
            width="80%"
            height="80%"
            border="15px"
            color="#10000"
            background={background}
            disabled={text === "Loading..." ? true : false}
            onClick={() => connect()}
        >
            <StyledP
                family="neuropol-x-light, sans-serif"
                size="15px"
            >
                {text}
            </StyledP>
        </Button>
    )
}