import styled from 'styled-components';

export const ButtonImg = styled.img.attrs(( ) => ({tabIndex: 0}))`
    width: ${props => props.width};
    height: ${props => props.height};

    border-radius: ${props => props.border ?? ""};
    transition: all 0.5s;
    opacity: ${props=> props.opacity ?? "1"};

    &: hover {
        cursor: pointer;
        opacity: 1;
        width: ${props => props.emphasis};
        height: ${props => props.emphasis};
    }
`