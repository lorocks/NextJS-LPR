import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

function Test({ info }) {
  let base64String = "";
  const [respVal, setRespVal] = useState("");
  const supabase = useSupabaseClient();
  const router = useRouter();

  function imageUploaded() {
    var file = document.querySelector("input[type=file]")["files"][0];

    var reader = new FileReader();
    console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      editResponse(typeof reader.result);
      // console.log(reader.result);

      let imageBase64Stringsep = base64String;

      alert(imageBase64Stringsep);
      // console.log(base64String);
    };
    reader.readAsDataURL(file);
  }

  function editResponse(info) {
    console.log(info);
    setRespVal(info);
  }

  async function handleClick(e) {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  }

  function goLicenses(e) {
    e.preventDefault();
    router.push("/licenses");
  }

  return (
    <div className="relative flex flex-col h-screen w-full bg-orange-100">
      <div className="sticky w-full h-fit top-0 flex flex-row bg-orange-400">
        <div className="flex flex-row w-full space-x-2 p-2">
          <Menu as="div" className="relative inline-block w-full text-left">
            <div className="flex justify-end">
              <Menu.Button className="justify-center rounded-md px-4 py-1 text-white bg-black bg-opacity-20 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Options
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={handleClick}
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={goLicenses}
                      >
                        Go Back
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <div className="p-2">{respVal}</div>
          <div className="p-2">
            <input type="file" name="" id="fileId" onChange={imageUploaded} />
          </div>

          {/* <div className="p-2"> */}
          {/* <button
              className="rounded-md px-4 py-1 text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={displayString}
            >
              Display String
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Test;
