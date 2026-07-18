import Header from "@/components/layout/Header";
import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="grid grid-cols-12 gap-4 p-4">

        <div className="col-span-3">
          <LeftPanel />
        </div>

        <div className="col-span-6">
          <CenterPanel />
        </div>

        <div className="col-span-3">
          <RightPanel />
        </div>

      </div>
    </div>
  );
}