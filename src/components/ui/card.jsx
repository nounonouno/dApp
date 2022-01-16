import styled from 'styled-components';

export const Card = styled.div`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};

    background-color: ${props => props.background ?? ""};
    color: ${props => props.color ?? "black"};

    display: ${props => props.display ?? "flex"};
    flex-direction: ${props => props.direction ?? "row"};
    align-items: ${props => props.alignItems ?? "center"};
    justify-content: ${props => props.justifyContent ?? "center"};

    border-radius: ${props => props.border ?? ""};
`