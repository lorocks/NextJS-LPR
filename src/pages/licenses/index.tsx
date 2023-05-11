import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Header from "@/components/header";

var toggle = false;

function MainPage({ profileList, user, fineNum }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();

  const plateNum = profileList.length;

  async function handleClick(e) {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  }

  function getFined(e) {
    e.preventDefault();
    toggle = !toggle;
    router.push(`/licenses?onlyFined=${toggle}`);
  }

  return (
    <>
      <div className="flex flex-col h-auto min-h-screen w-full relative">
        <Header user={session?.user.email} />
        <div className="sticky py-2 px-5 top-0 w-full h-fit flex flex-row items-center justify-center bg-orange-400 justify-between">
          <div className="text-white">
            Number of Plates Detected: {plateNum}
          </div>
          <div className="text-white">Total Fines: {fineNum}</div>
          <div className="space-x-2">
            <button
              className="relative bg-black bg-opacity-20 hover:bg-opacity-40 text-white px-4 py-1 rounded"
              onClick={getFined}
            >
              Toggle Fined
            </button>
            <button
              className="relative bg-black bg-opacity-20 hover:bg-opacity-40 text-white px-4 py-1 rounded"
              onClick={handleClick}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="sticky px-4 pt-3 top-20 sm:top-12 w-full h-fit items-center justify-center bg-orange-100">
          <div className="flex flex-row grid grid-cols-3 bg-white rounded-t-3xl overflow-hidden">
            <div className="flex justify-center border p-2">Image URL</div>
            <div className="flex justify-center border p-2">Plate Values</div>
            <div className="flex justify-center border p-2">Time Stamp</div>
          </div>
        </div>

        <div className="px-4 pb-4 flex-grow bg-orange-100">
          <div className="flex flex-col bg-white rounded-b-xl overflow-hidden">
            {profileList.map((profile) => {
              return (
                <>
                  <div
                    key={profile.id}
                    className="flex flex-row grid grid-cols-3"
                  >
                    {profile.Fined ? (
                      <Link
                        href={{
                          pathname: `/licenses/${profile.imageName}`,
                        }}
                        className="border p-2 text-red-500 overflow-hidden"
                      >
                        {profile.imageName}
                      </Link>
                    ) : (
                      <Link
                        href={{
                          pathname: `/licenses/${profile.imageName}`,
                        }}
                        className="border p-2 text-green-600 overflow-hidden"
                      >
                        {profile.imageName}
                      </Link>
                    )}
                    <div className="border p-2 overflow-hidden">{profile.LPOCR}</div>
                    <div className="border p-2 overflow-hidden">
                      {profile.CaptureTime.replace("T", "  ").replace(
                        "+",
                        "  +"
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="sticky w-full  bottom-0 flex flex-row bg-orange-100"></div>
      </div>
    </>
  );
}

export default MainPage;

export async function getServerSideProps(context) {
  const supabase = createServerSupabaseClient(context);

  const { query } = context;
  var check = false;
  if (query.onlyFined === "true") {
    check = true;
  }

  const { data, error } = await supabase.from("LPDetection").select();
  const fines = await supabase.from("LPDetection").select().eq("Fined", true);
  const fineList = fines.data;

  const final = check ? fineList : data;

  return {
    props: {
      profileList: final?.reverse() ?? [],
      fineNum: fineList?.length,
    },
  };
}
