import * as yup from "yup";

export const CreateKeyDTO = yup.object({
  body: yup.object({
    key: yup
      .string()
      .min(5, "Key minimal 5 karakter")
      .required("Key wajib diisi"),
    nama_key: yup
      .string()
      .min(1, "Nama key wajib diisi")
      .required("Nama key wajib diisi"),
    expired_date: yup
      .string()
      .required("expired_date wajib diisi")
      .test("is-date", "expired_date harus format ISO valid", (value) => {
        return !isNaN(Date.parse(value ?? ""));
      }),
    is_trial: yup.boolean().required("is_trial wajib diisi"),
    max_hit: yup
      .number()
      .min(0, "max_hit minimal 0")
      .required("max_hit wajib diisi"),
    no_limit: yup.boolean().required("no_limit wajib diisi"),
    hit_used: yup
      .number()
      .min(0, "hit_used minimal 0")
      .required("hit_used wajib diisi"),
    notes: yup.string().optional(),
  }),
});

export const UpdateKeyDTO = yup.object({
  body: yup.object({
    key: yup.string().min(5, "Key minimal 5 karakter").optional(),
    nama_key: yup.string().optional(),
    expired_date: yup
      .string()
      .test("is-date", "expired_date harus format ISO valid", (value) => {
        return !value || !isNaN(Date.parse(value));
      })
      .optional(),
    is_trial: yup.boolean().optional(),
    max_hit: yup.number().min(0, "max_hit minimal 0").optional(),
    no_limit: yup.boolean().optional(),
    hit_used: yup.number().min(0, "hit_used minimal 0").optional(),
    notes: yup.string().optional(),
  }),
});
