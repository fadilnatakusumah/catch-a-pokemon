import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface WrapperPropsTypes {
  children: ReactNode,
  title: string
}

const WrapperStyled = styled.div`
 max-width: 800px;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 20px;
`

export const Wrapper = ({ title = "Pokemon Tokped", children }: WrapperPropsTypes) => {
  return (
    <WrapperStyled>
      <Helmet>
        <title>Pokemon Tokped - {title && title[0].toUpperCase() + title.substring(1)}</title>
      </Helmet>
      {children}
    </WrapperStyled>
  )
}