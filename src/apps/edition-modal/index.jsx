import { useState, useEffect } from "react";

// Identity Utils
import { updateProfile } from "../../hooks/identity/identity";

// NoUno UI 
    // Context
import { useNoUno } from "../../context/nouno";
    // Hooks
import { useCreateImage } from "../../hooks/nft-storage";
    // Components
import { 
    Card,
    StyledP,
    ProfilePic,
    Button,
    Input
} from "../../components/ui";

// React Modal
import Modal from 'react-modal';
import { Upload } from "antd";
import { ProfilePicEdition } from "./profile-pic-edition";
import { DynamicSide } from "./dynamic-side";

export const EditionModal = ({ 
    modalIsOpen, 
    closeModal,
}) => {
    const { selfId, profile, did, setProfile } = useNoUno()
    
    const [stage, setStage] = useState('Idle')

    // Profile
    const [bio, setBio] = useState(null)
    const [name, setName] = useState(null)
    
    // Socials
    const [twitter, setTwitter] = useState(null)
    const [reddit, setReddit] = useState(null)
    const [discord, setDiscord] = useState(null)
    const [instagram, setInstagram] = useState(null)
 
    // Addresses
    const [bitcoin, setBitcoin] = useState(null)
    const [ethereum, setEthereum] = useState(null)
    const [solana, setSolana] = useState(null)
    const [polygon, setPolygon] = useState(null)

    // Image
    const [image, setPreviewURL] = useState(null)
    const [file, setFile] = useState()

    const beforeUpload = (file, fileList) => {
        console.log(file, fileList);
        setFile(file);
        setPreviewURL(URL.createObjectURL(file));
        return false;
    }

    useEffect(() => {
        if (stage === "Updated") {
            closeModal()
            setStage('Idle')
        }
    },[stage])

    const update = async () => {
        setStage('Updating')

        let profileIconUrl = null
        if (file) {
            profileIconUrl = await useCreateImage(
                file
            )
        }
        

        const socials = {
            twitter: twitter != null ? twitter : profile.socials ? profile.socials.twitter ?? null : null,
            discord: discord != null ? discord : profile.socials ? profile.socials.discord ?? null : null,
            reddit: reddit != null ? reddit : profile.socials ? profile.socials.redit ?? null : null,
            instagram: instagram != null ? instagram : profile.socials ? profile.socials.instagram ?? null : null
        }
        
        const blockchains = {
            bitcoin: bitcoin != null ? bitcoin : profile.blockchainAddresses ? profile.blockchainAddresses.bitcoin ?? null : null ,
            ethereum: discord != null ? ethereum : profile.blockchainAddresses ? profile.blockchainAddresses.ethereum ?? null : null ,
            solana: solana != null ? solana : profile.blockchainAddresses ? profile.blockchainAddresses.solana ?? null : null ,
            polygon: polygon != null ? polygon : profile.blockchainAddresses ? profile.blockchainAddresses.polygon ?? null : null ,
        }
        
        const profilepfp = profileIconUrl ?? profile.pfpurl

        console.log(socials)
        await updateProfile(
            socials,
            blockchains,
            bio, 
            name, 
            selfId,
            profile,
            did,
            setProfile,
            profilepfp
        )
        setStage('Updated')
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
            {
                stage === 'Idle' ?
                (
                    <>
                        <Card
                            height="10%"
                        >
                            <StyledP
                                size="20px"
                                family="neuropol-x-light, sans-serif"
                            >
                                Edit Profile
                            </StyledP>
                        </Card>
                        <Card
                            height="80%"
                            width="80%"
                        >
                            <ProfilePicEdition 
                                profile={profile}
                                beforeUpload={beforeUpload}
                                image={image}
                            />
                            <DynamicSide
                                setName={setName}
                                setTwitter={setTwitter}
                                setBio={setBio}
                                profile={profile}
                                setInstagram={setInstagram}
                                setReddit={setReddit}
                                setDiscord={setDiscord}
                                setBitcoin={setBitcoin}
                                setEthereum={setEthereum}
                                setSolana={setSolana}
                                setPolygon={setPolygon}
                            />
                        </Card>

                        <Card
                            height="10%"
                        >
                            <Button
                                border="15px"
                                onClick={
                                    () => update()
                                }
                                color="black"
                            >
                                <StyledP
                                    size="20px"
                                    family="neuropol-nova, sans-serif"
                                >  
                                    Submit
                                </StyledP>
                            </Button>

                        </Card>
                    </>
                ) : 
                <StyledP
                    family="neuropol-x-light, sans-serif"
                    size="30px"
                >
                    Loading...
                </StyledP>
            }
            </Card>
            
        </Modal>
    )
}
