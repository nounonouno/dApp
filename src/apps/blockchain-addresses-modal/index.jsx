import { useEffect, useState } from "react";

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

// Copy to clipboad
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const BlockchainAddressesModal = ({ 
    modalIsOpen, 
    closeModal,
}) => {
    const { profile } = useNoUno()
    
    const [activeAddress, setActiveAddress] = useState(profile.blockchainAddresses.ethereum)
    const [activeBlockchain, setActiveBlockchain] = useState('ethereum')
    
    console.log(profile)
    if (profile === {} || !profile.blockchainAddresses) return null

    const blockchainAddresses = {
        ethereum: profile.blockchainAddresses.ethereum ?? null,
        bitcoin: profile.blockchainAddresses.bitcoin ?? null,
        polygon: profile.blockchainAddresses.polygon ?? null,
        solana: profile.blockchainAddresses.solana ?? null,
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
                    height="30%"
                    direction="column"
                >
                    <StyledP
                        family="neuropol-nova, sans-serif"
                        size="25px"
                    >
                        Find me on {activeBlockchain}!
                    </StyledP>
                    <StyledP
                        size="45px"
                        family="neuropol-nova, sans-serif"
                    >
                        {activeAddress.slice(0,5) + '....' + activeAddress.slice(-3)}
                    </StyledP>
                </Card>
                <Card
                    height="20%"
                    justifyContent="space-evenly"
                >
                {
                    Object.entries(blockchainAddresses).map((account) => {
                        if (account[1].length > 1) {
                            return (
                            <AccountIcon 
                                blockchain={account[0]}
                                address={account[1]}
                                setActiveAddress={setActiveAddress}
                                setActiveBlockchain={setActiveBlockchain}
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
    blockchain,
    address,
    setActiveAddress,
    setActiveBlockchain
}) => {
    const [copied, setCopied] = useState(false)
    const src = useGetSocialMediaIcon(blockchain)
    
    const handleClick = () => {
        setActiveAddress(address)
        setActiveBlockchain(blockchain)
    }

    useEffect(() => {
        if (copied === false) return
        setTimeout(
            () => setCopied(false),
            355
        )
    })

    return (
        <Card
            width="100px"
            height="100px"
            direction="column"
        >
            {
                copied ? (
                    <StyledP
                        size="10px"
                        opacity="0.5"
                        margin="0 0 9px 0"
                    >
                        Copied to clipboad!
                    </StyledP> 
                ) : null
            }
            <CopyToClipboard 
                text={address}
                onCopy={() => setCopied(true)}
            >
                <ButtonImg 
                    height="80px"
                    width="80px"
                    emphasis="90px"
                    opacity="0.8"
                    src={"https://ipfs.io/ipfs/" + src} 
                    onClick={handleClick}
                />
            </CopyToClipboard>
        </Card>
    )
}

const useGetSocialMediaIcon = (socialMedia) => {
    switch (socialMedia) {
        case "bitcoin":
            return "bafkreigzdo6ktnllzvb3qo2bq5k3d4bssqacr5ahdz2h5ms3bmm6x4cl4q"
        case "ethereum":
            return "bafkreia2s33letv3zfhgufk5du2e2g73ghxuvhcanpdurc72nwrhtyj6ay"
        case "solana":
            return "bafkreidh2kxvz7vfsei6y75uwmzoiqxfd2e5ben7fmckf66l7miserwhyq"    
        case "polygon":
            return "bafkreigihxzcl4vnfa7epu4sxe7codwpuvsnjduwt2he7pvb5xk2zwsnyi"
        default:
            break;
    }
}

