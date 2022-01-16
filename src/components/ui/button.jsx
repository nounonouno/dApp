import styled from 'styled-components';

export const Button = styled.button.attrs(( ) => ({tabIndex: 0}))`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};

    background-color: ${props => props.background ?? ""};
    color: ${props => props.color ?? "red"};

    display: ${props => props.display ?? "flex"};
    flex-direction: ${props => props.direction ?? "row"};
    align-items: ${props => props.alignItems ?? "center"};
    justify-content: ${props => props.justifyContent ?? "center"};

    border-radius: ${props => props.border ?? ""};
    transition: all 1s;

    &: hover {
        cursor: pointer;
        box-shadow: inset 0 0 2px;
    }
`