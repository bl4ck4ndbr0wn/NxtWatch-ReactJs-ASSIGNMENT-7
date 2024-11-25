import styled from 'styled-components'

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin: 8px 0;
`

export const GoogleButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > div {
    width: 100% !important;

    > div {
      width: 100% !important;
    }

    iframe {
      width: 100% !important;
    }
  }
`
