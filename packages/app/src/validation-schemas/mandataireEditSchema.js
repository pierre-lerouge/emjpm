import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

import { checkDuplicateMandataireSIRETFromMandataire } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const mandataireEditSchema = ({ apolloClient }) =>
  yup.object().shape({
    competences: yup.string(),
    dispo_max: yup.number().required(),
    email: yup.string().email().required(),
    genre: yup.string().nullable().required(),
    geocode: yup
      .object()
      .required()
      .nullable()
      .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
    nom: yup.string().required(),
    prenom: yup.string().required(),
    telephone: yup.string().required(),
    telephone_portable: yup.string(),
    tis: yup.mixed().required(),
    siret: yup
      .string()
      .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
      .required()
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà pour un mandataire sur eMJPM.",
        (value, { parent }) => {
          if (value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateMandataireSIRETFromMandataire(
            apolloClient,
            value
          );
        }
      ),
  });

export { mandataireEditSchema };
