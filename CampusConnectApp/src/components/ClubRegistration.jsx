import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Card,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LoadAllClubs, createClub, uploadlogo } from "../services/club-service";
import { LoadAllClubs, createClub, uploadlogo } from "../services/club-service";
import { uploadImage } from "../services/event-service";
import { useNavigate } from "react-router-dom";

const ClubRegistration = () => {
  const [clubInfo, setClubInfo] = useState({
    clubName: "",
    dept: "",
    president: "",
    clubEmail: "",
    clubPassword: "",
    description: "",
    mentor: "",
  });
  let [clubIds, setClubIds] = useState();
  const [image, setImage] = useState();
  const { navigate } = useNavigate();

  useEffect(() => {
    LoadAllClubs().then((data) => {
      console.log(data);
      const highestclubId = data.reduce(
        (max, club) => Math.max(max, club.clubId),
        0
      );
      clubIds = highestclubId + 1;
      console.log(clubIds);
    });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage((prevImage) => ({
      ...prevImage,
      logo: e.target.files[0],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    createClub(clubInfo)
      .then((data) => {
        uploadlogo(image, clubIds)
          .then((data) => {
            console.log("logo is uploaded");
          })
          .catch((error) => {
            console.log("Reupload and make sure it's size is less than 20MB");
          });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(clubInfo);
    navigate("/clubDetail/" + clubInfo.clubId);
  };

  const handleReset = () => {
    setClubInfo({
      clubName: "",
      dept: "",
      president: "",
      clubEmail: "",
      clubPassword: "",
      description: "",
      mentor: "",
    });
  };

  return (
    <Card p={8} m={4} borderRadius={0} boxShadow="lg" maxW="70%" mx="auto">
      <Stack spacing={4}>
        <Heading mb={4}>Register Your Club Here!</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel>Club Name</FormLabel>
            <Input
              type="text"
              name="club_name"
              value={clubInfo.club_name}
              onChange={handleChange}
              placeholder="Enter club name"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Department</FormLabel>
            <Input
              type="text"
              name="dept"
              value={clubInfo.dept}
              onChange={handleChange}
              placeholder="Enter club department"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Mentor</FormLabel>
            <Input
              type="text"
              name="mentor"
              value={clubInfo.mentor}
              onChange={handleChange}
              placeholder="Enter club mentor"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club President</FormLabel>
            <Input
              type="text"
              name="president"
              value={clubInfo.president}
              onChange={handleChange}
              placeholder="Enter club president"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Email</FormLabel>
            <Input
              type="email"
              name="club_email"
              value={clubInfo.club_email}
              onChange={handleChange}
              placeholder="Enter club email"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Password</FormLabel>
            <Input
              type="password"
              name="club_password"
              value={clubInfo.club_password}
              onChange={handleChange}
              placeholder="Enter club password"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Description</FormLabel>
            <Textarea
              name="description"
              value={clubInfo.description}
              onChange={handleChange}
              placeholder="Enter club description"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Club Image</FormLabel>
            <Input type="file" name="logo" onChange={handleImageChange} />
          </FormControl>

          <HStack justifyContent="center" mt={5}>
            <Button colorScheme="blue" type="submit">
              Register
            </Button>
            <Button colorScheme="blue" type="reset" onClick={handleReset}>
              Reset
            </Button>
          </HStack>
        </form>
      </Stack>
    </Card>
  );
};

export default ClubRegistration;
