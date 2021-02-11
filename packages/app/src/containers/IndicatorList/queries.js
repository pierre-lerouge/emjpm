import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators(
    $code: String
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    departements(where: { id: { _eq: $code } }) {
      id
      nom
    }
    view_indicateur_login(where: { id: { _eq: $code } }) {
      count
      nom
      type
      id
    }

    view_indicateur_inscrit(
      where: { id: { _eq: $code }, type: { _eq: "ti" } }
    ) {
      count
    }

    serviceInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "SERVICE" }
        departement: { _or: { id: { _eq: $code } } }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
    individuelInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "MANDATAIRE_IND" }
        departement: { _or: { id: { _eq: $code } } }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
    preposeInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: "MANDATAIRE_PRE" }
        departement: { _or: { id: { _eq: $code } } }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }

    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
          departement: { id: { _eq: $code } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    mesuresLastMonthCountTotal: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const FRANCE_INDICATORS = gql`
  query AllIndicators(
    $currentMonthStart: timestamptz!
    $currentMonthEnd: timestamptz!
  ) {
    serviceLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "service" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    individuelLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "individuel" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    preposeLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "prepose" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    magistratLoginCount: view_indicateur_login_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }

    serviceInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: { discriminator: { _eq: "SERVICE" } }
    ) {
      aggregate {
        count(distinct: true)
      }
    }

    individuelInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: { discriminator: { _eq: "MANDATAIRE_IND" } }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
    preposeInscritCount: view_mesure_gestionnaire_departement_aggregate(
      where: { discriminator: { _eq: "MANDATAIRE_PRE" } }
    ) {
      aggregate {
        count(distinct: true)
      }
    }

    magistratInscritCount: view_indicateur_inscrit_aggregate(
      where: { type: { _eq: "ti" } }
    ) {
      aggregate {
        sum {
          count
        }
      }
    }
    mesuresLastMonthCount: mesures_aggregate(
      where: {
        _and: {
          created_at: { _gte: $currentMonthStart, _lte: $currentMonthEnd }
          magistrat_id: { _is_null: false }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;