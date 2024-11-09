import React from "react";
import { Container } from "@mantine/core";

import { GetInTouch } from "../contact/GetInTouch";

function Contact() {
  return (
    <>
      <Container px="xl" mb="lg">
        <GetInTouch />
      </Container>
    </>
  );
}

export default Contact;
