import React from 'react'
import { Box, H3,Input, Button } from '@adminjs/design-system'
import { ActionProps } from 'adminjs'

const MyCustomAction = (props: ActionProps) => {
  const { record } = props

  return (
    <Box flex>
      <Input></Input>
      <Input></Input>
      <Button></Button>
    </Box>
  )
}

export default MyCustomAction
