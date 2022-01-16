import { useState } from "react";

// NoUno UI 
    // Context
import { useNoUno } from "../../context/nouno";
    // Components
import { 
    Card,
    StyledP,
    Button,
    Input,
    Image as ImageComponent
} from "../../components/ui";

// React Modal
import Modal from 'react-modal';
import axios from 'axios';
import { Upload } from "antd";
import { setLocalProfileData } from "../../hooks/identity/identity";

const endpoint = 'https://livepeer.com/api/stream'

export const getStreamStatus = (
    apiKey,
    streamId
  ) => {
    return axios.get(`${endpoint}/${streamId}`, {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer 6fe260df-9772-421b-8674-fdb170b0e517",
      },
    });
  };
  

export const LivestreamModal = ({ 
    modalIsOpen, 
    closeModal,
    setStreamId,
    setStreamIsActive
}) => {
    const [active, setActive] = useState('livestream')
    const { selfId, profile, did, setProfile } = useNoUno()
    
    // Make sure user is connected
    if (profile === {}) return null

    // Livepeer stream creation
    const handleClick = async () => {
        const config = {
            headers: {
                authorization: "Bearer 6fe260df-9772-421b-8674-fdb170b0e517",
            }
        }

        const data = {
            "name": "test_stream",
            "profiles": [
            {
                "name": "720p",
                "bitrate": 2000000,
                "fps": 30,
                "width": 1280,
                "height": 720
            },
            {
                "name": "480p",
                "bitrate": 1000000,
                "fps": 30,
                "width": 854,
                "height": 480
            },
            {
                "name": "360p",
                "bitrate": 500000,
                "fps": 30,
                "width": 640,
                "height": 360
            }
            ]
        }

        const streamCreateResponse = await axios.post(endpoint, data, config)
        if (streamCreateResponse.data) {
            const {
              id: streamId,
              playbackId,
              streamKey,
            } = streamCreateResponse.data;

            const data = {
                streamId,
                playbackId,
                streamKey
            }
            
            let interval
            if (data.streamId) {
                interval = setInterval(async () => {
                  const streamStatusResponse = await getStreamStatus(
                    "6fe260df-9772-421b-8674-fdb170b0e51",
                    data.streamId
                  );
                  if (streamStatusResponse.data) {
                      const { isActive } = streamStatusResponse.data;
                      console.log(isActive)
                      setStreamIsActive(isActive)
                  }
                }, 5000);
              }
            
            setStreamId(data)
            
            return () => {
                closeModal();
                clearInterval(interval);
              };
        }

        
    }
    
    // Image Uploading
    const [image, setPreviewURL] = useState(null)
    const [file, setFile] = useState()

    const beforeUpload = (file, fileList) => {
        console.log(file, fileList);
        setFile(file);
        setPreviewURL(URL.createObjectURL(file));
        return false;
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
                <Selector
                    active={active}
                    setActive={setActive}
                />
                {
                    active === 'livestream' ? 
                        <LiveStream 
                            handleClick={handleClick}
                        />
                    : active === 'post' ? 
                        <Post 
                            closeModal={closeModal}
                        /> 
                    : active === "image" ?
                        <Image 
                            beforeUpload={beforeUpload}
                            image={image}
                        /> : null
                }
                
                {
                    active === "post" || active === "image" ? null : 
                    <Card height="10%"/>
                }
            </Card>
        </Modal>
    )
}

const Selector = ({
    active,
    setActive
}) => {
    console.log(active)
    return (
        <Card
            height="10%"
        >
            <Button
                color="black"
                active={active === 'post' ? true : false}
                border="10px 0 0 10px"
                onClick={() => setActive('post')}
            >
                Post
            </Button>
            <Button
                color="black"
                active={active === 'image' ? true : false}
                onClick={() => setActive('image')}
            >
                Image
            </Button>
            <Button
                color="black"
                active={active === 'video' ? true : false}
                onClick={() => setActive('video')}
            >
                Video
            </Button>
            <Button
                color="black"
                active={active === 'livestream' ? true : false}
                border="0 10px 10px 0"
                onClick={() => setActive('livestream')}
            >
                Livestream
            </Button>
        </Card>
    )
}

const LiveStream = ({
    handleClick
}) => {
    return (
        <Card
            height="80%"
            direction="column"
        >
            <Card
                height="20%"
                direction="column"
            >
                <StyledP
                    family="neuropol-nova, sans-serif"
                    size="45px"
                >
                    Create a livestream!
                </StyledP>
            </Card>
            <Card
                height="30%"
            >
                <Button
                    width="300px"
                    height="100px"
                    onClick={() => handleClick()}
                    border="15px"
                >
                    <StyledP
                        size="35px"
                        family="neuropol-nova, sans-serif"
                    >
                        Create
                    </StyledP>
                </Button>
            </Card>
        </Card>
    )
}

const Post = ({
    closeModal
}) => {
    const { selfId, did, setProfile, profile } = useNoUno()

    const [ title, setTitle ] = useState(null)
    const [ body, setBody ] = useState(null)

    const postIt = async (post) => {
        if (!title && !body) {
            console.log('error... nothing to post')
            return
        }
        
        if (!selfId) {
            await connect()
        }
        let user = {...profile}
        user.posts = user.posts ? {...user.posts, ...post} : {post}

        await selfId.set('basicProfile', user)
    }

    const handleClick = async () => {
        const post = {
            title,
            body
        }

        await postIt(post)
        setLocalProfileData(selfId, did, setProfile)
        closeModal()
    }

    return (
        <Card
            height="90%"
            direction="column"
            justifyContent="space-evenly"
        >
            <Card
                height="10%"
                direction="column"
            >
                <StyledP
                    family="neuropol-nova, sans-serif"
                    size="45px"
                >
                    Create a post!
                </StyledP>
            </Card>

            <Card
                height="10%"
            >
                <Input 
                    border="15px"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    width="100%"
                    height="100%"
                />
            </Card>

            <Card
                height="50%"
            >
                <Input 
                    placeholder="Start typing...."
                    onChange={(e) => setBody(e.target.value)}
                    border="15px"
                    type="textarea"
                    width="100%"
                    height="100%"
                />
            </Card>
            <Card
                height="10%"
            >
                <Button
                    border="15px"
                    onClick={() => handleClick()}
                >
                    Submit
                </Button>
            </Card>
        
        </Card>
    )
}

const Image = ({
    beforeUpload,
    image
}) => {

    const publishIt = () => {
        
    }
    
    return (
        <Card
            height="90%"
            direction="column"
            justifyContent="space-evenly"
        >
            <Card
                height="10%"
                direction="column"
            >
                <StyledP
                    family="neuropol-nova, sans-serif"
                    size="45px"
                >
                    Create an image!
                </StyledP>
            </Card>

            <Card
                height="70%"
                direction="column"
            >
                { image ?
                    <ImageComponent 
                        width="300px"
                        height="300px"
                        src={image}
                    /> : null
                }
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
                height="10%"
            >
                <Button
                    border="15px"
                >
                    Submit
                </Button>
            </Card>
        
        </Card>
    )
}