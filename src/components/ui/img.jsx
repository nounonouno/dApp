import styled from 'styled-components';

export const Image = styled.img`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};
    opacity: ${props => props.opacity ?? "1"};
`