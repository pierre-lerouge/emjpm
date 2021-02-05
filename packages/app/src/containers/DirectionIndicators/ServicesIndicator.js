import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Indicator } from "~/components";

import { GET_GESTIONNAIRE_NUMBER } from "./queries";

function ServicesIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: filters.departement ? filters.departement : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
      type: "SERVICE",
    },
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Services mandataires"
      indicator={
        data && data.gestionnaireNumber
          ? Number(data.gestionnaireNumber.aggregate.count)
          : 0
      }
    />
  );
}

export { ServicesIndicator };
