import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, Textarea, useDisclosure, InputGroup, Text, Container } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../lib/api';
import { post_types } from '../redux/types';

const PostContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFileRef = useRef(null);
  const authSelector = useSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      location: '',
      likes: 0,
      caption: '',
      UserId: '',
    },
  });
  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const handelFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadContentHandler = async () => {
    const formData = new FormData();
    const { caption, location } = formik.values;

    formData.append('caption', caption);
    formData.append('location', location);
    formData.append('post_image_file', selectedFile);
    const res = await axiosInstance.post('/posts', formData);
    const data = res?.data?.result;

    dispatch({
      type: post_types.NEW_POST,
      payload: [data],
    });
    window.location.reload();
    onClose();
  };

  return (
    <Container>
      <Text disabled={!authSelector.is_verified} fontSize={15} textColor="blackAlpha.500" size="md" onClick={onOpen}>
        Post
      </Text>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent fontSize="sm">
          <DrawerCloseButton colorScheme="blackAlpha" />
          <DrawerHeader alignItems="center" fontSize="sm" borderBottomWidth="1px">
            Post New Content
          </DrawerHeader>

          <DrawerBody>
            <form>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="image">image</FormLabel>
                  <InputGroup>
                    <Input accept="image/png, image/jpeg" display="none" type="file" id="image_url" placeholder="Please enter domain" name="image_url" onChange={handelFile} ref={inputFileRef} />
                    <Button onClick={() => inputFileRef.current.click()} colorScheme="blackAlpha">
                      choose File
                    </Button>
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input id="location" placeholder="location" name="location" onChange={inputHandler} />
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">caption</FormLabel>
                  <Textarea id="caption" name="caption" onChange={inputHandler} />
                </Box>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="3px">
            <Button colorScheme="gray" onClick={uploadContentHandler}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default PostContent;
