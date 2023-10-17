"use client";

import Button from "@/components/button";
import Spinner from "@/components/spinner";
import { firebaseConfig, formControls } from "@/components/utils";
import { BlogFormData } from "@/components/utils/types";
import { GlobalContext } from "@/context";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import { useContext } from "react";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://wbblog-mine-2023.appspot.com");

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const storageRef = ref(storage, `blog/${extractUniqueFileName}`);
  const uploadImg = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}

export default function Create() {
  const { formData, setFormData } = useContext(GlobalContext);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  async function handleBlogImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;
    console.log(event.target.files);
    setImageLoading(true);
    const saveImageToFirebase: any = await handleImageSaveToFireBase(
      event.target.files[0]
    );

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      console.log(saveImageToFirebase, "saveImageToFirebase");
      setFormData({
        ...formData,
        image: saveImageToFirebase,
      });
    }
  }

  console.log(formData, "formData");

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28 ">
      <div className="container">
        <div className=" mx-4 flex flex-wrap ">
          <div className="w-full px-4 ">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] ">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex gap-3 flex-col ">
                  <div className="flex gap-3 ">
                    <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white  ">
                        Upload Blog Image
                      </label>
                      <input
                        type="file"
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleBlogImageChange}
                        className=" w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder:body-color shadow-none outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp "
                      />
                    </div>
                    {imageLoading ? (
                      <div className="w-1/2">
                        {" "}
                        <Spinner />{" "}
                      </div>
                    ) : null}
                  </div>

                  <div className="mx-4 flex flex-wrap">
                    {formControls.map((control) => (
                      <div className=" w-full px-4 ">
                        <label className=" mb-3 block text-sm font-medium text-dark dark:text-white ">
                          {control.label}
                        </label>
                        {control.component === "input" ? (
                          <input
                            name={control.id}
                            type={control.type}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder:body-color shadow-none outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp "
                          />
                        ) : control.component === "textarea" ? (
                          <textarea
                            placeholder={control.placeholder}
                            rows={5}
                            name={control.id}
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder:body-color shadow-none outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp "
                          />
                        ) : control.component === "select" ? (
                          <select
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder:body-color shadow-none outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242b51] dark:shadow-signUp "
                          >
                            <option value={""} id="">
                              Select
                            </option>
                            {control.options.map((optionItem) => (
                              <option
                                value={optionItem.value}
                                id={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                    <div className="w-full px-4 py-4 ">
                      <Button text="Create New Blog" onClick={() => {}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
