import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React from "react";

const ModalConfirm = ({ onClose, isOpen, title, message, onSubmit }) => {

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Box>
            <Text>
              {message}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter gap='2'>
          <Button onClick={onSubmit} colorScheme='green'>
            Ya, Lanjut
        </Button>
          <Button colorScheme='red' onClick={onClose}>
            Batal
        </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
