import styled from 'styled-components';

export const ButtonImg = styled.img.attrs(( ) => ({tabIndex: 0}))`
    width: ${props => props.width};
    height: ${props => props.height};

    border-radius: ${props => props.border ?? ""};
    transition: all 0.5s;
    opacity: 0.6;

    &: hover {
        cursor: pointer;
        opacity: 1;
        width: 60px;
        height: 60px;
    }
`