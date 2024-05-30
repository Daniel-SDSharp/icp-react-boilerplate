import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const Contacts: React.FC = () => {
  const [name, setName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [asset, setAsset] = useState("");

  return (
    <Box width="300px" margin="20px 20px">
      <FormControl>
        <Box marginTop="20px">
          <FormLabel>Name</FormLabel>
          <Input onChange={(e) => setName(e.target.value)} type='text' />
        </Box>
        <Box marginTop="20px">
          <FormLabel>Principal</FormLabel>
          <Input onChange={(e) => setPrincipal(e.target.value)} type='text' />
        </Box>
        <Box marginTop="20px">
          <FormLabel>Asset</FormLabel>
          <Input onChange={(e) => setAsset(e.target.value)} type='text' />
        </Box>
        <Button marginTop="20px" color="teal">Add</Button>
      </FormControl>
    </Box>
  )
}

export default Contacts;