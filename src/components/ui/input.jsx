import styled from 'styled-components';

export const Input = styled.input.attrs(( ) => ({tabIndex: 0}))`
    background-color: ${props => props.background ?? ""};
    color: ${props => props.color ?? "red"};

    border-radius: ${props => props.border ?? ""};
    transition: all 1s;
`