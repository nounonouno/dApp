import { useState } from "react"

// Nouno Components
import { 
    Card,
    Button 
} from "../../components/ui"
import { AddressesEditor } from "./addresses-editor"
import { BasicEdition } from "./basic-edition"
import { SocialsEditor } from "./socials-editor"

export const DynamicSide = ({
    setName,
    setBio,
    profile,
    setTwitter,
    setInstagram,
    setReddit,
    setDiscord,
    setBitcoin,
    setEthereum,
    setSolana,
    setPolygon,
}) => {
    const [active, setActive] = useState('profile')

    return (
        <Card
            width="50%"
            direction="column"
        >
            <Selector 
                active={active}  
                setActive={setActive}
            />
            <Card
                height="60%"
            >
                {
                    active === 'profile' 
                    ? (
                        <BasicEdition 
                            setName={setName}
                            setTwitter={setTwitter}
                            setBio={setBio}
                            profile={profile}
                        />
                    ) :  active === 'socials' 
                    ? (
                        <SocialsEditor 
                            setTwitter={setTwitter}
                            setInstagram={setInstagram}
                            setReddit={setReddit}
                            setDiscord={setDiscord}
                            profile={profile}
                        />
                    ) : active === 'addresses' 
                    
                    ? (
                        <AddressesEditor 
                            setBitcoin={setBitcoin}
                            setEthereum={setEthereum}
                            setSolana={setSolana}
                            setPolygon={setPolygon}
                            profile={profile}
                        />
                    ) : null
                }
            </Card>
            
        </Card>
    )
}

const Selector = ({
    active,
    setActive
}) => {
    return (
        <Card
            height="10%"
        >
            <Button
                color="black"
                active={active === 'profile' ? true : false}
                border="10px 0 0 10px"
                onClick={() => setActive('profile')}
            >
                Profile
            </Button>
            <Button
                color="black"
                active={active === 'socials' ? true : false}
                onClick={() => setActive('socials')}
            >
                Socials
            </Button>
            <Button
                color="black"
                active={active === 'addresses' ? true : false}
                border="0 10px 10px 0"
                onClick={() => setActive('addresses')}
            >
                Addresses
            </Button>
        </Card>
    )
}