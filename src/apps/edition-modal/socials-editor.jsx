import { 
    Card,
    StyledP,
    Input 
} from "../../components/ui"

export const SocialsEditor = ({
    setTwitter,
    setInstagram,
    setReddit,
    setDiscord,
    profile
}) => {
    console.log('socials')
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
                        Instagram:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.socials.instagram}
                    onChange={(e) => setInstagram(e.target.value)}
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
                        Twitter:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.socials.twitter}
                    onChange={(e) => setTwitter(e.target.value)}
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
                        Reddit:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.socials.reddit}
                    onChange={(e) => setReddit(e.target.value)}
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
                        Discord:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.socials.discord}
                    onChange={(e) => setDiscord(e.target.value)}
                />
            </Card>
        </Card>
    )
}