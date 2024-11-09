import * as React from "react";
import { Container, Title, Text, Button, Flex } from "@mantine/core";
import classes from "./HeroImageRight.module.css";
import { IconPhone } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function HeroImageRight() {
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Container size="md" px="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "#4FC4E3", to: "#81D2ED" }}
              >
                Ordinace Hradecká
              </Text>
            </Title>

            <Text className={classes.description} mt={30}>
              MUDr. Tereza Hylmarová
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "#4FC4E3", to: "#81D2ED" }}
              size="xl"
              className={classes.control}
              mt={40}
              radius="lg"
              onClick={() => navigate("/contact")}
            >
              <Flex justify="space-between" gap="xs">
                <IconPhone />
                <Text>+420</Text>
                <strong>777 888 999</strong>
              </Flex>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
