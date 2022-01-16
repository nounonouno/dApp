import { 
    Card,
    StyledP,
    Input 
} from "../../components/ui"

export const AddressesEditor = ({
    setBitcoin,
    setEthereum,
    setSolana,
    setPolygon,
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
                        Bitoin:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.blockchainAddresses ? profile.blockchainAddresses.bitcoin ?? '' : ''}
                    onChange={(e) => setBitcoin(e.target.value)}
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
                        Ethereum:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.blockchainAddresses ? profile.blockchainAddresses.ethereum ?? '' : ''}
                    onChange={(e) => setEthereum(e.target.value)}
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
                        Solana:
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.blockchainAddresses ? profile.blockchainAddresses.solana ?? '' : ''}
                    onChange={(e) => setSolana(e.target.value)}
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
                        Polygon
                    </StyledP>
                </Card>
                <Input
                    type="text"
                    placeholder={profile.blockchainAddresses ? profile.blockchainAddresses.polygon ?? '' : ''}
                    onChange={(e) => setPolygon(e.target.value)}
                />
            </Card>
        </Card>
    )
}