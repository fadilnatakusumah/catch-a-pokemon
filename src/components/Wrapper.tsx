import styled from "@emotion/styled";
import { Fragment, ReactNode } from "react";
import { Helmet } from "react-helmet";

import { NavigationButtons } from "./NavigationButtons";

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
  padding-top: 50px;
`

export const Wrapper = ({ title = "Catch a Pokemon", children }: WrapperPropsTypes) => {
  return (
    <WrapperStyled>
      <Helmet>
        <title>Catch a Pokemon - {title && title[0].toUpperCase() + title.substring(1)}</title>
      </Helmet>
      <NavigationButtons />
      <Fragment>
        {children}
      </Fragment>
    </WrapperStyled>
  )
}