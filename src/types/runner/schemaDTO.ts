import * as yup from "yup";

const CreateRunnerDTO = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    run_type: yup
      .string()
      .required("Run type is required")
      .min(3, "Run type must be at least 3 characters"),
    bib: yup.string().required("Bib is required"),
    last_scanned: yup
      .date()
      .nullable()
      .typeError("Invalid date format for last_scanned"),
  }),
});

const UpdateRunnerDTO = yup.object({
  body: yup.object({
    name: yup.string().min(3, "Name must be at least 3 characters").optional(),
    run_type: yup
      .string()
      .min(3, "Run type must be at least 3 characters")
      .optional(),
    bib: yup.string().optional(),
    last_scanned: yup
      .date()
      .nullable()
      .typeError("Invalid date format for last_scanned")
      .optional(),
  }),
});

export { CreateRunnerDTO, UpdateRunnerDTO };
