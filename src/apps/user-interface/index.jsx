import { useState, useCallback, useEffect, useRef } from "react";

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
import { LivestreamModal } from "../livestream-modal";

// VideoJs
import videojs from "video.js";
import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";


export const UserInterface = ({
    openModal,
    type
}) => {
    const [socialMediaModalIsOpen, setSocialMediaModal] = useState(false);
    const [blockchainModalIsOpen, setBlockchainModal] = useState(false);
    const [livestreamModal, setLivestreamModal] = useState(false);
    const [streamId, setStreamId] = useState(null)
    const [videoEl, setVideoEl] = useState(null);
    const [ streamIsActive, setStreamIsActive ] = useState(false)

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

    console.log(streamId)

    // SocialMediaModal handlers
    function openSocialMediaModal() {
        setSocialMediaModal(true);
    }
    
    function closeSocialMediaModal() {
        setSocialMediaModal(false);
    }

    // BlockchainAddressesModal Handlers
    function openBlockchainAddressesModal() {
        setBlockchainModal(true);
    }
    
    function closeBlockchainModal() {
        setBlockchainModal(false);
    }

    // LivestreamCreationModal Handlers
    function openLivestreamModal() {
        setLivestreamModal(true)
    }

    function closeLivestreamModal() {
        setLivestreamModal(false)
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
            <LivestreamModal 
                modalIsOpen={livestreamModal}
                closeModal={closeLivestreamModal}
                setStreamId={setStreamId}
                setStreamIsActive={setStreamIsActive}
            />
            <LeftSide 
                openModal={openModal}
                openSocialMediaModal={openSocialMediaModal}
                openBlockchainAddressesModal={openBlockchainAddressesModal}
                openLivestreamModal={openLivestreamModal}
                type={type}
            />
            <RightSide
                onVideo={onVideo}
                streamId={streamId}
                streamIsActive={streamIsActive}
                videoEl={videoEl}
            />
        </>
    )
}


const LeftSide = ({
    openModal,
    openSocialMediaModal,
    openBlockchainAddressesModal,
    openLivestreamModal,
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
                        onClick={() => openLivestreamModal()}
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

const RightSide = ({
    onVideo,
    streamId,
    streamIsActive,
    videoEl
}) => {


    return (
        <Card
            width="60%"
            margin="0 10% 0 0"
            direction="column"
        >
            {
                streamId ?
                <Stream
                    onVideo={onVideo}
                    streamId={streamId}
                    streamIsActive={streamIsActive}
                    videoEl={videoEl}
                /> : null
            }

        </Card>
    )
}

const Stream = ({
    onVideo,
    streamId,
    streamIsActive,
    videoEl
}) => {

    useEffect(() => {
        if (videoEl == null) return;
        if (streamIsActive && streamId.playbackId) {
          const player = videojs(videoEl, {
            autoplay: true,
            controls: true,
            sources: [
              {
                src: `https://cdn.livepeer.com/hls/${streamId.playbackId}/index.m3u8`,
              },
            ],
          });
    
          player.hlsQualitySelector();
    
          player.on("error", () => {
            player.src(`https://cdn.livepeer.com/hls/${streamId.playbackId}/index.m3u8`);
          });
        }
      }, [streamIsActive]);

    return (
        <>
        <StyledP
                size="25px"
                margin="10px 0 0 0"
                color={streamIsActive ? "green" : "black"}
                family="neuropol-nova, sans-serif"
              >
                {streamIsActive ? "Live" : "Waiting for Video"}
            </StyledP>
            <Card
                height="65%"
            >
                <video
                    id="video"
                    ref={onVideo}
                    className="h-full w-full video-js vjs-theme-city"
                    controls
                    playsInline
                />
            </Card>
            <Card 
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                heigh="30%"
            >
                <Card
                    width="20%"
                    justifyContent="flex-start"
                >
                        Ingest URL:
                        <br />
                        rtmp://rtmp.livepeer.com/live/
                </Card>
                <Card 
                     width="20%"
                    justifyContent="flex-start"
                >
                        Stream Key:
                    <br />
                    {streamId.streamKey}
                </Card>
                <Card
                    width="20%"
                    justifyContent="flex-start"
                >
                    Playback URL:
                    <br />
                    https://cdn.livepeer.com/hls/{streamId.playbackId}/index.m3u8

                </Card>
          </Card>
        </>
    )
}