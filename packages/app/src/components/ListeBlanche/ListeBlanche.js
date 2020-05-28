import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner, Text } from "@emjpm/ui";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { PaginatedList } from "../PaginatedList";
import { LB_USERS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const getType = type => {
  if (type === "individuel") {
    return "Mandataire individuel";
  }
  if (type === "prepose") {
    return "Mandataire préposé d'établissement";
  }
  if (type === "service") {
    return "Membre d'un service mandataire";
  }
  if (type === "ti") {
    return "Magistrat";
  }
};

const ListBlancheItem = ({ item }) => (
  <Card key={item.id} sx={cardStyle(item.user_id)} mb="2">
    <Flex justifyContent="flex-start">
      <Flex width="25%" flexDirection="column">
        <Text sx={labelStyle}>{"Nom"}</Text>
        <Text sx={descriptionStyle}>
          {item.prenom} {item.nom ? item.nom.toUpperCase() : ""}
        </Text>
      </Flex>
      <Flex width="15%" flexDirection="column">
        <Text sx={labelStyle}>Type</Text>
        <Text sx={descriptionStyle}>{getType(item.type)}</Text>
      </Flex>
      <Flex width="25%" flexDirection="column">
        <Text sx={labelStyle}>Email</Text>
        <Text sx={descriptionStyle}>{item.email}</Text>
      </Flex>
      <Flex width="50%" flexDirection="column">
        {item.lb_departements.map(lbDep => (
          <Flex
            key={lbDep.id}
            mb="1"
            pl="2"
            sx={{
              borderLeft: "1px solid"
            }}
            justifyContent="flex-start"
          >
            <Flex width="100%" flexDirection="column">
              <Text sx={labelStyle}>{`Département`}</Text>
              <Text sx={descriptionStyle}>
                {lbDep.departement ? lbDep.departement.nom : "Inconnu"}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Card>
);

const ListeBlanche = () => {
  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  const { data, error, loading } = useQuery(LB_USERS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset
    }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }
  const { count } = data.lb_users_aggregate.aggregate;
  const users = data.lb_users;

  return (
    <PaginatedList
      entries={users}
      RowItem={ListBlancheItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { ListeBlanche };
