import React from 'react'
import { Box, FormGroup, Input, Button, Label, Text } from '@adminjs/design-system'
import { ActionProps } from 'adminjs'

const CarPropertyNew = (props: ActionProps) => {
  const { record } = props

  const buttonNew = () => { }

  return (
    <Box>
      <Box>
        <form action="/admin/resources/CarProperty/actions/new">
          <FormGroup>
            <Label required>Propiedad</Label>
            <Input name="propery" placeholder="Propiedad" />
          </FormGroup>
          <FormGroup>
            <Label required>Valor</Label>
            <Input name="Value" placeholder="Valor" />
          </FormGroup>
          <Text mt="xl" textAlign="center">
            <Button onClick={buttonNew} variant="primary">
              Guardar
            </Button >
          </Text>
        </form>
      </Box>
    </Box>
  )
}

export default CarPropertyNew
