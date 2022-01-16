import { Upload } from "antd";
import { 
    Card, 
    Button, 
    StyledP,
    ProfilePic
} from '../../components/ui';

export const ProfilePicEdition = ({
    profile,
    beforeUpload,
    image
}) => {
    return (
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
    )
}