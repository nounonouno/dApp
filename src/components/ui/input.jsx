import styled from 'styled-components';

export const Input = styled.input.attrs(( ) => ({tabIndex: 0}))`
    width: ${props => props.width ?? ""};
    height: ${props => props.height ?? ""};


    background-color: ${props => props.background ?? ""};
    color: ${props => props.color ?? "red"};
    border-color: #E9E9E9;
    border-radius: ${props => props.border ?? ""};
    transition: all 1s;
`