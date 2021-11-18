import { MailOutline } from "@styled-icons/material/MailOutline";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Card, Heading } from "~/components";

import { boxStyle, flexStyle, iconTextStyle, innerTextStyle } from "./style";

function GreffierInformations(props) {
  const { email, cabinet, nom, prenom, greffier } = useUser();
  const { share_email } = greffier;
  return (
    <Box {...props}>
      <Card p="5">
        <Heading size={3}>
          {nom ? nom : ""} {prenom ? prenom : ""}
        </Heading>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading size={5}>Vos informations</Heading>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Text sx={innerTextStyle}>{nom ? nom : ""} </Text>
            <Text sx={innerTextStyle}>{prenom ? prenom : ""}</Text>
            <Text sx={innerTextStyle}>
              {cabinet ? `Cabinet: ${cabinet}` : ""}
            </Text>
            <Text sx={innerTextStyle}>
              {share_email
                ? "Les mandataires ont accès à votre adresse email pour vous envoyer des messages."
                : "Les mandataires n'ont pas accès à votre adresse email et ne peuvent donc pas vous envoyer de message."}
              {` Vous pouvez modifier ce paramètre en vous rendant sur "Modifier vos informations".`}
            </Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton to="/greffiers/edit-informations">
              Modifier vos informations
            </LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton to="/greffiers/edit-password">
            Modifier votre mot de passe
          </LinkButton>
        </Flex>
      </Card>
    </Box>
  );
}

export { GreffierInformations };