exports.up = function (knex) {
  return knex.raw(`
  CREATE OR REPLACE FUNCTION update_mandataire_counters(mandataire_id integer) RETURNS void AS $$
  BEGIN
   UPDATE mandataires SET mesures_en_cours = (
     SELECT count(mesures.id) FROM mesures WHERE mesures.mandataire_id = mandataires.id AND mesures.status = 'Mesure en cours'
   ) WHERE id = mandataire_id;
   UPDATE mandataires SET mesures_en_attente = (
     SELECT count(mesures.id) FROM mesures WHERE mesures.mandataire_id = mandataires.id AND mesures.status = 'Mesure en attente'
   ) WHERE id = mandataire_id;
  END;
 $$ language 'plpgsql';

 CREATE OR REPLACE FUNCTION update_antenne_counters(antenne_id integer) RETURNS void AS $$
  BEGIN
   UPDATE service_antenne SET mesures_in_progress = (
    SELECT count(mesures.id) FROM mesures WHERE mesures.antenne_id = service_antenne.id AND mesures.status = 'Mesure en cours'
   ) WHERE id = antenne_id;
   UPDATE service_antenne SET mesures_awaiting = (
    SELECT count(mesures.id) FROM mesures WHERE mesures.antenne_id = service_antenne.id AND mesures.status = 'Mesure en attente'
   ) WHERE id = antenne_id;
  END;
 $$ language 'plpgsql';

 CREATE OR REPLACE FUNCTION update_gestionnaire_counters() RETURNS trigger AS $$
  BEGIN
   IF (TG_OP = 'UPDATE' and new.antenne_id is not null) THEN perform update_antenne_counters(new.antenne_id); return new;
   elseif (TG_OP = 'UPDATE' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'INSERT' and new.antenne_id is not null) then perform  update_antenne_counters(new.antenne_id); return new;
   elseif (TG_OP = 'INSERT' and new.mandataire_id is not null) then perform  update_mandataire_counters(new.mandataire_id); return new;
   elseif (TG_OP = 'DELETE' and old.antenne_id is not null) then perform  update_antenne_counters(old.antenne_id); return old;
   elseif (TG_OP = 'DELETE' and old.mandataire_id is not null) then perform  update_mandataire_counters(old.mandataire_id); return old;
   end if;
  END;
 $$ language 'plpgsql';

CREATE TRIGGER on_update_mesures
 AFTER update of status or delete or insert ON mesures
 FOR EACH row
 EXECUTE PROCEDURE update_gestionnaire_counters();
  `);
};

exports.down = function (knex) {
  return knex.raw(`
DROP TRIGGER on_update_mesures ON mesures;
DROP FUNCTION update_gestionnaire_counters;
DROP FUNCTION update_antenne_counters;
DROP FUNCTION update_mandataire_counters;
  `);
};
