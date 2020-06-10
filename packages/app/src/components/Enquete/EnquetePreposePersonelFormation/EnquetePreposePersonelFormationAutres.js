import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { parseFloatValue, parseIntValue } from "../../../util";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePreposePersonelFormationAutresForm } from "./EnquetePreposePersonelFormationAutresForm";
import { UPDATE_ENQUETE_PREPOSE_PERSONEL_FORMATION_AUTRES } from "./mutations";
import { ENQUETE_PREPOSE_PERSONEL_FORMATION } from "./queries";

export const EnquetePreposePersonelFormationAutres = props => {
  const {
    goToNextPage,
    goToPrevPage,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
    userId
  } = props; /* mandataireId, enquete */
  const {
    enquete_reponse_ids: { personel_formation_id }
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PERSONEL_FORMATION, {
    variables: {
      id: personel_formation_id
    }
  });

  const [sendEnqueteReponseInformations] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PERSONEL_FORMATION_AUTRES,
    {
      refetchQueries: [
        {
          query: ENQUETE_REPONSE_STATUS,
          variables: { enqueteId, userId }
        },
        {
          query: ENQUETE_PREPOSE_PERSONEL_FORMATION,
          variables: { id: personel_formation_id }
        }
      ]
    }
  );

  const initialData = data ? data.enquete_reponses_prepose_personel_formation_by_pk || {} : {};

  return (
    <EnquetePreposePersonelFormationAutresForm
      data={initialData}
      goToPrevPage={goToPrevPage}
      loading={loading}
      step={step}
      handleSubmit={async values => {
        const niveaux_qualification = values.niveaux_qualification
          ? {
              n1: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n1
              ),
              n2: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n2
              ),
              n3: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n3
              ),
              n4: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n4
              ),
              n5: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n5
              ),
              n6: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n6
              )
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            id: personel_formation_id,
            nb_preposes_homme: parseIntValue(values.nb_preposes_homme),
            nb_preposes_femme: parseIntValue(values.nb_preposes_femme),
            nb_autre_personnel: parseIntValue(values.nb_autre_personnel),
            nb_autre_personnel_etp: parseFloatValue(values.nb_autre_personnel_etp),
            niveaux_qualification
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnquetePreposePersonelFormationAutres;
function parseNbPreposeNombrePreposesParNiveauQualificationFromForm(val) {
  return {
    nb_preposes: val ? parseIntValue(val.nb_preposes, 10) : null,
    nb_preposes_etp: val ? parseFloatValue(val.nb_preposes_etp) : null
  };
}