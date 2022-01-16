import styled from 'styled-components';

export const Button = styled.button.attrs(( ) => ({tabIndex: 0}))`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};

    background-color: ${props => props.background ?? ""};
    color: ${props => props.active ? "#0046F5" : props.color ?? "red"};

    font-size:${props => props.size ?? "20px"};

    display: ${props => props.display ?? "flex"};
    flex-direction: ${props => props.direction ?? "row"};
    align-items: ${props => props.alignItems ?? "center"};
    justify-content: ${props => props.justifyContent ?? "center"};

    box-shadow: ${props => props.active ? "inset 0 0 2px #0046F5" : ""};

    border-radius: ${props => props.border ?? ""};
    transition: all 1s;

    &: hover {
        cursor: pointer;
        box-shadow: inset 0 0 2px;
    }
`