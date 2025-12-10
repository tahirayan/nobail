import Venues from "@/components/widgets/venues";
import Events from "@/components/widgets/events";

export default function Dashboard() {
  return (
    <div className="grid gap-4">
      <Venues />
      <Events />
    </div>
  );
}