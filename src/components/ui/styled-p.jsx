import styled from 'styled-components';

// interface StyledPProps {
//     size?: string;
//     family?: string;
//     color?: string;
//     margin?: string;
//     opacity?: string;
//     lineHeight?: string;
// }

export const StyledP = styled.p`
    font-size: ${props => props.size ?? "10px"};
    font-family: ${props => props.family ?? "sans-serif"};

    color: ${props => props.color ?? "black"};
    opacity: ${props => props.opacity ?? "1"};

    margin: ${props => props.margin ?? "0"};
`