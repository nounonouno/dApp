import { useState } from "react";

// Nouno 
    // General Components
import { 
    Card,
    StyledP,
    ProfilePic,
    Button,
    Image,
} from "../../components/ui";

import { useNoUno } from "../../context/nouno";
import { SocialMediaModal } from "../social-media-modal";
import { BlockchainAddressesModal } from "../blockchain-addresses-modal";

export const UserInterface = ({
    openModal,
    type
}) => {
    const [socialMediaModalIsOpen, setSocialMediaModal] = useState(false);
    const [blockchainModalIsOpen, setBlockchainModal] = useState(false);

    // SocialMediaModal handlers
    function openSocialMediaModal() {
        setSocialMediaModal(true);
    }
    
    function closeSocialMediaModal() {
        setSocialMediaModal(false);
    }

    // BlockchainAddressesModal Handlers
    function openBlockchainAddressesModal() {
        console.log('hey')
        setBlockchainModal(true);
    }
    
    function closeBlockchainModal() {
        setBlockchainModal(false);
    }

    return (
        <>
            <SocialMediaModal 
                modalIsOpen={socialMediaModalIsOpen}
                closeModal={closeSocialMediaModal}
            />
            <BlockchainAddressesModal 
                modalIsOpen={blockchainModalIsOpen}
                closeModal={closeBlockchainModal}
            />
            <LeftSide 
                openModal={openModal}
                openSocialMediaModal={openSocialMediaModal}
                openBlockchainAddressesModal={openBlockchainAddressesModal}
                type={type}
            />
            <RightSide/>
        </>
    )
}


const LeftSide = ({
    openModal,
    openSocialMediaModal,
    openBlockchainAddressesModal,
    type
}) => {
    const { profile } = useNoUno()

    return (
        <Card
            width="35%"
            height="80%"
            direction="column"
            justifyContent="space-around"
        >
            <ProfilePic src={"https://ipfs.io/ipfs/" + profile.pfpurl} alt="" />
            <Card
                width="40%"
                height="15%"
                direction="column"
                background="#F7F7F7"
                border="10%"
            >
                <StyledP
                    size="2.5vh"
                    family="neuropol-x-light, sans-serif"
                >
                    {profile.name}
                </StyledP>
                <StyledP
                    size="2.5vh"
                    opacity="0.4"
                    family="neuropol-nova, sans-serif"
                >
                    @{profile.twitter}
                </StyledP>
            </Card>
            <Card
                width="40%"
                height="15%"
                justifyContent="space-around"
            >
                <Button
                    width="40%"
                    direction="column"
                    background="#F7F7F7"
                    border="10%"
                    color="black"
                    onClick={() => openSocialMediaModal()}
                >
                    <Image
                        width="40px"
                        height="40px"
                        opacity=".8"
                        src="https://ipfs.io/ipfs/bafkreihh3gizwnehbm7b5jc45jpix2spt7akkehou6rxpxhkgtnhunxgvq" 
                    />
                </Button>
                <Button
                    width="40%"
                    direction="column"
                    background="#F7F7F7"
                    border="10%"
                    color="black"
                    onClick={() => openBlockchainAddressesModal()}
                >
                    <Image
                        width="40px"
                        height="40px"
                        opacity=".8"
                        src="https://ipfs.io/ipfs/bafkreigdj3jxe74qjyswcqqgkos2fh3h57qzqwid6j7ji3m6jlr7quf2w4" 
                    />
                </Button>
            </Card>
            { type === "Account" ?
                <Card 
                    width="40%"
                    height="15%"
                    justifyContent="space-around"
                >
                    <Button
                        width="40%"
                        direction="column"
                        background="#F7F7F7"
                        border="10%"
                        color="black"
                        onClick={() => openModal()}
                    >
                        <Image
                            width="30px"
                            height="30px"
                            opacity=".6"
                            src="https://ipfs.io/ipfs/bafkreicxbb3mgmsyqyfs4f5dskiwdhgjudk7hreeppv5unwuiijsnzpm5i" 
                        />
                    </Button>

                    <Button
                    width="40%"
                    direction="column"
                    background="#F7F7F7"
                    border="10%"
                    color="black"
                    onClick={() => openModal()}
                    >
                        <Image
                            width="40px"
                            height="40px"
                            src="https://ipfs.io/ipfs/bafkreia26ln23m2rzy76nyemf2uua23glqc6ax5tz6hmraabepg7u3kif4" 
                        />
                    </Button>
                </Card>
                : null
            }
        </Card>
    )
}

const RightSide = () => {
    return (
        <Card
            width="60%"
        >

        </Card>
    )
}