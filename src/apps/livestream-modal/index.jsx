import { useState } from "react";

// NoUno UI 
    // Context
import { useNoUno } from "../../context/nouno";
    // Components
import { 
    Card,
    StyledP,
    Button
} from "../../components/ui";

// React Modal
import Modal from 'react-modal';
import axios from 'axios';

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
    const { selfId, profile, did, setProfile } = useNoUno()
    
    
    if (profile === {}) return null

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
                    console.log(setStreamIsActive)
                    setStreamIsActive(true)
                  }
                }, 5000);
              }
            
            setStreamId(data)
            
            return () => {
                clearInterval(interval);
                closeModal();
              };
        }

        
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
                        size="45px"
                    >
                        Create a livestream!
                    </StyledP>
                </Card>
                <Card>
                    <Button
                        width="300px"
                        height="100px"
                        onClick={() => handleClick()}
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
            
        </Modal>
    )
}