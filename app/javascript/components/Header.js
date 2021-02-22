import React from 'react'
import styled from 'styled-components';

const HeaderDiv = styled.div`
  font-size: 2.5em;
  margin: auto;
  padding: 24px;
  text-align:center;
  font-family: 'Oswald', sans-serif;

  @media (max-width: 600px) {
    font-size: 24px;
    text-align:left;
  }
`

const Header = () => {
  return (
    <HeaderDiv>
      WhereDoWeEat
    </HeaderDiv>
  )
}

export default Header
