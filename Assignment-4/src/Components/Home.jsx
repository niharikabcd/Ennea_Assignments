import React from 'react'
import styled from 'styled-components'
const Home = () => {
  return (
    <Wrappper>
      <Texts>Welcome To Makeup Products Viewer
      <br/>
      Navigate through Products
      </Texts> 
      <br/>
      <br/>
      </Wrappper>
  )
}
//Styled Components
export const Wrappper=styled.div`
  padding: 20px 0;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
  bottom: 0;
  width: 100%;
`
export const Texts=styled.h1`
  color:hotpink;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

export default Home