"use client";
import { useCallback, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { VehicleData, FileData, PostError } from "../types/types";
import validation from "../validation/validation";
import { BiFile } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<FileData>({
    preview: "",
    data: null,
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (!file) {
        // Handle the case when no file is selected
        // For example: toastError("Please select a file");
        return;
      }

      const name = file.name;
      setFile({
        preview: URL.createObjectURL(file),
        data: file,
      });
    },
    []
  );

  const [data, setData] = useState<VehicleData>({
    vehicleName: "",
    vehicleBrand: "",
    vehicleColor: "",
    address: "",
    pricePerDay: "",
    vehicleMakeYear: "",
    vehicleType: "",
    vehicleDescription: "",
    numberPlate: "",
    features: "",
    vehiclefile: "",
  });

  const [postError, setPostError] = useState<PostError>({
    vehicleName: "",
    vehicleBrand: "",
    vehicleColor: "",
    address: "",
    pricePerDay: "",
    vehicleMakeYear: "",
    vehicleType: "",
    vehicleDescription: "",
    numberPlate: "",
    features: "",
    vehiclefile: "",
  });

  const validateData = useCallback(
    (name: string, value: string) => {
      return validation({ ...data, [name]: value });
    },
    [data]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
      setPostError((prevErrors) => ({ ...prevErrors, [name]: "" }));
      const error: any = validateData(name, value);
      setPostError((prevErrors) => ({ ...prevErrors, [name]: error[name] }));
    },
    [validateData]
  );

  const handleVehicleType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setData((prevData: VehicleData) => ({
        ...prevData,
        vehicleType: e.target.value,
      }));
      setPostError((prevErrors: PostError) => ({
        ...prevErrors,
        vehicleType: "",
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoading(true);
      const error: any = validation(data);
      if (error) {
        toast.error("Please fill all the fields");
      }
      setPostError(error);
      if (Object.keys(error).length === 0) {
        const formData = new FormData();
        formData.append("vehiclefile", file.data);
        formData.append("vehicleName", data.vehicleName);
        formData.append("vehicleBrand", data.vehicleBrand);
        formData.append("vehicleColor", data.vehicleColor);
        formData.append("address", data.address);
        formData.append("pricePerDay", data.pricePerDay);
        formData.append("vehicleMakeYear", data.vehicleMakeYear);
        formData.append("vehicleType", data.vehicleType);
        formData.append("vehicleDescription", data.vehicleDescription);
        formData.append("numberPlate", data.numberPlate);
        formData.append("features", data.features);

        try {
        } catch (err: any) {
          toast.error(err.message);
        }
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    [data, file]
  );

  return (
    <>
      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 ">
          <div className="">
            <label className="font-medium">Upload Photo</label>
            <label className="block text-sm text-gray-500">
              Drag or choose your file to upload
            </label>
            <div className="mt-5 flex justify-center px-6 py-8 border-2 border-gray-400  border-dashed rounded-2xl">
              <div className="space-y-1 text-center">
                <BiFile className="mx-auto h-12 w-12 text-main-foreground" />

                {file?.preview ? (
                  <>
                    <div className="flex text-sm text-main-light justify-center items-center">
                      Your file has been added see it in preview
                    </div>
                  </>
                ) : (
                  <div className="flex text-sm text-main-light justify-center items-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-main-accent rounded-md font-medium text-white p-2"
                    >
                      <span className="">Upload a file</span>
                      <input
                        onChange={handleFileChange}
                        id="file-upload"
                        name="file"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}

                {file.preview ? (
                  <>File added</>
                ) : (
                  <div className="dark:text-accent-3">
                    <p className="pl-1">or drag and drop</p>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
            {postError.vehiclefile && (
              <p className="text-red-500">{postError.vehiclefile}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <InputField
              label="VEHICLE NAME"
              name="vehicleName"
              type="text"
              value={data.vehicleName}
              onChange={handleChange}
              error={postError.vehicleName}
              placeholder="e.g. Toyota Corolla"
            />

            <InputField
              label="BRAND"
              name="vehicleBrand"
              type="text"
              value={data.vehicleBrand}
              onChange={handleChange}
              error={postError.vehicleBrand}
              placeholder="e.g. Toyota Corolla"
            />

            <InputField
              label="COLOR"
              name="vehicleColor"
              type="text"
              value={data.vehicleColor}
              onChange={handleChange}
              error={postError.vehicleColor}
              placeholder="e.g. Toyota Corolla"
            />

            <InputField
              label="PRICE"
              name="pricePerDay"
              type="text"
              value={data.pricePerDay}
              onChange={handleChange}
              error={postError.pricePerDay}
              placeholder="e.g. 9000"
            />

            <InputField
              label="NUMBER PLATE"
              name="numberPlate"
              type="text"
              value={data.numberPlate}
              onChange={handleChange}
              error={postError.numberPlate}
              placeholder="e.g. Ga 1 Jha"
            />

            <InputField
              label="ADDRESS"
              name="address"
              type="text"
              value={data.address}
              onChange={handleChange}
              error={postError.address}
              placeholder="e.g. Kathmandu"
            />

            <div className="flex flex-col justify-start gap-5 lg:flex-row w-full">
              <InputField
                label="Vehicle Make Year"
                name="vehicleMakeYear"
                type="text"
                value={data.vehicleMakeYear}
                onChange={handleChange}
                error={postError.vehicleMakeYear}
                placeholder="e.g. 2019"
              />

              <SelectField
                label="Vehicle Type"
                name="vehicleType"
                value={data.vehicleType}
                onChange={handleVehicleType}
                error={postError.vehicleType}
                options={["Bike", "Scooter"]}
              />
            </div>

            <InputField
              label="Vehicle description"
              name="vehicleDescription"
              type="textarea"
              value={data.vehicleDescription}
              onChange={handleChange}
              error={postError.vehicleDescription}
              placeholder="e.g. Toyota Corolla"
            />

            <InputField
              label="Features"
              name="features"
              type="textarea"
              value={data.features}
              onChange={handleChange}
              error={postError.features}
              placeholder="e.g. Toyota Corolla"
            />
          </div>
        </div>
        <div className="flex justify-start mt-6">
          {loading ? (
            <>
              <button type="button" className="accent-btn flex-center gap-2">
                <span
                  className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
                <span>Creating Post</span>
              </button>
            </>
          ) : (
            <button
              // onClick={handleSubmit}
              className="main-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
