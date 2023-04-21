import styled from "styled-components";
import Link from "next/link";
import { white } from "@/styles/colors";

const Navbar = () => (
  <Container>
    <Link href="/">
      <Heading>Projects</Heading>
    </Link>
  </Container>
);

export default Navbar;

const Container = styled.div`
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Heading = styled.div`
  color: ${white};
`;
