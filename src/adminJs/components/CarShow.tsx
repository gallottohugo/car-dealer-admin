import React from 'react'
import { H1, H2, H3, H4, Box, Link, DrawerContent, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system'
import { ActionProps } from 'adminjs'

const CarShow = (props: ActionProps) => {
  const { record, resource, records } = props
  return (
    <>
      <DrawerContent>
        <H2>{record?.params.name}</H2>
        <H4>{record?.params.license}</H4>
      </DrawerContent>
      <br />
      <br />
      <DrawerContent>
        <H3>Características</H3>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Propiedad</TableCell>
                <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  record?.params.carProperties.map((item: any) => {
                    return (
                      <TableRow>
                        <Link href={`/admin/resources/CarProperty/records/${item.id}/show`}>
                          <TableCell key={item.id}>{item.id}</TableCell>
                        </Link>
                        <TableCell key={item.id}>{item.property}</TableCell>
                        <TableCell key={item.id}>{item.value}</TableCell>
                      </TableRow>
                    )
                  })
                }
            </TableBody>
          </Table>
        </Box>
      </DrawerContent>
    </>
  )
}

export default CarShow
