import { useContext } from "react";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMandataire } from "~/containers/MagistratMandataire";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Gestionnaire() {
  const { gestionnaire_id: gestionnaireId } = useParams();
  const {
    magistrat: { ti_id: tiId },
  } = useContext(UserContext);

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMandataire gestionnaireId={gestionnaireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default Gestionnaire;
