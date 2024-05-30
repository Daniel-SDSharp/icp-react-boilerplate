import React from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";

const Auth: React.FC = () => {
  return (
    <>
      <Box margin="20px 20px" alignItems="center" justifyContent="space-between" display="flex" width="200px">
        <Box marginRight="10px">
          <Text fontSize="xs">Internet Identity</Text>
        </Box>
        <Button colorScheme="teal">Login</Button>
      </Box>
      <Box margin="20px 20px" alignItems="center" justifyContent="space-between" display="flex" width="200px">
        <Box marginRight="10px">
          <Text fontSize="xs">NFID</Text>
        </Box>
        <Button colorScheme="teal">Login</Button>
      </Box>
      <Box margin="20px 20px" alignItems="center" justifyContent="space-between" display="flex" width="200px">
        <Box marginRight="10px">
          <Text fontSize="xs">ETH</Text>
        </Box>
        <Button colorScheme="teal">Login</Button>
      </Box>
      <Box margin="20px 20px" alignItems="center" justifyContent="space-between" display="flex" width="200px">
        <Box marginRight="10px">
          <Text fontSize="xs">Seed</Text>
          <Input size="xs"></Input>
        </Box>
        <Button colorScheme="teal">Login</Button>
      </Box>
    </>)
}

export default Auth;