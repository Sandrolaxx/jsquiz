import styled from 'styled-components'

const Widget = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 10px;
  overflow: hidden;

  h1,h2,h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
  }

  :nth-last-child(2) {
    animation: pulse 3s linear infinite;
  }

  @keyframes pulse {
    0% {
        border-top: 4px solid ${({ theme }) => theme.colors.secondary};
        border-right: 4px solid ${({ theme }) => theme.colors.primary};
        border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
        border-left: 4px solid ${({ theme }) => theme.colors.primary};
    }
    25% {
        border-top: 4px solid ${({ theme }) => theme.colors.secondary};
        border-right: 4px solid ${({ theme }) => theme.colors.secondary};
        border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
        border-left: 4px solid ${({ theme }) => theme.colors.primary};
    }
    50% {
        border-top: 4px solid ${({ theme }) => theme.colors.primary};
        border-right: 4px solid ${({ theme }) => theme.colors.secondary};
        border-bottom: 4px solid ${({ theme }) => theme.colors.secondary};
        border-left: 4px solid ${({ theme }) => theme.colors.primary};
    }
    75% {
        border-top: 4px solid ${({ theme }) => theme.colors.primary};
        border-right: 4px solid ${({ theme }) => theme.colors.primary};
        border-bottom: 4px solid ${({ theme }) => theme.colors.secondary};
        border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    }
    100% {
        border-top: 4px solid ${({ theme }) => theme.colors.secondary};
        border-right: 4px solid ${({ theme }) => theme.colors.primary};
        border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
        border-left: 4px solid ${({ theme }) => theme.colors.primary};
      }
    }

`

Widget.Content = styled.div`
  padding: 14px 22px 22px 22px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  h1{
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    margin-bottom: 15px;
  }

`

Widget.Form = styled.form`
  display: flex;
  flex-flow: column;
  
  input, button {
    border-radius: 10px;
    height: 40px;
    outline-style: none;
    color: #FFFFFF;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  input {
    background-color: ${({ theme }) => theme.colors.mainBg};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    text-align: center;    
  }

  input ::placeholder,
  ::-webkit-input-placeholder {
    color: #FFFFFF;
  }
  :-ms-input-placeholder {
     color: #FFFFFF;
  }
`

Widget.Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({theme}) => theme.colors.contrastText};
  background-color: ${({theme}) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({theme}) => theme.borderRadius};
  transition: .3s;
  display: block;

  &:hover,
  &:focus {
    opacity: .5;
  }
`

export default Widget;