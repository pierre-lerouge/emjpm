import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import { FormGroupSelect } from "~/components/AppForm";

import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { adminTribunalSchema } from "~/validation-schemas";
import {
  Button,
  Card,
  Field,
  Heading,
  InlineError,
  Input,
  Text,
} from "~/components";

import { cardStyle } from "./style";

import { SELECT_TRIBUNAUX } from "./queries";
import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";

export function AdminTribunalForm({ tribunal, onSubmit, onCancel }) {
  const geocode = geocodeInitialValue(tribunal);

  const formik = useFormik({
    initialValues: {
      email: tribunal && tribunal.email ? tribunal.email : "",
      etablissement: tribunal ? tribunal.etablissement : "",
      geocode,
      siret: tribunal && tribunal.siret ? tribunal.siret : "",
      telephone: tribunal && tribunal.telephone ? tribunal.telephone : "",
      actual_tribunal_id:
        tribunal && tribunal.actual_tribunal_id
          ? tribunal.actual_tribunal_id
          : "",
    },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
    validationSchema: adminTribunalSchema,
  });

  const { data: dataTiSelect, loading, error } = useQuery(SELECT_TRIBUNAUX);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const tiOptions = dataTiSelect.tis.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  return (
    <Card sx={cardStyle} width="100%">
      <Flex flexWrap="wrap">
        <Box
          width={[1, 2 / 5]}
          bg="cardSecondary"
          borderRadius="5px 0 0 5px"
          p="5"
        >
          <Box height="230px">
            <Heading size={4}>{"Information du tribunal"}</Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Informations relatives au tribunal"}
            </Text>
          </Box>
          <Box height="150px">
            <Heading size={4}>{"Contact du tribunal"}</Heading>
            <Text lineHeight="1.5" color="textSecondary">
              Contact du tribunal
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box mb="2">
            <form noValidate onSubmit={formik.handleSubmit}>
              <Field>
                <Input
                  value={formik.values.etablissement}
                  id="etablissement"
                  name="etablissement"
                  hasError={
                    formik.errors.etablissement && formik.touched.etablissement
                  }
                  onChange={formik.handleChange}
                  placeholder="Nom du tribunal"
                  aria-describedby="msg-etablissement"
                />
                <div id="msg-etablissement">
                  <InlineError
                    message={formik.errors.etablissement}
                    fieldId="etablissement"
                  />
                </div>
              </Field>
              <Field>
                <Input
                  value={formik.values.siret}
                  id="siret"
                  name="siret"
                  hasError={formik.errors.siret && formik.touched.siret}
                  onChange={formik.handleChange}
                  placeholder="SIRET"
                  aria-describedby="msg-siret"
                />
                <div id="msg-siret">
                  <InlineError message={formik.errors.siret} fieldId="siret" />
                </div>
              </Field>
              <Field>
                <FormGroupSelect
                  formik={formik}
                  id="actual_tribunal_id"
                  label="Correspond au tribunal actuel"
                  placeholder="Sélectionnez le nouveau tribunal correspondant"
                  options={tiOptions}
                  enableFilterByLabel
                  isClearable={true}
                />
              </Field>
              <Field mt="5">
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  hasError={formik.errors.email && formik.touched.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                  aria-describedby="msg-email"
                />
                <div id="msg-email">
                  <InlineError message={formik.errors.email} fieldId="email" />
                </div>
              </Field>
              <Field>
                <Input
                  value={formik.values.telephone}
                  id="telephone"
                  name="telephone"
                  hasError={formik.errors.telephone && formik.touched.telephone}
                  onChange={formik.handleChange}
                  placeholder="Téléphone"
                  aria-describedby="msg-telephone"
                />
                <div id="msg-telephone">
                  <InlineError
                    message={formik.errors.telephone}
                    fieldId="telephone"
                  />
                </div>
              </Field>
              <Field>
                <Geocode
                  resource={tribunal}
                  onChange={(geocode) =>
                    formik.setFieldValue("geocode", geocode)
                  }
                  aria-describedby="msg-geocode"
                />
                <div id="msg-geocode">
                  <InlineError
                    message={formik.errors.geocode}
                    fieldId="geocode"
                  />
                </div>
              </Field>
              <Flex justifyContent="flex-end">
                <Box>
                  <Button mr="2" variant="outline" onClick={onCancel}>
                    Annuler
                  </Button>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                  >
                    Enregistrer
                  </Button>
                </Box>
              </Flex>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}
