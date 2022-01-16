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

export const EditionModal = ({ 
    modalIsOpen, 
    closeModal,
}) => {
    const { selfId, profile, did, setProfile } = useNoUno()
    
    const [stage, setStage] = useState('Idle')
    const [bio, setBio] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [name, setName] = useState(null)

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
        const profileIconUrl = await useCreateImage(
            file
        )
        await updateProfile(
            twitter,
            bio, 
            name, 
            selfId,
            profile,
            did,
            setProfile,
            profileIconUrl
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
                            <Card
                                    width="50%"
                                    direction="column"
                                >
                                <ProfilePic src={
                                        image != null 
                                            ? image 
                                            : `https://ipfs.io/ipfs/${profile.pfpurl}`
                                    }/>
                                
                                <Upload 
                                    name="avatar"
                                    accept=".jpeg,.jpg,.png,.gif"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                >
                                    <Button
                                        width="100px"
                                        height="50px"
                                        border="10px"
                                        color="black"
                                    >
                                        <StyledP 
                                            size="25px"
                                            family= "neuropol-nova, sans-serif"
                                        > 
                                           Upload
                                        </StyledP>
                                    </Button>
                                </Upload>
                            </Card>
                            <Card
                                width="50%"
                                direction="column"
                            >
                                <Card
                                    height="20%"
                                    justifyContent="space-evenly"
                                >
                                    <Card
                                        width="50%"
                                    >
                                        <StyledP
                                            size="20px"
                                            family="neuropol-nova, sans-serif"
                                        >   
                                            Name:
                                        </StyledP>
                                    </Card>
                                    <Input
                                        type="text"
                                        placeholder={profile.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Card>
                                <Card
                                    height="20%"
                                    justifyContent="space-evenly"
                                >
                                    <Card
                                        width="50%"
                                    >
                                        <StyledP
                                            size="20px"
                                            family="neuropol-nova, sans-serif"
                                        >   
                                            Twitter:
                                        </StyledP>
                                    </Card>
                                    <Input
                                        type="text"
                                        placeholder={profile.twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                    />
                                </Card>
                                <Card
                                    height="20%"
                                    justifyContent="space-evenly"
                                >
                                    <Card
                                        width="50%"
                                    >
                                        <StyledP
                                            size="20px"
                                            family="neuropol-nova, sans-serif"
                                        >   
                                            Bio:
                                        </StyledP>
                                    </Card>
                                    <Input
                                        type="text"
                                        placeholder={profile.bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </Card>
                            </Card>
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
