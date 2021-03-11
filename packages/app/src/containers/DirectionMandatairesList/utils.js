import { formatMandataire } from "~/formatters/mandataires";

export function formatMandatairesList(mandatairesList) {
  return mandatairesList.map((row) => {
    const {
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire,
      mesures_awaiting,
      gestionnaire_tis,
      id,
      mesures_last_update,
    } = row;
    return formatMandataire(
      remaining_capacity,
      discriminator,
      mesures_max,
      mesures_in_progress,
      service,
      mandataire,
      mesures_awaiting,
      gestionnaire_tis,
      id,
      mesures_last_update
    );
  });
}
