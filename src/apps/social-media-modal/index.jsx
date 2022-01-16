import { useState } from "react";

// NoUno UI 
    // Context
import { useNoUno } from "../../context/nouno";
    // Components
import { 
    Card,
    StyledP,
    ButtonImg
} from "../../components/ui";

// React Modal
import Modal from 'react-modal';

export const SocialMediaModal = ({ 
    modalIsOpen, 
    closeModal,
}) => {
    const { selfId, profile, did, setProfile } = useNoUno()
    
    const [activeAccount, setActiveAccount] = useState(profile.twitter)
    const [activeSocialMedia, setActiveSocialMedia] = useState('twitter')
   
    if (profile === {} || !profile.socials) return null

    const socials = {
        reddit: profile.socials.reddit ?? null,
        twitter: profile.socials.twitter ?? null,
        discord: profile.socials.discord ?? null,
        ens: profile.socials.ens ?? null
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            contentLabel="Example Modal"
        >
            <Card
                direction="column"
            >   
                <Card
                    height="20%"
                    direction="column"
                >
                    <StyledP
                        family="neuropol-nova, sans-serif"
                        size="15px"
                    >
                        Find me on {activeSocialMedia}!
                    </StyledP>
                    <StyledP
                        size="35px"
                        family="neuropol-nova, sans-serif"
                    >
                        {activeAccount}
                    </StyledP>
                </Card>
                <Card
                    height="20%"
                    justifyContent="space-evenly"
                >
                {
                    Object.entries(socials).map((account) => {
                        if (account[1].length > 1) {
                            return (
                            <AccountIcon 
                                socialMedia={account[0]}
                                account={account[1]}
                                setActiveAccount={setActiveAccount}
                                setActiveSocialMedia={setActiveSocialMedia}
                            />)
                        }
                    })
                }

                </Card>
            </Card>
            
        </Modal>
    )
}

const AccountIcon = ({
    socialMedia,
    account,
    setActiveAccount,
    setActiveSocialMedia
}) => {
    if (socialMedia === "ens") return null
    const src = useGetSocialMediaIcon(socialMedia)
    
    const handleClick = () => {
        setActiveAccount(account)
        setActiveSocialMedia(socialMedia)
    }
    return (
        <ButtonImg 
            height="50px"
            width="50px"
            emphasis="60px"
            opacity="0.6"
            src={"https://ipfs.io/ipfs/" + src} 
            onClick={handleClick}
        />
    )
}

const useGetSocialMediaIcon = (socialMedia) => {
    switch (socialMedia) {
        case "twitter":
            return "bafkreieyldbxgyoekm6qschhxbckawnqjvyivtcqpbzvjmqh7edmawbcee"
        case "discord":
            return "bafkreick2lrfbfdwqjpgptrlk5cmx5vpzlr4fl5f2oqfouj5xdv3zfw7je"
        case "reddit":
            return "bafkreig7hqdtr67qboaykuman37ak7z5cwjltffbwhddwjqf64dsc7zp64"    
        case "eth":
            return "bafkreie2vp66x3msyxtwtm6pdxi5ymofxc6orv762dcwxfyudoolfeexhm"
        default:
            break;
    }
}

