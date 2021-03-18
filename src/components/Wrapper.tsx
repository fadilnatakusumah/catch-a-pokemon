import styled from "@emotion/styled";

const WrapperStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export const Wrapper = ({ children }: any) => {
  return (
    <WrapperStyled>
      {children}
    </WrapperStyled>
  )
}