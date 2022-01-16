import { 
    Card,
    StyledP,
    Input 
} from "../../components/ui"

export const BasicEdition = ({
    setName,
    setBio,
    profile
}) => {
    return (
        <Card
            direction="column"
        >
            <Card
                height="20%"
                justifyContent="space-evenly"
            >
                <Card
                    width="20%"
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
                    width="20%"
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
    )
}