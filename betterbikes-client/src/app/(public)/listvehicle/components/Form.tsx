"use client";
import { useState } from "react";
import { FileData } from "../types/types";
import { BiFile } from "react-icons/bi";
import { VehicleSchema, VehicleSchemaType } from "../schema/listSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { BsTrash2Fill } from "react-icons/bs";
import VehicleCard from "../../components/Reusables/VehicleCards";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<VehicleSchemaType>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vehicleFeatures: [{ feature: "" }],
    },
  });

  const [file, setFile] = useState<FileData>({
    preview: "",
    data: null,
  });

  const watchAllFields = watch();

  const onSubmit = async (data: VehicleSchemaType) => {
    console.log("here");
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicleFeatures",
  });

  return (
    <div className="flex flex-col items-start gap-10 md:flex-row md:items-start justify-between">
      <section className="md:w-[60%] xl:w-[70%] w-full">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div className="grid grid-cols-1 gap-6 mt-4 ">
              <InputField
                errors={errors.vehicleImage?.message}
                field={{ ...register("vehicleImage") }}
                label="VEHICLE IMAGE"
                type="file"
                placeholder="e.g. File"
              />

              <InputField
                errors={errors.vehicleName?.message}
                field={{ ...register("vehicleName") }}
                label="VEHICLE NAME"
                type="text"
                placeholder="e.g. Apache RTR 2004v"
              />

              <InputField
                errors={errors?.vehicleBrand?.message}
                field={{ ...register("vehicleBrand") }}
                label="VEHICLE BRAND"
                type="text"
                placeholder="e.g TVS"
              />

              <InputField
                errors={errors?.vehicleColor?.message}
                field={{ ...register("vehicleColor") }}
                label="VEHICLE COLOR"
                type="text"
                placeholder="e.g. White"
              />

              <InputField
                errors={errors?.vehiclePrice?.message}
                field={{ ...register("vehiclePrice") }}
                label="VEHICLE PRICE"
                type="text"
                placeholder="e.g. 4200"
              />

              <InputField
                errors={errors?.vehicleAddress?.message}
                field={{ ...register("vehicleAddress") }}
                label="VEHICLE ADDRESS"
                type="text"
                placeholder="e.g. Kathmandu"
              />

              <InputField
                errors={errors?.vehicleNumber?.message}
                field={{ ...register("vehicleNumber") }}
                label="VEHICLE NUMBER"
                type="text"
                placeholder="e.g. Ga 1 Jha"
              />

              <div className="flex flex-col justify-start gap-5 md:flex-row w-full">
                <div className="w-[40%]">
                  <InputField
                    errors={errors?.vehicleManufactureDate?.message}
                    field={{ ...register("vehicleManufactureDate") }}
                    label="VEHICLE MAKE YEAR"
                    type="text"
                    placeholder="e.g. 2021"
                  />
                </div>

                <div className="w-[60%] flex-col">
                  <label
                    className="text-gray-400 font-semibold text-sm"
                    htmlFor="Vehicle Type"
                  >
                    VEHICLE TYPE
                  </label>
                  <select
                    {...register("vehicleType")}
                    placeholder="e.g. Ga 1 Jha"
                    className={`block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
                      errors?.vehicleType?.message ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Option1">BIKE</option>
                    <option value="Option2">SCOOTER</option>
                  </select>
                  {errors.vehicleType && (
                    <p className="text-red-500">{errors.vehicleType.message}</p>
                  )}
                </div>
              </div>

              <InputField
                errors={errors?.vehicleDescription?.message}
                field={{ ...register("vehicleDescription") }}
                label="VEHICLE DESCRIPTION"
                type="text"
                placeholder="e.g. Describe about your vehicle"
              />
              {fields.map((field, index) => (
                <div key={field.id} className="flex-col">
                  <div>
                    <InputField
                      errors={errors.vehicleFeatures?.[index]?.feature?.message}
                      field={{
                        ...register(`vehicleFeatures.${index}.feature`),
                      }}
                      label={`VEHICLE FEATURE ${index + 1}`}
                      type="text"
                      placeholder="e.g. Feature of your vehicle"
                    />
                  </div>
                  <button
                    className="text-main-foreground mt-5 hover:text-main-accent color-transition"
                    onClick={() => remove(index)}
                  >
                    Delete this feature
                    <BsTrash2Fill className="inline-block" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-start gap-4 mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                append({ feature: "" });
              }}
              className="main-btn w-full md:w-1/2 xl:w-1/4"
            >
              Add Features
            </button>
            <button
              role="button"
              disabled={isSubmitting}
              className="accent-btn w-full md:w-1/2 xl:w-1/4 flex-center"
              type="submit"
            >
              {isSubmitting && (
                <span
                  className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                  role="status"
                  aria-label="loading"
                ></span>
              )}
              {isSubmitting ? "Submitting Details" : "Submit Form"}
            </button>
          </div>
        </form>
      </section>

      <section className="md:block md:sticky top-5">
        <div className="md:max-w-[40%] xl:max-w-[25%] ">
          <h1 className="text-[34px] md:hidden block font-semibold text-gray-800 dark:text-accent-1">
            Card Preview
          </h1>
          <div className="grid w-full ">
            <VehicleCard
              vehicleName={watchAllFields.vehicleName}
              vehicleImage={watchAllFields.vehicleImage}
              vehiclePrice={watchAllFields.vehiclePrice}
              key={watchAllFields.vehicleName}
              postId={1}
              vehicleLocation={watchAllFields.vehicleAddress}
              buttonText={"Rent"}
              type="preview"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
