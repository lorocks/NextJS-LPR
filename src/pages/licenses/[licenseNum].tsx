import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState, Fragment } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Menu, Transition } from "@headlessui/react";

function LicenseDetails({ info }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const supabase = useSupabaseClient();
  const TimeInfo = info.CaptureTime.replace("T", " ").split(" ");

  async function handleClick(e) {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  }

  function goLicenses(e) {
    e.preventDefault();
    router.push("/licenses");
  }

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const plateVal = router.query.licenseNum;

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
      <div className="flex flex-col justify-center items-center h-full sm:grid sm:grid-cols-2">
        <div className="w-3/5 m-auto">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Image
              alt=""
              src={
                "https://btacvaekpqpadpifrcob.supabase.co/storage/v1/object/public/licenses/images/" +
                plateVal
              }
              fill
              // objectFit="cover"
              className={cn(
                "duration-700 ease-in-out group-hover:opacity-75",
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 pr-10 m-auto sm:m-0">
          <div className="border border-black p-3">Image Name: </div>
          <div className="border border-black p-3 overflow-hidden">{info.imageName}</div>
          <div className="border border-black p-3">
            License Plate from OCR:{" "}
          </div>
          <div className="border border-black p-3 overflow-hidden">{info.LPOCR}</div>
          <div className="border border-black p-3">UTC Date of Capture: </div>
          <div className="border border-black p-3 overflow-hidden">{TimeInfo[0]}</div>
          <div className="border border-black p-3">UTC Time of Capture: </div>
          <div className="border border-black p-3 overflow-hidden">
            {TimeInfo[1].replace("+00:00", "")}
          </div>
          <div className="border border-black p-3">Fined: </div>
          <div className="border border-black p-3">
            {info.Fined ? "true" : "false"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicenseDetails;

export async function getServerSideProps(context) {
  const supabase = createServerSupabaseClient(context);
  const { query } = context;

  const { data, error } = await supabase
    .from("LPDetection")
    .select()
    .eq("imageName", query.licenseNum)
    .single();

  if (error) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      info: data,
    },
  };
}
