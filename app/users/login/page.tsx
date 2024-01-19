"use client"

import React from 'react'
import LoginForm from './LoginForm'
import { Box as MuiBox, styled } from "@mui/material";

const StyledBox = styled(MuiBox) ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center"

})
const page = () => {
  return (
    <StyledBox>
      <LoginForm/>
    </StyledBox>
  )
}

// LoginPagee.guestGuard = true

export default page