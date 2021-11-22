UPDATE mesures m SET ti_id = (SELECT COALESCE(t.actual_tribunal_id, t.id) FROM tis t WHERE t.id=m.ti_id)
WHERE NOT EXISTS (
   SELECT 1 FROM mesures
   JOIN tis t ON t.id = ti_id
   WHERE
    mandataire_id = m.mandataire_id
    AND service_id = m.service_id
    AND numero_rg = m.numero_rg
    AND ti_id = COALESCE(t.actual_tribunal_id, t.id)
);
